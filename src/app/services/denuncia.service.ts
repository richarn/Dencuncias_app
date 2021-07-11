import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

const API = environment.api;


@Injectable({
  providedIn: 'root'
})
export class DenunciaService {

  page = 0;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  // enviar denuncia
  registrar(data) {

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

  GetDenuncia(query?, pull: boolean = false) {
    return new Promise(resolve => {
      if (pull) { this.page = 0; }
      this.page++;
      query['page'] = this.page;

      const parametros = new HttpParams({ fromObject: query })

      this.http.get(`${API}/denuncias`, { params: parametros})
        .subscribe(
          (response: any) => resolve(response),
          error => resolve(error)
        );
    });
  }

    //get id denuncia
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

    actualizar(data) {
      const formData = new FormData();
      for (let key in data) {
        if (key == 'imagenes') {
          for (let i = 0; i < data[key].length; i++) {
            formData.append('imagenes[]', data[key][i], 'denuncia');
          }
        } else formData.append(key, data[key]);
      }

      formData.append('_method', 'PUT');
      return new Promise(resolve => {
        this.http.post(`${API}/denuncias/${data.id}`, formData)
        .subscribe(
          (response: any) => resolve(response),
          error => resolve(error)
        );
      });
    }

  // uploadImage(idDenuncia, blob: Blob) {
  //   return new Promise(resolve => {
  //     const url = `denuncias/${idDenuncia}/uploadImage`;

  //     const formData = new FormData();
  //     formData.append('_method', 'PUT');
  //     formData.append('imagen', blob, 'denuncia');

  //     this.http.post(`${API}/${url}`, formData)
  //     .subscribe(
  //       response => resolve(response),
  //       error => resolve(error)
  //     );
  //   });
  // }

  eliminar(idDenuncia) {
    return new Promise(resolve => {
      this.http.delete(`${API}/denuncias/${idDenuncia}`)
      .subscribe(
        (response: any) => resolve(response),
        error => resolve(error)
      );
    });
  }

  eliminarImagen(idDenuncia, idImagen) {
    return new Promise(resolve => {
      this.http.delete(`${API}/denuncias/${idDenuncia}/imagen/${idImagen}`, { observe: 'response' })
      .subscribe(
        (response: any) => resolve(response),
        error => resolve(error)
      );
    });
  }
}
