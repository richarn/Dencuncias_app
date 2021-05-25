import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { environment } from 'src/environments/environment';

declare var mapboxgl: any;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit, OnChanges {

  @Input() coords: string;
  @ViewChild('mapa', {static: true}) mapa;

  constructor(
    private locationService: LocationService
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.cargarMapa();

    // Espera las coordenas del servicio
    this.locationService.coordinates
    .subscribe(coordenadas => {
      console.log('coordenadas mapa component: ', coordenadas);
    });
  }

  ngOnChanges(changes) {
    if (changes.coords) {
      this.coords = changes.coords.currentValue;
      this.cargarMapa();
    }
  }

  cargarMapa() {
    if (this.coords) {
      
      const latLng = this.coords.split(';');
      console.log('latLng: ', latLng);
      
      const lat = Number(latLng[0]);
      const lng = Number(latLng[1]);

      mapboxgl.accessToken = environment.mapbox.apiKey;
      const map = new mapboxgl.Map({
        container: this.mapa.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [ lng, lat ],
        zoom: 15
      }); 
  
      const marker = new mapboxgl.Marker()
      .setLngLat( [ lng, lat ] )
      .addTo( map );
    }
  }

}
