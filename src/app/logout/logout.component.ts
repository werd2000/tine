import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/services.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // logoOut() {
      this.authenticationService.logOut();
      // .then( (data) => {
      //   console.log(data);
        // this.router.navigate(['/login']);
      // })
      // .catch( (error) => {
      //   console.log(error);
      // });
    // }
  }

}
