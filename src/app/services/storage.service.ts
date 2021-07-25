import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }
  

  // get a token/value object
  async get(key: string): Promise<any> {
    try {
      const result = await this.storage.get(key);
      if (result != null) {
        return typeof result == 'string' ? result : JSON.parse(result);
      }
      return null;
    } catch (reason) {
      console.log(reason);
      return null;
    }
  }


  // // set a token/value
  async set(key: string, value: any): Promise<any> {
    try {
      const result = await this.storage.set(key, value);
      return true;
    } catch (reason) {
      console.log(reason);
      return false;
    }
  }

  async clear() {
    await this.storage.clear();
  }
}
