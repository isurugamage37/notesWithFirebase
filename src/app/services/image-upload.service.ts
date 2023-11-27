import { Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { finalize, from, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  constructor(private storage: Storage) {}

  uploadImage(image: File, path: string): Observable<string> {
    console.log("111111111111p")
    const storageRef = ref(this.storage, path);
    console.log("22222222222p")

    const uploadTask = from(uploadBytes(storageRef, image));
    console.log("33333333333333p")

    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
    
    
  }
}
