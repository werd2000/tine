import { PagesComponent } from './pages/pages.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const APPROUTES: Routes = [
    { path: '',
        component: PagesComponent,
    },
    { path: 'login', component: LoginComponent },
];

export const APP_ROUTES = RouterModule.forRoot(APPROUTES, {useHash: true});
