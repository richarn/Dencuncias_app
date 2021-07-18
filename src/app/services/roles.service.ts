import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { StorageService } from './storage.service';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  key: any;
  token: any;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  // Obtener roles
  roles() {
    return new Promise(resolve => {
      this.http.get(`${API}/roles`)
        .subscribe(
          (response: any) => resolve(response),
          error => resolve(error)
        );
    });
  }

  // Crear roles
  crear(data) {
    return new Promise(resolve => {
      this.http.post(`${API}/roles`, data)
        .subscribe(
          (response: any) => resolve(response),
          error => resolve(error)
        );
    });
  }
}
