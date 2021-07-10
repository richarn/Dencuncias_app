import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private http: HttpClient
  ) { }

  getMenuItems() {
    return this.http.get<any>('/assets/routes.json');
  }

  parseData(data) {
    try {
      data = JSON.parse(data);
    } catch (e) {
      console.error('JSON parsing error');
    }
    return data;
  }
}
