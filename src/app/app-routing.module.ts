import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent  },
  { path: 'logout', component: LogoutComponent  },
  {
    path: '',
    component: PagesComponent,
    // canActivate: [ LoginGuard ],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
