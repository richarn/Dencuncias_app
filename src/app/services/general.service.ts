import { environment } from 'src/environments/environment';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { StorageService } from './storage.service';
import { ToastController } from '@ionic/angular';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  
  @Output() limpiarImagenes: EventEmitter<any> = new EventEmitter();

  constructor(
    private toastController: ToastController
  ) { }

  async mostrarMensaje(header) {
    const toast = await this.toastController.create({
      header,
      duration: 3000
    });

    await toast.present();
  }

  createQueue(tasks, callback) {
    let taskIndex = 0;

    return new Promise(done => {
      const handleResult = result => {
        taskIndex++;
        getNextTask();
      };
      const getNextTask = async () => {
        if (taskIndex < tasks.length) {
          const element = tasks[taskIndex];
          const response = await callback(element);
          handleResult(response);
        } else {
          done({ success: true });
        }
      };
      getNextTask();
    });
  }

}