import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service'
import { Componente } from '../../interfaces/interfaces';

@Component({
  selector: 'app-admin-inicio',
  templateUrl: './admin-inicio.page.html',
  styleUrls: ['./admin-inicio.page.scss'],
})
export class AdminInicioPage implements OnInit {

  componentes: Observable<Componente[]>;
  
  constructor( private dataService: DataService ) { }

  ngOnInit() {
    // this.componentes = this.dataService.getMenuOpts();
  }

}
