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
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: [''],
      ci: ['', Validators.required],
      telefono: ['', Validators.required],
      id_barrio: ['', Validators.required],
      id_role: [2, Validators.required],
      estado: [1, Validators.required]
    });
  }

  async onSubmit() {
    const datoServicio: any = await this.userService.registro(this.registroForm.value);
    if (datoServicio.ok) {
      this.generalService.mostrarMensaje('Usuario registrado correctamente');
      this.router.navigate(['/login'])
    } else {
      this.generalService.mostrarMensaje('Ha ocurrido un problema...');
    }
  }  

}
