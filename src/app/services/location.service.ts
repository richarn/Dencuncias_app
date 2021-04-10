import { Injectable, Output, EventEmitter } from '@angular/core';

import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  gettingLocation = false;
  gpsEnabled = false;

  @Output() coordinates: EventEmitter<any> = new EventEmitter();

  constructor(
    private geolocation: Geolocation,
    private diagnostic: Diagnostic,
    private storageService: StorageService,
    private locationAccuracy: LocationAccuracy,
  ) { }

  // Comprueba los permisos de la aplicacion
  requestPermissions() {
    this.diagnostic.requestLocationAuthorization()
    .then(response => {
      console.log('response: ', response);
      this.storageService.set('canAskLocation', true);
      this.checkGPSPermission();
    })
    .catch(err => {
      console.log('err: ', err);
      this.storageService.set('canAskLocation', false);
    });
  }

  async checkGPSPermission() {
    const canAskLocation = await this.storageService.get('canAskLocation');

    // Obtiene el estado del permiso
    if (canAskLocation) {
      this.diagnostic.getLocationAuthorizationStatus()
      .then(response => {
        const authorizedStatus = ['GRANTED', 'authorized_when_in_use'];
        // Si esta autorizado vertifica que el gps este activo
        if (authorizedStatus.includes(response)) { this.checkGPSEnabled(); }
        else { this.cantGetLocation(); }
      })
      .catch(err => {
        console.log('Error: ', err);
        this.diagnostic.requestLocationAuthorization();
        this.storageService.set('canAskLocation', false);
      });
    }
  }

  checkGPSEnabled() {
    this.diagnostic.isGpsLocationEnabled()
    .then(response => {
      // Si esta activo el gps obtiene la ubicacion, si no pregunta si quiere activar
      if (response && !this.gettingLocation) { this.getLocation(); }
      else { this.askToTurnOnGPS(); }
    })
    .catch(err => {
      console.log('error', err);
      this.cantGetLocation();
      this.storageService.set('canAskLocation', false);
    });
  }

  // Pregunta si quiere habilitar el gps
  async askToTurnOnGPS() {
    const isRequesting = await this.locationAccuracy.isRequesting();
    if (!isRequesting) {
      this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
      .then(() => {
        this.gpsEnabled = true;
        if (!this.gettingLocation) { this.getLocation(); }
        this.storageService.set('canAskLocation', true);
      })
      .catch(err => {
        console.log('Err: ', err);
        // this.cantGetLocation();
        this.storageService.set('canAskLocation', false);
        this.gpsEnabled = false;
      });
    }
  }

  async isGpsLocationEnabled() {
    return await this.diagnostic.isGpsLocationEnabled();
  }

  async toggleGPS() {
    const gpsEnabled = await this.diagnostic.isGpsLocationEnabled();
    if (gpsEnabled) {

    } else { this.checkGPSPermission(); }
  }

  // Intenta obtener la ubicación actual
  getLocation() {
    this.gettingLocation = true;
    this.geolocation.getCurrentPosition().then((response) => {
      // Envia las coordenas
      this.coordinates.emit(response.coords);
      this.gettingLocation = false;
      this.storageService.set('canAskLocation', true);
    }).catch((error) => {
      this.gettingLocation = false;
      console.log('Error getting location', error);
      this.storageService.set('canAskLocation', false);
    });
  }

  // No se pudo obtener la ubicacion
  cantGetLocation() {
    this.storageService.set('canAskLocation', false);
  }
}
