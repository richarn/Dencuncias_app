import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-arregladas',
  templateUrl: './admin-arregladas.page.html',
  styleUrls: ['./admin-arregladas.page.scss'],
})
export class AdminArregladasPage implements OnInit {

  lista:string[]=["img1","img2","img3",
  "img4","img5","img6",
  "img7","img8","img9",
  "img10","img11","img12"
  ];
  constructor() { }

  ngOnInit() {
  }

}
