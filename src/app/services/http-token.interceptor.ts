import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes(environment.API_URL)) {
      return next.handle(request);
    }
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.storageService.getToken()}`
    };

    const req = request.clone({ setHeaders: headersConfig });
    return next.handle(req);
  }
}
