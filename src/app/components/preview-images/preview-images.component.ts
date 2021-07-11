import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { DenunciaService } from 'src/app/services/denuncia.service';

@Component({
  selector: 'app-preview-images',
  templateUrl: './preview-images.component.html',
  styleUrls: ['./preview-images.component.scss'],
})
export class PreviewImagesComponent implements OnInit {

  @Input() previewImages: any[] = [];

  constructor(
    private alertController: AlertController,
    private denunciaService: DenunciaService,
  ) { }

  ngOnInit() {}

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
    this.previewImages.splice(index, 1);
    this.denunciaService.removeImage.emit(index);
  }

}