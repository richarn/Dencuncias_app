import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { GeneralService } from 'src/app/services/general.service';
import { CameraService } from 'src/app/services/camera.service';

import { Subscription } from 'rxjs';

declare var window: any;

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.scss'],
})
export class SelectImageComponent implements OnInit {

  tempImages: string[] = [];
  imagenes: any[] = [];

  list : string[] = ["1","2","3","4"];
  subscriptions: Subscription[] = [];
  @Output() resultados: EventEmitter<any> = new EventEmitter();

  constructor(
    private alertController: AlertController,
    private generalService: GeneralService,
    private cameraService: CameraService,
  ) { }

  ngOnInit() {
    const limpiarImagenes = this.generalService.limpiarImagenes
    .subscribe(() => {
      this.imagenes = [];
      this.tempImages = [];
    });

    const removeImage = this.generalService.removeImage
    .subscribe(index => {
      if (this.imagenes[index]) this.imagenes.splice(index, 1);
    });

    this.subscriptions.push(removeImage);
    this.subscriptions.push(limpiarImagenes);
  }

  async alertCantImg() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cantidad imagen superada',
      message: 'Solamente puedes agregar hasta tres imágenes.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
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
    if (this.tempImages.length < 3) this.tempImages.push(img);
    else {
      this.alertCantImg();
    }

    // obtiene la imagen
    const response = await fetch(img);
    // convierte a blob para enviar a la api
    const blob = await response.blob();
    this.imagenes.push(blob);
    console.log('imagenes seleccionadas: ', this.imagenes);
    
    this.resultados.emit({ imagenes: this.imagenes, preview: this.tempImages });
  }

  onDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
