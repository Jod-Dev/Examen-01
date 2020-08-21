import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterForm} from '../interfaces/registerform.interface';
import {environment} from '../../environments/environment';
import {LoginForm} from '../interfaces/loginform.interface';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {User} from '../models/user.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;

  constructor( private http: HttpClient,
               private  router: Router) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }
  get uid(): string{
    return this.user.unique_id || '';
  }
  tokenValidate(): Observable<boolean> {


    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      tap( (resp: any) => {
        console.log(resp);
        const {apellido, email, google, nombre, role, tel, unique_id } = resp.user;
        this.user = new User( nombre, apellido, tel, email, '', google, role, unique_id );
        localStorage.setItem('token', resp.token );
      }),
      map( resp => true),
      catchError( error => of(false) )
    );

  }

  createUser( formData: RegisterForm){
      return this.http.post(`${base_url}/users`, formData)
        .pipe(
          tap ( (resp: any) => {
            localStorage.setItem('token', resp.token)
          })
        );
  }

  login( formData: LoginForm){
    return this.http.post(`${base_url}/login`, formData)
                      .pipe(
                          tap ( (resp: any) => {
                              localStorage.setItem('token', resp.token)
                          })
                      );
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
