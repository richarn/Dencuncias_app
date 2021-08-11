import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { StorageService } from './storage.service';


const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

    // Crear contacto
    crear(data) {
      return new Promise(resolve => {
        this.http.post(`${API}/contacto`, data)
          .subscribe(
            (response: any) => resolve(response),
            error => resolve(error)
          );
      });
    }
}
