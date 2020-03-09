import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UsuarioService } from '../services/services.index';
import {NgForm} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = null;
  password: string = null;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authenticationService.loginWhithEmail(this.email, this.password)
    .then( (data) => {
      console.log(data);
      this.router.navigate(['/dashboard']);
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  loginGoogle() {
    this.authenticationService.loginWhithGoogle()
    .then( (data) => {
      console.log(data);
      this.router.navigate(['/']);
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  register() {
    this.authenticationService.registerWithEmail(this.email, this.password)
    .then( (data) => {
      const user = {
        uid: data.user.uid,
        email: this.email
      };
      this.userService.createUser(user)
      .then( (data2) => {
        console.log(data2);
      })
      .catch( (error2) => {
        console.log(error2);
      });
      console.log(data);
    })
    .catch( (error) => {
      console.log(error);
    });
  }

}
