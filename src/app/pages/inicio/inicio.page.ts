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

  idNoticia;
  slideOpts = {
    initialSlide: 0,
    speed: 200,
    autoplay:true
  };

  noticias = [];

  slides: { img: string, titulo: string, desc: string }[] = [
    {
      img: '/assets/slides/photos.svg',
      titulo: 'Comparte Fotos',
      desc: 'Mira y comparte increíbles fotos de todo el mundo'
    },
    {
      img: '/assets/slides/music-player-2.svg',
      titulo: 'Escucha Música',
      desc: 'Toda tu música favorita está aquí'
    },
    {
      img: '/assets/slides/calendar.svg',
      titulo: 'Nunca olvides nada',
      desc: 'El mejor calendario del mundo a tu disposición'
    },
    {
      img: '/assets/slides/placeholder-1.svg',
      titulo: 'Tu ubicación',
      desc: 'Siempre sabremos donde estás!'
    }
  ];  


  constructor(
    private popoverCtrl: PopoverController,
    private noticiasService: NoticiaService,
    private activeRoute: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
  ) {

    this.activeRoute.queryParams.subscribe(params => {
      console.log(params);
      if (params.noticia) {
        this.idNoticia = params.noticia;
      }
    });

    this.obtenerNoticias();
  }

  ngOnInit() {
  }

  async obtenerNoticias() {
    const query = {estado: 1};
    const response: any = await this.noticiasService.listar(query);
    if (response.success) {
      this.noticias = response.data;
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
