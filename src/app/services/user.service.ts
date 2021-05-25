import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';


const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  key: any;
  token: any;

  protected userInfo;

  constructor(
    private http: HttpClient,
    private navController: NavController,
    private storageService: StorageService,
  ) { }

  signup() { }

  login(data) {
    return new Promise(resolve => {
      this.http.post(`${API}/auth/login`, data, { observe: 'response' })
        .subscribe(
          (response: any) => {
            // Guarda el token de acceso
            this.storageService.set('token', response.body.access_token);
            return resolve(response);
          },
          error => resolve(error)
        );
    });
  }

  registro(data) {
    return new Promise(resolve => {
      this.http.post(`${API}/auth/register`, data, { observe: 'response' })
        .subscribe(
          (response: any) => {
            // Guarda el token de acceso
            this.storageService.set('token', response.body.access_token);
            return resolve(response);
          },
          error => resolve(error)
        );
    });
  }
  
  async getUser() {
    if (!this.userInfo) {
      await this.user();
    }

    return { ...this.userInfo };
  }

  // Datos del usuario
  async user(): Promise<boolean> {

    const token = await this.storageService.get("token");
    console.log('token: ', token);

    if (!token) {
      this.navController.navigateRoot('/login');
      return Promise.resolve(false);
    }
    
    return new Promise(resolve => {
      const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
      this.http.get(`${API}/auth/user`, { headers, observe: 'response' })
        .subscribe(
          (response: any) => {
            if (response.ok) {
              this.userInfo = response.body;
              return resolve(true);
            }

            return resolve(false);
          },
          error => resolve(false)
        );
    });
  }
}
