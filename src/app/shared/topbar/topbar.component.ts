import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UsuarioService } from 'src/app/services/services.index';
import { UserInterface } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  title = 'TINE';
  user: UserInterface;

  constructor(
    private authService: AuthenticationService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.authService.getStatus()
    .subscribe( (user) => {
      this.usuarioService.getUserById(user.uid)
      .subscribe( (usuario: UserInterface) => this.user = usuario);
    });
  }

}
