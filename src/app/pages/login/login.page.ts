import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { StorageService } from 'src/app/services/storage.service';
import { GeneralService } from 'src/app/services/general.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private generalService: GeneralService,
  ) {
    this.createForm();
  }

  async ngOnInit() {
  }

  async ionViewWillEnter() {
    // obtener datos del usuario desde el servicio y asignar al formulario
    this.user = await this.userService.getUser();
    if (this.user) {
      this.router.navigate(['/tabs/home']);
    }
   }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.nullValidator]]
    });
  }

  async onSubmit() {
    this.generalService.showLoading('Iniciando sesión...');

    const cualquiercosa: any = await this.userService.login(this.loginForm.value);
    if (cualquiercosa.ok) {
      this.router.navigate(['/'])
    } else {
      this.generalService.mostrarMensaje('El usuario y/o contraseña son incorrectos');
    }

    this.generalService.hideLoading();
  }

}
