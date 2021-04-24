import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, PopoverController } from '@ionic/angular';
import { DenunciaService } from 'src/app/services/denuncia.service';


@Component({
  selector: 'app-admin-denuncias',
  templateUrl: './admin-denuncias.page.html',
  styleUrls: ['./admin-denuncias.page.scss'],
})
export class AdminDenunciasPage implements OnInit {

  denuncias = [];

  constructor(
    private popoverCtrl: PopoverController,
    private denunciasService: DenunciaService,
    private activeRoute: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
  ) {
    this.obtenerDenuncias();
   }

  ngOnInit() {
  }

  async obtenerDenuncias() {
    const response: any = await this.denunciasService.GetDenuncia();

    if (response.success) {
      this.denuncias = response.denuncias;
    }
  }

}
