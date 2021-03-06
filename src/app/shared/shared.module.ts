import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';

// import { AppRoutingModule } from './app-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterModule,
        PipesModule
    ],
    declarations: [
        TopbarComponent,
        SidebarComponent
    ],
    exports: [
        TopbarComponent,
        SidebarComponent
    ]
})
export class SharedModule { }
