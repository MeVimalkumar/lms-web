import { HttpClient, HttpHeaders, HttpParameterCodec, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


import { catchError } from 'rxjs/operators';
import { HttpMethods } from '../enums/http-methods';
import { ApiRequest } from '../schemas/api-request';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  DEFAULT_API_HOST = 'baseURL';
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private errorHandler = (error: any) => {
    if (!navigator.onLine) {
      return throwError(() => 'Network Error');
    } else {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else if (typeof error?.error?.error === 'string') {
        errorMessage = error.error.error;
      } else if (typeof error?.error?.message === 'string') {
        errorMessage = error.error.message;
      } else if (typeof error?.error === 'string') {
        errorMessage = error.message;
      } else if (typeof error?.error === 'string') {
        errorMessage = error.error;
      } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      if (error.status === 401) {
        errorMessage = 'Session timeout, please login again!'
        this.authService.logout();
      }
      return throwError(() => errorMessage);
    }
  }

  request({ path, method = HttpMethods.GET, qparams, body, httpOptions }: ApiRequest): Observable<any> {
    if (!httpOptions) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        observe: 'response',
      };
    }

    if (qparams) {
      let params = new HttpParams({ encoder: new CustomHttpParamEncoder() });
      Object.keys(qparams).forEach((key: string) => {
        params = params.append(key, qparams[key]);
      });
      httpOptions.params = params;
    }

    switch (method) {
      case HttpMethods.POST:
        return this.http.post(`${environment.API_URL}${path}`, body, httpOptions)
          .pipe(catchError(this.errorHandler));
      case HttpMethods.PUT:
        return this.http.put(`${environment.API_URL}${path}`, body, httpOptions)
          .pipe(catchError(this.errorHandler));
      case HttpMethods.DELETE:
        return this.http.delete(`${environment.API_URL}${path}`, { ...httpOptions, body })
          .pipe(catchError(this.errorHandler));
      case HttpMethods.GET:
      default:
        return this.http.get(`${environment.API_URL}${path}`, httpOptions)
          .pipe(catchError(this.errorHandler));
    }
  }

}

class CustomHttpParamEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }
  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }
  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }
  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}