import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
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

  @Output() updateUserInfo: EventEmitter<any> = new EventEmitter();

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

  GetUser(){
    return new Promise(resolve => {
      this.http.get(`${API}/usuarios`)
        .subscribe(
          (response: any) => resolve(response),
          error => resolve(error)
        );
    });
  }
  
  obtenerId(data) {
    return new Promise(resolve => {
      console.log('data: ->', data);
      
      this.http.get(`${API}/usuarios/${data}`, data)
        .subscribe(
          (response: any) => resolve(response),
          error => resolve(error)
        );
    });
  }
  
  // Datos del usuario
  async user(fromGuard = false): Promise<boolean> {

    const token = await this.storageService.get("token");
    console.log('token: ', token);

    if (!token && fromGuard) {
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
              this.updateUserInfo.emit(this.userInfo);
              return resolve(true);
            }

            return resolve(false);
          },
          error => resolve(false)
        );
    });
  }

  async logout() {
    this.token = null;
    this.userInfo = null;
    this.storageService.clear();
    await this.getUser();
    this.updateUserInfo.emit(this.user);
    // this.navCtrl.navigateRoot('/main/home', {animated: true});
  }

  eliminar(idUsuario) {
    return new Promise(resolve => {
      this.http.delete(`${API}/usuarios/${idUsuario}`)
      .subscribe(
        (response: any) => resolve(response),
        error => resolve(error)
      );
    });
  }

  actualizar(data) {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    return new Promise(resolve => {
      this.http.post(`${API}/usuarios/${data.id}`, formData)
      .subscribe(
        (response: any) => resolve(response),
        error => resolve(error)
      );
    });
  }

}
