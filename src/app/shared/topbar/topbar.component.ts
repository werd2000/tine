import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService, UsuarioService } from 'src/app/services/services.index';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit, OnDestroy {
  title = 'TINE';
  user: UserInterface;
  suscriptor: Subscription[] = [];

  constructor(
    private authService: AuthenticationService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.suscriptor.push(
      this.authService.getStatus()
      .subscribe( (user) => {
        if (user) {
          this.suscriptor.push(
            this.usuarioService.getUserById(user.uid)
            .subscribe( (usuario: UserInterface) => this.user = usuario)
          );
        }
      })
    );
  }

  ngOnDestroy() {
    this.suscriptor.forEach(element => {
      element.unsubscribe();
    });
  }

}
