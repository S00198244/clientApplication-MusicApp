import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { SongRowComponent } from './components/song-row/song-row.component';
import { SongDetailsComponent } from './components/song-details/song-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SongListComponent,
    SongRowComponent,
    SongDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
