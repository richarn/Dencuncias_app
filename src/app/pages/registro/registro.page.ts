import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { StorageService } from 'src/app/services/storage.service';
import { GeneralService } from 'src/app/services/general.service';
import { BarrioService } from 'src/app/services/barrio.service';
import { RolesService } from 'src/app/services/roles.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  user;
  usuario;
  barrios = [];
  roles = [];
  registroForm: FormGroup;

  constructor(
    private generalService: GeneralService,
    private storageService: StorageService,
    private barrioService: BarrioService,
    private rolesService: RolesService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.createForm();
    this.obtenerBarrios();
    this.obtenerRoles();
  }

  async ionViewWillEnter(){
    this.user = await this.userService.getUser();
  }

  async ngOnInit() {
    // this.usuario = await this.userService.user();
  }

  async obtenerBarrios() {
    const response: any = await this.barrioService.barrios();

    if (response.success) {
      this.barrios = response.barrios;
    }
  }

  async obtenerRoles() {
    const response: any = await this.rolesService.roles();

    if (response.success) {
      this.roles = response.roles;
    }
  }

  createForm() {
    this.registroForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z][^0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.nullValidator]],
      password_confirmation: ['', Validators.nullValidator],
      ci: ['', [Validators.required, Validators.minLength(7)]],
      telefono: ['', [Validators.required, Validators.nullValidator]],
      id_barrio: ['', [Validators.required, Validators.nullValidator]],
      id_role: [2, [Validators.required, Validators.nullValidator]],
      estado: [1, [Validators.required, Validators.nullValidator]]
    });
  }

  async onSubmit() {
    const data = {...this.registroForm.value};
    if (this.user && this.user.role.nivel == 1) {
      data['ignoreToken'] = true;
    }

    const datoServicio: any = await this.userService.registro(data);
    if (datoServicio.ok) {
      this.generalService.mostrarMensaje('Usuario registrado correctamente');
      this.router.navigate(['/login'])
    } else {
      this.generalService.mostrarMensaje('Ha ocurrido un problema...');
    }
  }  

}
