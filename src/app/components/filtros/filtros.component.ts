import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { BarrioService } from 'src/app/services/barrio.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
})
export class FiltrosComponent implements OnInit {

  barrios = [];
  filterForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private barrioService: BarrioService,
    private formBuilder: FormBuilder,
  ) {
    this.createForm();
  }

  ionViewWillEnter() {
    this.obtenerBarrios();
  }

  ngOnInit() {}

  createForm() {
    this.filterForm = this.formBuilder.group({
      id_barrio: [''],
      fecha: ['']
    });
  }

  async obtenerBarrios() {
    const response: any = await this.barrioService.barrios();
    if (response.success) {
      this.barrios = response.barrios;
    }
  }

  confirm() {
    this.modalController.dismiss(this.filterForm.value);
    console.log("form", this.filterForm.value);
    
  }

  close() {
    this.modalController.dismiss();
  }

}
