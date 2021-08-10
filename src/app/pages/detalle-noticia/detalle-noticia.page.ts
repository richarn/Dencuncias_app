import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';

import { NoticiaService } from 'src/app/services/noticia.service';
import { UserService } from 'src/app/services/user.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.page.html',
  styleUrls: ['./detalle-noticia.page.scss'],
})
export class DetalleNoticiaPage implements OnInit {
  [x: string]: any;

  idNoticia;
  noticia;
  previewImages = [];

  noticiasForm: FormGroup;

  slideOpts = {
    loop: true,
    slidesPerView: 2.5,
    spaceBetween: 5,
    autoplay: {
      delay: 1000,
    },
  }

  imagenes = [];
  imagenesPrevias = [];
  imagenesSinSubir = [];
  user;
  formulario: FormGroup;
  constructor(
    private noticiasService: NoticiaService,
    private generalService: GeneralService,
    private activeRoute: ActivatedRoute,
    private formBuider: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.activeRoute.queryParams.subscribe((params) => {
      if (params.noticia) {
        this.idNoticia = params.noticia;
        
        // this.inicializarFormulario();
        this.obtenerNoticias();
      }
    });
  }

  async ionViewWillEnter() {
    // obtener datos del usuario desde el servicio y asignar al formulario
    this.user = await this.userService.getUser();
   
  }
  ngOnInit() {}
  
  
  
  
  async obtenerNoticias() {
    this.generalService.showLoading();
    
    const response: any = await this.noticiasService.obtenerId(this.idNoticia);
    
    if (response.success) {
      this.noticia = response.data;

      this.imagenesPrevias = this.noticia.imagenes.filter(imagen => imagen.estado == 0 || imagen.estado == 1);
      
      this.imagenesPrevias = this.imagenesPrevias.map(imagen => `${environment.host}${imagen.url}`) || [];
      console.log(this.imagenesPrevias);
      //this.cargarFormulario();
      
    }
    
    this.generalService.hideLoading();
  }

  
  // inicializarFormulario() {
  //   this.formulario = this.formBuilder.group({
  //     id: ['', Validators.required],
  //     titulo: ['', Validators.required],
  //     descripcion: ['', Validators.required],
  //     estado : [1, Validators.required],
  //   })
  // }
  
  cargarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [this.noticia.id, Validators.required],
      titulo: [this.noticia.titulo, Validators.required],
      descripcion : [this.noticia.descripcion],
      estado : [this.noticia.estado],
    })  
  }

  imagenesSeleccionadas({ imagenes, preview }) {
    this.imagenes = imagenes;
    this.previewImages = preview;
  }


}
