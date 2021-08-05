import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DenunciaService } from 'src/app/services/denuncia.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-resultados',
  templateUrl: 'resultados.page.html',
  styleUrls: ['resultados.page.scss']
})
export class ResultadosPage {

  idDenuncia;
  user;
  denuncias = [];

  scrolling: boolean = false;
  infScrollDisabled: boolean = false;
  

  constructor(
    private denunciaService: DenunciaService,
    private activeRoute: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
    private userService: UserService

  ) {
    this.activeRoute.queryParams.subscribe(params => {
      if (params.denuncia) {
        this.idDenuncia = params.denuncia;
      }
    });
  }

  async ionViewWillEnter() {
    this.user = await this.userService.getUser();
    this.refresh(null);
  }

  ngOnInit() {
  }

  async obtenerDenuncia(event, query = {}, pull: boolean = false) {
    if (!query['estado']) query['estado'] = 2;
    const response: any = await this.denunciaService.GetDenuncia(query, pull);
    if (response.ok) {
      this.denuncias.push(...response.body.data);
    }

    if (event) {
      event.target.complete();

      if (response.body.data.length === 0) { this.infScrollDisabled = true; }
    }

    this.scrolling = false;
  }

  redirectTo(denuncia) {
    this.router.navigate(['/tabs/detalle-denuncia'], { queryParams: { denuncia: denuncia.id } });
  }

  onClick() {
    this.navCtrl.navigateBack('/');
  }

  refresh(event) {
    this.denuncias = [];
    this.infScrollDisabled = false;
    this.obtenerDenuncia(event, {}, true);
  }
}
