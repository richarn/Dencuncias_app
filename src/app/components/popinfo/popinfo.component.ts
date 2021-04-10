import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-popinfo',
  templateUrl: './popinfo.component.html',
  styleUrls: ['./popinfo.component.scss'],
})
export class PopinfoComponent implements OnInit {

  @Input() titulo; 
  @Input() descripcion;


  constructor( private popoverCtrl: PopoverController) { }

  ngOnInit() {}

  onClick(){
    
    this.popoverCtrl.dismiss();
        
  }

}
