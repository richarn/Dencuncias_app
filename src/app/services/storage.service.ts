import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: NativeStorage) { }
  

  // get a token/value object
  async get(key: string): Promise<any> {
    try {
      const result = await this.storage.getItem(key);
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
      const result = await this.storage.setItem(key, value);
      console.log('set string in storage: ' + result);
      return true;
    } catch (reason) {
      console.log(reason);
      return false;
    }
  }
}
