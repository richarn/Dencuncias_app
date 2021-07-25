import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';

import { NoticiaService } from 'src/app/services/noticia.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.page.html',
  styleUrls: ['./detalle-noticia.page.scss'],
})
export class DetalleNoticiaPage implements OnInit {

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

  constructor(
    private noticiasService: NoticiaService,
    private generalService: GeneralService,
    private activeRoute: ActivatedRoute,
    private formBuider: FormBuilder,
    private router: Router
  ) {
    this.activeRoute.queryParams.subscribe((params) => {
      if (params.noticia) {
        this.idNoticia = params.noticia;
        this.obtenerNoticias();
      }
    });
  }

  ngOnInit() {}

  async obtenerNoticias() {
    this.generalService.showLoading();

    const response: any = await this.noticiasService.obtenerId(this.idNoticia);

    if (response.success) {
      this.noticia = response.data;
    }

    this.generalService.hideLoading();
  }

}
