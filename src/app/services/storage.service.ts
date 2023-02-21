import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  STORAGE_KEY = 'jwtToken';

  public clear() {
    localStorage.clear();
  }

  getToken(): string {
    return localStorage[this.STORAGE_KEY];
  }

  saveToken(token: string) {
    localStorage[this.STORAGE_KEY] = token;
  }

  destroyToken() {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  getValue(key: string): string {
    return localStorage[key];
  }

  saveValue(key: string, value: any) {
    localStorage[key] = value;
  }

  destroyValue(key: string) {
    localStorage.removeItem(key);
  }

}