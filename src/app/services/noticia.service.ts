import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

const API = environment.api;


@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  listar(query?) {
    return new Promise(resolve => {

      const parametros = new HttpParams({ fromObject: query })

      this.http.get(`${API}/noticias`, { params: parametros })
        .subscribe(
          (response: any) => resolve(response),
          error => resolve(error)
        );
    });
  }


  //get id noticia
  obtenerId(data) {
    return new Promise(resolve => {
      this.http.get(`${API}/noticias/id`, data)
        .subscribe(
          (response: any) => resolve(response),
          error => resolve(error)
        );
    });
  }

  // enviar noticia
  noticias(data) {

    const formData = new FormData();
    for (let key in data) {
      if (key == 'imagenes') {
        for (let i = 0; i < data[key].length; i++) {
          formData.append('imagenes[]', data[key][i], 'noticias');
        }
      } else formData.append(key, data[key]);
    }

    return new Promise(resolve => {
      this.http.post(`${API}/noticias`, formData)
        .subscribe(
          (response: any) => resolve(response),
          error => resolve(error)
        );
    });
  }

}
