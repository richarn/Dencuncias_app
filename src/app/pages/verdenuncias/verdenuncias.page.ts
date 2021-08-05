import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { DenunciaService } from 'src/app/services/denuncia.service';
import { BarrioService } from 'src/app/services/barrio.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-verdenuncias',
  templateUrl: 'verdenuncias.page.html',
  styleUrls: ['verdenuncias.page.scss']
})
export class VerdenunciasPage {

  user;
  idDenuncia;
  barrios = [];
  denuncias = [];

  scrolling = false;
  filterForm: FormGroup;
  infScrollDisabled: boolean = false;

  constructor(
    private denunciaService: DenunciaService,
    private barrioService: BarrioService,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private router: Router,
  ) {

    this.activeRoute.queryParams.subscribe(params => {
      if (params.denuncia) {
        this.idDenuncia = params.denuncia;
      }
    });

  }

  async ionViewWillEnter() {
    this.obtenerDenuncias(null, {}, true);

    // obtener datos del usuario desde el servicio y asignar al formulario
    this.user = await this.userService.getUser();
  }

  ngOnInit() {
  }

  createForm() {
    this.filterForm = this.formBuilder.group({
      id_barrio: [''],
      fecha: ['']
    });
  }

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

  async obtenerBarrios() {
    const response: any = await this.barrioService.barrios();
    if (response.success) {
      this.barrios = response.barrios;
    }
  }

  filtrar(event) {
    this.obtenerDenuncias(this.filterForm.value);
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
