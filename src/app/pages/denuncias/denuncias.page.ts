import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { DenunciaService } from 'src/app/services/denuncia.service';
import { LocationService } from 'src/app/services/location.service';
import { GeneralService } from 'src/app/services/general.service';
import { BarrioService } from 'src/app/services/barrio.service';

import { Subscription } from 'rxjs';

declare var window: any;
@Component({
  selector: 'app-denuncias',
  templateUrl: 'denuncias.page.html',
  styleUrls: ['denuncias.page.scss']
})
export class DenunciasPage {


  cargandoGeo = false;

  barrios: any[] = [];
  imagenes: any[] = [];
  previewImages: any[] = [];

  ubicacion = { 
    coords: null,
    posicion: false
  };

  user;
  denuncia;
  denunciaForm: FormGroup;

  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private barrioService: BarrioService,
    private generalService: GeneralService,
    private locationService: LocationService,
    private denunciaService: DenunciaService,
  ) {
    this.createForm();
    this.obtenerBarrios();
  }

  async ionViewWillEnter() {
    // obtener datos del usuario desde el servicio y asignar al formulario
    this.user = await this.userService.getUser();

    if (this.user) { this.denunciaForm.controls.id_user.setValue(this.user.id); }

    // Espera las coordenadas enviadas desde el servicio
    const location = this.locationService.coordinates
    .subscribe(coordenadas => {
      if (coordenadas) {
        // asignar lat;lng al formulario
        this.denunciaForm.controls.ubicacion.setValue(`${coordenadas.latitude};${coordenadas.longitude}`);
      }
      this.cargandoGeo = false;
    });

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

    this.subscriptions.push(location);
    this.subscriptions.push(removeImage);
    this.subscriptions.push(limpiarImagenes);
  }

  async ngOnInit() {}

  createForm() {
    this.denunciaForm = this.formBuilder.group({
      id: [''],
      id_barrio: ['', [Validators.required, Validators.nullValidator]],
      descripcion_denuncia: ['', [Validators.required, Validators.nullValidator]],
      estado : [0, Validators.required],
      ubicacion : ['', Validators.required],
      id_user : ['', Validators.required],
    });
  }

  async obtenerBarrios() {
    const response: any = await this.barrioService.barrios();
    if (response.success) {
      this.barrios = response.barrios;
    }
  }

  async obtenerDenuncia() {
    for (let key in this.denuncia) {
      if (this.denunciaForm.value[key]) {
        this.denunciaForm.controls[key].setValue(this.denuncia[key])
      }
    }
  }

  onSubmit() {  
    if (this.denunciaForm.value.id) this.actualizarDenuncia();
    else this.crearDenuncia();
  }

  async crearDenuncia() {
    // formulario -> servicio -> api/controlador

    // datos del formulario
    const data = {...this.denunciaForm.value};
    // se agregar el atributo imagenes con las imagenes a enviar
    data['imagenes'] = this.imagenes;
    
    // enviar datos del formulario al servicio
    const respuesta: any = await this.denunciaService.registrar(data);

    if (respuesta.success) {
      this.generalService.mostrarMensaje('Denuncia enviada correctamente');

      // this.denuncia = respuesta.data;

      // await this.generalService.createQueue(this.imagenes, this.subirImagen.bind(this))

      this.imagenes = [];
      this.ubicacion.posicion = false;
      this.generalService.limpiarImagenes.emit();
      this.denunciaForm.reset();

      this.createForm();
      this.router.navigate(['/']);
    }
  }

  imagenesSeleccionadas({ imagenes, preview }) {
    this.imagenes = imagenes;
    this.previewImages = preview;
  }

  // async subirImagen(blob: Blob) {
  //   const response: any = await this.denunciaService.uploadImage(this.denuncia.id, blob);
  //   if (response.success) {
  //     console.log('imagen subida')
  //   }
  // }

  async actualizarDenuncia() {
    const data = {...this.denunciaForm.value};
    // se agregar el atributo imagenes con las imagenes a enviar
    data['imagenes'] = this.imagenes;
    
    // enviar datos del formulario al servicio
    const respuesta: any = await this.denunciaService.actualizar(data);

    if (respuesta.success) {
      this.generalService.mostrarMensaje('Denuncia actualizada correctamente');

      // this.denuncia = respuesta.data;
      // await this.generalService.createQueue(this.imagenes, this.subirImagen.bind(this))

      this.imagenes = [];
      this.ubicacion.posicion = false;
      this.generalService.limpiarImagenes.emit();
      this.denunciaForm.reset();

      this.router.navigate(['/']);
    }
  }


  getGeo() {
    if (!this.ubicacion.posicion ) {
      this.ubicacion.coords = null;
      return;
    }
    
    this.cargandoGeo = true;

    this.locationService.requestPermissions();
  }

  onDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
