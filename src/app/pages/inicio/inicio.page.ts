import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, PopoverController } from '@ionic/angular';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { NoticiaService } from 'src/app/services/noticia.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 200,
    autoplay:true,
    slidesPerView: 5,
  };

  noticia;
  noticias = [];
  slideNoticias = [];

  constructor(
    private popoverCtrl: PopoverController,
    private noticiasService: NoticiaService,
    private activeRoute: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
  ) {
    this.obtenerNoticias();
  }

  ngOnInit() {
  }

  async obtenerNoticias(query = {}) {
    if (!query['estado']) query['estado'] = 1;

    const response: any = await this.noticiasService.listar(query);
    if (response.success) {
      this.noticias = response.data;
      this.slideNoticias = response.data;

      if (this.noticias.length) {
        this.noticia = this.noticias[0];
        this.slideNoticias.splice(0, 1);
      }

    }
  }

  onSearchChange(event) {
    const search = event.detail.value;

    if (search && search.length > 3) {
      this.obtenerNoticias({ search });
    } else if (search == '') {
      this.obtenerNoticias();
    }
  }

  async mostrarPopVision(evento){
    const popover = await this.popoverCtrl.create({
      component: PopinfoComponent,
      event: evento,
      mode: 'ios',
      componentProps: {
        titulo: "Visión",
        descripcion: "Esto es la descripcion Visión"   
      }
    });

    await popover.present(); 
  }

  async mostrarPopMision(evento){
    const popover = await this.popoverCtrl.create({
      component: PopinfoComponent,
      event: evento,
      mode: 'ios',
      componentProps: {
        titulo: "Misión",
        descripcion: "Esto es la descripcion de Misión"   
      }
    });

    await popover.present(); 
  }  

  async mostrarPopContacto(evento){
    const popover = await this.popoverCtrl.create({
      component: PopinfoComponent,
      event: evento,
      mode: 'ios',
      componentProps: {
        titulo: "Contactos",
        descripcion: "Esto es la descripcion de Contactos"   
      }

      
    });

    await popover.present(); 
  }

  agregarDenuncia() {
    this.router.navigate(['/tabs/denuncias'])
  }

  redirectTo(noticia) {
    this.router.navigate(['/tabs/detalle-noticia'], { queryParams: { noticia: noticia.id }})
  }

  onClick(){
    this.navCtrl.navigateBack('/');
  }
}
