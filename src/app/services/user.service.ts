import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';


const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  key: any;
  token: any;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  signup() { }

  login(data) {
    return new Promise(resolve => {
      this.http.post(`${API}/auth/login`, data)
        .subscribe(
          (response: any) => {
            // Guarda el token de acceso
            this.storageService.set('token', response.access_token);
            return resolve(response);
          },
          error => resolve(error)
        );
    });
  }

  registro(data) {
    return new Promise(resolve => {
      this.http.post(`${API}/auth/register`, data)
        .subscribe(
          (response: any) => {
            // Guarda el token de acceso
            this.storageService.set('token', response.access_token);
            return resolve(response);
          },
          error => resolve(error)
        );
    });
  }
  

  // Datos del usuario
  async user() {

    const token = await this.storageService.get("token");
    
    return new Promise(resolve => {
      const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
      this.http.get(`${API}/auth/user`, { headers })
        .subscribe(
          response => resolve(response),
          error => resolve(error)
        );
    });
  }
}
