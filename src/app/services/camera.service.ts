import { Injectable } from '@angular/core';

import { File, FileEntry } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(
    private file: File,
    private camera: Camera
  ) { }

  abrirCamara() {
    return new Promise(async (resolve) => {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        sourceType: this.camera.PictureSourceType.CAMERA
      };
  
      const imageData = await this.camera.getPicture(options);
      return resolve(imageData);
    });
  }

  abrirGaleria() {
    return new Promise(async (resolve) => {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      };
  
      const imageData = await this.camera.getPicture(options);
      return resolve(imageData);
    });
  }

}
