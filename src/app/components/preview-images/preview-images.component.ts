import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-preview-images',
  templateUrl: './preview-images.component.html',
  styleUrls: ['./preview-images.component.scss'],
})
export class PreviewImagesComponent implements OnInit, OnChanges {

  @Input() user;
  @Input() denuncia;
  @Input() noticia;
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
    if (this.user && (this.user.role && this.user.role.nivel == 1 || this.user.id == this.denuncia.id_user)) {
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
    } else if (this.previewImages[index] && !this.previewImages[index].includes('_capacitor_file_')) {
      this.generalService.previewImage(this.previewImages[index]);
    }
  }

  eliminar(index) {
    // this.previewImages.splice(index, 1);
    this.generalService.removeImage.emit({ index, type: this.type });
  }

}
