import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { MovieItemComponent } from './movies/movie-item/movie-item.component';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { AppRoutingModule } from './app-routing.module';
//import { DndModule} from 'ng2-dnd';
import {HttpClientModule} from '@angular/common/http';
import { MovieEditComponent } from './movies/movie-edit/movie-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieDetailComponent,
    MovieItemComponent,
    MoviesListComponent,
    MovieEditComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
