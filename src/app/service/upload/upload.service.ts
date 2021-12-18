import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private storage: AngularFireStorage) {}

  getFileType(fileName: string) {
    if (fileName) {
      return fileName.split('.').pop();
    } else {
      return '';
    }
  }

  getUniqueSafeName(file: File) {
    let safeName = file.name.replace(/([^a-z0-9.]+)/gi, ''); // file name stripped of spaces and special chars
    let timestamp = Date.now(); // ex: '1598066351161'
    const uniqueSafeName = timestamp + '_' + safeName;
    const path = 'uploads/' + uniqueSafeName; // Firebase storage path
    const ref = this.storage.ref(path); // reference to storage bucket
    return { uniqueSafeName, path, ref };
  }

  uploadFile(path: string, file: File) {
    const task = this.storage.upload(path, file);

    return task;
  }

  deleteFile(downloadUrl: any) {
    return this.storage.storage.refFromURL(downloadUrl).delete();
  }
}
