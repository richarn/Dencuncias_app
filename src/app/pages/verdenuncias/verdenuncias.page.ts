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
  denuncias = [
    { fecha_denuncia: '06/07/2021 08:50', barrio: 'Kennedy', descripcion: 'Denuncia 1' },
    { fecha_denuncia: '07/07/2021 15:13', barrio: 'Loma', descripcion: 'Denuncia 2' },
    { fecha_denuncia: '08/07/2021 10:40', barrio: 'Azcurra', descripcion: 'Denuncia 3' },
    { fecha_denuncia: '09/07/2021 12:07', barrio: 'Alegre', descripcion: 'Denuncia 4' },
    { fecha_denuncia: '10/07/2021 16:14', barrio: 'Cerro Real', descripcion: 'Denuncia 5' },
    { fecha_denuncia: '11/07/2021 21:45', barrio: 'Costa Puku', descripcion: 'Denuncia 6' },
  ];

  filterForm: FormGroup;

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
    // this.obtenerDenuncias();

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

  async obtenerDenuncias(query = {}) {
    if (!query['estado']) query['estado'] = 1;
    const response: any = await this.denunciaService.GetDenuncia(query);
    if (response.success) {
      this.denuncias = response.data;
    }
  }

  async obtenerBarrios() {
    const response: any = await this.barrioService.barrios();
    if (response.success) {
      this.barrios = response.barrios;
    }
  }

  filtrar(event) {
    console.log(event, this.filterForm.value);
    this.obtenerDenuncias(this.filterForm.value);
  }

  redirectTo(denuncia) {
    this.router.navigate(['/tabs/detalle-denuncia'], { queryParams: { denuncia: denuncia.id } });
  }

  agregarDenuncia() {
    this.router.navigate(['/tabs/denuncias'])
  }

}
