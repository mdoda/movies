import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  movie: Movie;
  id: string;

  constructor(private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) =>{
        this.id = params.id;

        this.movieService.getMovie(this.id)
        .subscribe(
          response => {
            this.movie = response.movie;
          }
        );
      }
    );
  }

  onDelete(){
    this.movieService.deleteMovie(this.movie);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
