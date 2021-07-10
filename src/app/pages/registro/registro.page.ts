import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { BarrioService } from 'src/app/services/barrio.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario;
  barrios = [];
  registroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private storageService: StorageService,
    private barrioService: BarrioService,
    private generalService: GeneralService,
    private router: Router
  ) { 
    this.createForm();
    this.obtenerBarrios();
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
