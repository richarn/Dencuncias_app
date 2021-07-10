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
      console.log(params);
      if (params.denuncia) {
        this.idDenuncia = params.denuncia;
      }
    });

    this.createForm();
    this.obtenerBarrios();
  }


  async ionViewWillEnter() {
    this.obtenerDenuncias();
    
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
    console.log("denuncias:", this.denuncias);
    
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
    this.router.navigate(['/tabs/detalle-denuncia'], { queryParams: { denuncia: denuncia.id }});
  }
 
  userDenuncia(){
    this.router.navigate(['/tabs/user-denuncias']);
  }
  
  onClick(){
    this.navCtrl.navigateBack('/');
  }

}
