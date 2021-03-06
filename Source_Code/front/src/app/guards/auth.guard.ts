import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private userService: UserService,
               private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.userService.tokenValidate()
      .pipe(
        tap( itsAuth =>  {
          if ( !itsAuth ) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }

}
