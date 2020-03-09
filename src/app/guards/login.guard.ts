import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './../services/services.index';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  status: object;

  constructor(
    private authService: AuthenticationService,
    public router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.getStatus().pipe(
      map(user => user !== null)
    );
    // if ( this.getStatus() !== null ) {
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
  }

  getStatus() {
    this.authService.getStatus()
    .subscribe( r => r);
  }

}
