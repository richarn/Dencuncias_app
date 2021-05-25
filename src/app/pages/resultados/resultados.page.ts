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
  constructor(
    private denunciaService: DenunciaService,
    private activeRoute: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
    private userService: UserService

  ){
    this.activeRoute.queryParams.subscribe(params =>{
      console.log(params);
      if(params.denuncia){
        this.idDenuncia = params.denuncia;
      }
    });
  }

  async ionViewWillEnter(){
    this.user = await this.userService.getUser();
    this.obtenerDenuncia();
  }

  ngOnInit() {
  }

  async obtenerDenuncia(){
    const query = {estado: 2}
    const response: any = await this.denunciaService.GetDenuncia(query); 
    if(response.success){
      this.denuncias = response.data; 
    }
    console.log("denuncias :", this.denuncias);
    
  }

  redirectTo(denuncia){
    this.router.navigate(['/detalle-denuncia'], { queryParams: {denuncia: denuncia.id}});
  }

  onClick(){
    this.navCtrl.navigateBack('/');
  }
}
