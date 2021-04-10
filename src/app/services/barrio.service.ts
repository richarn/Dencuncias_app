import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { StorageService } from './storage.service';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class BarrioService {
  key: any;
  token: any;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  // Obtener barrios
  barrios() {
    return new Promise(resolve => {
      this.http.get(`${API}/barrios`)
        .subscribe(
          (response: any) => resolve(response),
          error => resolve(error)
        );
    });
  }

  // Crear barrio
  crear(data) {
    return new Promise(resolve => {
      this.http.post(`${API}/barrios`, data)
        .subscribe(
          (response: any) => resolve(response),
          error => resolve(error)
        );
    });
  }
}
