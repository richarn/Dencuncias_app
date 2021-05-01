import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

const API = environment.api;


@Injectable({
  providedIn: 'root'
})
export class DenunciaService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  // enviar denuncia
  denuncias(data) {

    const formData = new FormData();
    for (let key in data) {
      if (key == 'imagenes') {
        for (let i = 0; i < data[key].length; i++) {
          formData.append('imagenes[]', data[key][i], 'denuncia');
        }
      } else formData.append(key, data[key]);
    }

    return new Promise(resolve => {
      this.http.post(`${API}/denuncias`, formData)
        .subscribe(
          (response: any) => resolve(response),
          error => resolve(error)
        );
    });
  }

  GetDenuncia(query?) {
    return new Promise(resolve => {

      const parametros = new HttpParams({ fromObject: query })

      this.http.get(`${API}/denuncias`, { params: parametros})
        .subscribe(
          (response: any) => resolve(response),
          error => resolve(error)
        );
    });
  }

    //get id noticia
    obtenerId(data) {
      return new Promise(resolve => {
        console.log('data: ->', data);
        
        this.http.get(`${API}/denuncias/${data}`, data)
          .subscribe(
            (response: any) => resolve(response),
            error => resolve(error)
          );
      });
    }
}
