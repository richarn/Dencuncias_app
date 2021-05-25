import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CameraService } from 'src/app/services/camera.service';

declare var window: any;

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.scss'],
})
export class SelectImageComponent implements OnInit {

  tempImages: string[] = [];
  imagenes: any[] = [];

  @Output() resultados: EventEmitter<any> = new EventEmitter();

  constructor(
    private alertController: AlertController,
    private cameraService: CameraService,
  ) { }

  ngOnInit() {}

  async camara() {
    const imageData = await this.cameraService.abrirCamara();
    this.procesarImagen(imageData);
  }

  async libreria() {
    const imageData = await this.cameraService.abrirGaleria();
    this.procesarImagen(imageData);
  }

  async procesarImagen(imageData) {
    
    const img = window.Ionic.WebView.convertFileSrc( imageData );
    // Muestra la/s imagen/es
    this.tempImages.push(img);

    // obtiene la imagen
    const response = await fetch(img);
    // convierte a blob para enviar a la api
    const blob = await response.blob();
    this.imagenes.push(blob);
    console.log('denuncias');
    
    this.resultados.emit(this.imagenes);
  }

  async confirmarEliminacion(index) {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      subHeader: '¿Estas seguro de eliminar la imagen?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Aceptar',
          handler: () => this.eliminar(index)
        }
      ]
    })

    return await alert.present();
  }

  eliminar(index) {
    this.imagenes.splice(index, 1);
  }

}
