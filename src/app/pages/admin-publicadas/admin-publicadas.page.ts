import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-publicadas',
  templateUrl: './admin-publicadas.page.html',
  styleUrls: ['./admin-publicadas.page.scss'],
})
export class AdminPublicadasPage implements OnInit {
  
  lista:string[]=["img1","img2","img3",
  "img4","img5","img6",
  "img7","img8","img9",
  "img10","img11","img12"
  ];
  constructor() { }

  ngOnInit() {
  }

}
