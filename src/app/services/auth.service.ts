import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../schemas/user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  returnUrl: string = '/';
  user: User = {}
  constructor(private router: Router,
    private storageService: StorageService) { }

  setUrl(url: string = '') {
    this.returnUrl = url;
  }

  getUser(): User {
    return this.user;
  }

  setUser(user: User): void {
    this.user = user;
  }

  logout() {
    this.storageService.clear();
    this.router.navigate(['/login']);
    this.returnUrl = '';
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('currentUser') !== null);
  }
}
