import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Subscription } from 'rxjs';
import { Movie } from '../movie.model';


@Component({
  selector: 'movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  subscription: Subscription;
  movies: Movie [] =[];

  constructor(private movieService: MovieService) { }

  ngOnInit() {

    this.subscription = this.movieService.movieChangedEvent.subscribe(
      (movies: Movie[]) =>{
        this.movies = movies;
      }
    );

    this. movieService.getMovies();
  }

}
