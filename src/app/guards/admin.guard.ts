import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UsuarioService } from '../services/services.index';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public usuarioService: UsuarioService,
    public router: Router
  ) { }

  canActivate(): boolean {
    if ( this.usuarioService.usuario.role === 'ROLE_ADMIN' ) {
      return true;
    } else {
      console.error('Acceso denegado! Ud. no es Admin');
      this.router.navigate(['/']);
      return false;
    }
  }

}
