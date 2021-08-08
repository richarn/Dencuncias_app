import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NoticiaService } from 'src/app/services/noticia.service';
import { GeneralService } from 'src/app/services/general.service';
import { UserService } from 'src/app/services/user.service';

import { Subscription } from 'rxjs';

declare var window: any;
@Component({
  selector: 'app-admin-noticias',
  templateUrl: './admin-noticias.page.html',
  styleUrls: ['./admin-noticias.page.scss'],
})
export class AdminNoticiasPage implements OnInit {

  imagenes: any[]=[];
  // previewImages: string[] = [];

  user;
  noticias;
  noticiasForm: FormGroup;
  previewImages: any[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private generalService: GeneralService,
    private noticiaService: NoticiaService,

  ){
    this.createForm();
  }

  async ionViewWillEnter(){
    //obtener los datos del usuario
    this.user = await this.userService.getUser();
    if (this.user) {this.noticiasForm.controls.id_user.setValue(this.user.id); }

    const limpiarImagenes = this.generalService.limpiarImagenes
    .subscribe(() => {
      this.imagenes = [];
      this.previewImages = [];
    });

    const removeImage = this.generalService.removeImage
    .subscribe(({ index, type }) => {
      if (this.imagenes[index]) this.imagenes.splice(index, 1);
      if (this.previewImages[index]) this.previewImages.splice(index, 1);
    });


    this.subscriptions.push(removeImage);
    this.subscriptions.push(limpiarImagenes);
  }


  ngOnInit() {

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
      this.generalService.mostrarMensaje('Noticia enviada correctamente');

      this.imagenes = [];
      this.previewImages = [];
    }   
  }  
 
  // imagenesSeleccionadas(event) {
  //   this.imagenes = event.imagenes;
  //   this.previewImages = event.preview;
  // }
  

  imagenesSeleccionadas({ imagenes, preview }) {
    this.imagenes = imagenes;
    this.previewImages = preview;
  }
  onDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
