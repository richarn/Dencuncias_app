import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiaService } from 'src/app/services/noticia.service';

@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.page.html',
  styleUrls: ['./detalle-noticia.page.scss'],
})
export class DetalleNoticiaPage implements OnInit {

  idNoticia;
  noticia;


  constructor(
    private noticiasService: NoticiaService,
    private activeRoute: ActivatedRoute,
    private router: Router
    ) {
      this.activeRoute.queryParams.subscribe(params => {
        console.log(params);
        if (params.noticia) {
          this.idNoticia = params.noticia;
          this.obtenerNoticias();
        }
      });

     }


  ngOnInit() {
  }

  async obtenerNoticias() {
    //const query = {estado: 1};
    console.log('antes peticion: ', this.noticia);
    
    const response: any = await this.noticiasService.obtenerId(this.idNoticia);
    console.log(this.idNoticia);
    
    if (response.success) {
      console.log(typeof response.data);
      
      this.noticia = response.data;
      console.log('despues peticion: ', this.noticia);
    }
  }

}
