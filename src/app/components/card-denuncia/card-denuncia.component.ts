import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-denuncia',
  templateUrl: './card-denuncia.component.html',
  styleUrls: ['./card-denuncia.component.scss'],
})
export class CardDenunciaComponent implements OnInit {

  @Input() denuncia: any;
  @Input() estado: string;


  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  redirectTo(denuncia) {
    this.router.navigate(['/tabs/detalle-denuncia'], { queryParams: { denuncia: denuncia.id } });
  }

}
