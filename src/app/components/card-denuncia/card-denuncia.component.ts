import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-denuncia',
  templateUrl: './card-denuncia.component.html',
  styleUrls: ['./card-denuncia.component.scss'],
})
export class CardDenunciaComponent implements OnInit {

  @Input() denuncia: any;
  @Input() estado: string;
  @Output() deleteDenuncia: EventEmitter<any> = new EventEmitter();

  constructor(
    private actionSheetController: ActionSheetController,
    private router: Router
  ) { }

  ngOnInit() { }
  async showOptions() {
    const sheet = await this.actionSheetController.create({
      buttons: [
        {
          icon: 'pencil-outline',
          text: 'Editar',
          handler: () => this.redirectTo(this.denuncia)
        },
        {
          icon: 'trash-outline',
          text: 'Eliminar',
          handler: () => this.deleteDenuncia.emit(this.denuncia)
        }
      ]
    });

    return await sheet.present();
  }

  redirectTo(denuncia) {
    this.router.navigate(['/tabs/detalle-denuncia'], { queryParams: { denuncia: this.denuncia.id } });
  }

}
