import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-denuncia',
  templateUrl: './card-denuncia.component.html',
  styleUrls: ['./card-denuncia.component.scss'],
})
export class CardDenunciaComponent implements OnInit {

  @Input() denuncia: any;
  @Input() estado: string;


  constructor() { }

  ngOnInit() { }

}
