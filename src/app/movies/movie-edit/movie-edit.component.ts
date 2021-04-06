import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { error } from 'protractor';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  originalMovie: Movie;
  movie: Movie;
  editMode = false;
  id: string;

  constructor(private movieService: MovieService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params.id;

        if(!this.id){
          this.editMode = false;
          return;
        }

        this.movieService.getMovie(this.id)
        .subscribe(
          response => {
            this.originalMovie = response.movie;
            if(!this.originalMovie){
              return;
            }
            this.editMode = true;
            this.movie =JSON.parse(JSON.stringify(this.originalMovie));
          }
        );
      }
    );
  }

  onSubmit(form: NgForm){

  const value = form.value;

  let newMovie = new Movie('', this.movie?.id, value.title, value.year , value.rating, value.minutes , value.genre , value.imageUrl);

  if(this.editMode){
    this.movieService.updateMovie(this.originalMovie, newMovie);
  }else{
    this.movieService.addMovie(newMovie);
  }
  this.router.navigate(['./movies']);
  }

  onCancel(){
    this.router.navigate(['./movies']);
  }
}
