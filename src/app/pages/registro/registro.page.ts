import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { BarrioService } from 'src/app/services/barrio.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private toastController: ToastController,
    private router: Router
  ) { 
    this.createForm();
    this.obtenerBarrios();
  }

  async ngOnInit() {
    this.usuario = await this.userService.user();
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
      this.toastController.create({
        header: 'Usuario registrado correctamente',
        duration: 3000
      });
      this.router.navigate(['/login'])
    } else {
      this.toastController.create({
        header: 'Ha ocurrido un problema, ...',
        duration: 3000
      });
    }
  }  

}
