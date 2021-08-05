import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-preview-images',
  templateUrl: './preview-images.component.html',
  styleUrls: ['./preview-images.component.scss'],
})
export class PreviewImagesComponent implements OnInit, OnChanges {

  @Input() type: any; // 0 sin subir, 1 guardadas
  @Input() previewImages: any[] = [];

  constructor(
    private alertController: AlertController,
    private generalService: GeneralService,
  ) { }

  ngOnInit() {}

  ngOnChanges(changes) {
    if (changes.previewImages) this.previewImages = changes.previewImages.currentValue;
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
    // this.previewImages.splice(index, 1);
    this.generalService.removeImage.emit({ index, type: this.type });
  }

}
