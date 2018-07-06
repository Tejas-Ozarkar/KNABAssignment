import { SubjectService } from './subject.service';
import { UserService } from './user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent, GoogleSigninComponent, } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    GoogleSigninComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    UserService,
    SubjectService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
