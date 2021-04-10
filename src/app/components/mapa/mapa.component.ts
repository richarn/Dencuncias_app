import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';

declare var mapboxgl: any;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit, OnChanges {

  @Input() coords: string;
  @ViewChild('mapa') mapa;

  constructor(
    private locationService: LocationService
  ) { }

  ngOnInit() {
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
      
      const latLng = this.coords.split(',');
      const lat = Number(latLng[0]);
      const lng = Number(latLng[1]);
  
      console.log('map: ', this.mapa.nativeElement);
      

      mapboxgl.accessToken = 'pk.eyJ1IjoicmljaDk3IiwiYSI6ImNrazhibTZkZjA1dW4yb29icmpvemV6MTYifQ.6Rl26zo_E9S3T2SYRe0I-w';
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
