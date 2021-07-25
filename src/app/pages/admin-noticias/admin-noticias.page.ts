import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { CameraService } from 'src/app/services/camera.service';
import { StorageService } from 'src/app/services/storage.service';

import { Subscription } from 'rxjs';
import { NoticiaService } from 'src/app/services/noticia.service';
import { GeneralService } from 'src/app/services/general.service';

declare var window: any;
@Component({
  selector: 'app-admin-noticias',
  templateUrl: './admin-noticias.page.html',
  styleUrls: ['./admin-noticias.page.scss'],
})
export class AdminNoticiasPage implements OnInit {

  imagenes: any[]=[];
  previewImages: string[] = [];

  user;
  noticias;
  noticiasForm: FormGroup;


  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private generalService: GeneralService,
    private noticiaService: NoticiaService,
    private toastController: ToastController,

  ){
    this.createForm();
  }

  async ionViewWillEnter(){
    //obtener los datos del usuario
    this.user = await this.userService.getUser();
    if (this.user) {this.noticiasForm.controls.id_user.setValue(this.user.id); }
  }


  ngOnInit() {
    const removeImage = this.generalService.removeImage
    .subscribe(index => {
      if (this.imagenes[index]) this.imagenes.splice(index, 1);
    });

    this.subscriptions.push(removeImage)
  }

  createForm() {
    console.log('createForm: asdf');
     
    this.noticiasForm = this.formBuilder.group({
    titulo_noticia: ['', Validators.required],
    descripcion_noticia: ['', Validators.required],
    estado : [0, Validators.required],
    id_user : ['', Validators.required],

    });
  }

  async onSubmit() {
    
    // formulario -> servicio -> api/controlador

    // datos del formulario
    const data = {...this.noticiasForm.value};
    // se agrega el atributo imagenes con las imagenes a enviar
    data['imagenes'] = this.imagenes;
    
    const respuesta: any = await this.noticiaService.noticias(data);

    if (respuesta.success) {
      const toast = await this.toastController.create({
        message: 'Noticia enviada correctamente',
        duration: 2000
    });

      this.imagenes = [];
      this.previewImages = [];
      // this.noticiasForm.reset();

      await toast.present();

      // this.router.navigate(['/']);
    }   
  }  
 
  imagenesSeleccionadas(event) {
    this.imagenes = event.imagenes;
    this.previewImages = event.preview;
  }

  onDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
