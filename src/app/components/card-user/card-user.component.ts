import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.scss'],
})
export class CardUserComponent implements OnInit {

  @Input() user;
  @Output() deleteUser: EventEmitter<any> = new EventEmitter();

  constructor(
    private actionSheetController: ActionSheetController,
    private router: Router
  ) { }

  ngOnInit() {}

  async showOptions() {
    const sheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Editar',
          handler: () => this.detalle_user()
        },
        {
          text: 'Eliminar',
          handler: () => this.deleteUser.emit(this.user)
        }
      ]
    });

    return await sheet.present();
  }

  detalle_user() {
    this.router.navigate(['/tabs/detalle-usuario'], { queryParams: {usuario: this.user.id}});
  }

}
