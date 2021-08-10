import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';

import { FiltrosComponent } from 'src/app/components/filtros/filtros.component';

import { DenunciaService } from 'src/app/services/denuncia.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verdenuncias',
  templateUrl: 'verdenuncias.page.html',
  styleUrls: ['verdenuncias.page.scss']
})
export class VerdenunciasPage {

  user;
  idDenuncia;
  denuncias = [];

  scrolling = false;
  infScrollDisabled: boolean = false;

  constructor(
    private modalController: ModalController,
    private denunciaService: DenunciaService,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) {

    this.activeRoute.queryParams.subscribe(params => {
      if (params.denuncia) {
        this.idDenuncia = params.denuncia;
      }
    });

  }

  async ionViewWillEnter() {
    this.refresh(null);

    // obtener datos del usuario desde el servicio y asignar al formulario
    this.user = await this.userService.getUser();
  }

  async ngOnInit() {}

  async obtenerDenuncias(event, query = {}, pull: boolean = false) {
    if (!query['estado']) query['estado'] = 1;

    const response: any = await this.denunciaService.GetDenuncia(query, pull);
    if (response.ok) {
      this.denuncias.push(...response.body.data);
    }
      
    if (event) {
      event.target.complete();

      if (response.body.data.length === 0) { this.infScrollDisabled = true; }
    }

    this.scrolling = false;
  }

  async showFilters() {
    const modal = await this.modalController.create({
      component: FiltrosComponent,
      cssClass: 'max-height-40 align-items-end'
    });

    await modal.present();

    modal.onWillDismiss()
    .then(event => {
      if (event.data) {
        this.denuncias = [];
        this.obtenerDenuncias(null, event.data, true);
      }
    })
  }

  redirectTo(denuncia) {
    this.router.navigate(['/tabs/detalle-denuncia'], { queryParams: { denuncia: denuncia.id } });
  }

  agregarDenuncia() {
    this.router.navigate(['/tabs/denuncias'])
  }

  refresh(event) {
    this.denuncias = [];
    this.infScrollDisabled = false;
    this.obtenerDenuncias(event, {}, true);
  }

}
