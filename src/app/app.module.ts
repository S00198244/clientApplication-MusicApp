import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { SongRowComponent } from './components/song-row/song-row.component';
import { SongDetailsComponent } from './components/song-details/song-details.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HomeComponent } from './components/home/home.component';

import { JwtinterceptorService } from './services/jwtinterceptor.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { UserRowComponent } from './components/user-row/user-row.component';

@NgModule({
  declarations: [
    AppComponent,
    SongListComponent,
    SongRowComponent,
    SongDetailsComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    HomeComponent,
    UserRowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtinterceptorService, multi: true,
      
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
