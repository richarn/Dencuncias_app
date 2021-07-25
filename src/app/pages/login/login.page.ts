import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private toastController: ToastController,
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
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    const cualquiercosa: any = await this.userService.login(this.loginForm.value);
    if (cualquiercosa.ok) {
      this.router.navigate(['/'])
    } else {
      this.toastController.create({
        header: 'El usuario y/o contraseña son incorrectos',
        duration: 3000
      });
    }
  }

}
