import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private apiService: ApiService,
    private authService: AuthService,) {

  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    try {
      const resp: any = await firstValueFrom(this.apiService.request({ path: 'user/me' }));
      this.authService.setUser(resp.body);
      if (!this.authService.getUser()?.name && !state.url.includes('/profile')) {
        this.router.navigate(['/profile']);
      }
      return true;
    } catch (error) {
      console.error(error);
      this.authService.logout();
      this.authService.setUrl(state.url);
      return false
    }
  }

}
