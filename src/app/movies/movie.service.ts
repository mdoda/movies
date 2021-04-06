import { Injectable } from '@angular/core';
import { Movie } from './movie.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
 movieChangedEvent = new Subject<Movie[]>();

 movies: Movie[] = [];

 constructor(private http: HttpClient,
            private router: Router) { }



sortAndSend(){
   this.movieChangedEvent.next(this.movies.slice());
}

/*******************************************************
 *
 * GET MOVIE
 *
 *******************************************************/
getMovie(id: string){
  return this.http.get<{message: string, movie: Movie}>('http://localhost:3000/movies/' + id)
}

/*******************************************************
 *
 * GET MOVIES
 *
 *******************************************************/
getMovies(){
  this.http.get<{message: string, movies: Movie[]}>('http://localhost:3000/movies')
  .subscribe(
    //success function
    (responseData) => {
      this.movies = responseData.movies;
      this.sortAndSend();
    },
    //error function
    (error: any) =>{
      console.log(error);
    }
  )
}

/*******************************************************
 *
 * ADD MOVIE
 *
 *******************************************************/
addMovie(movie: Movie){
  if(!movie){
    return;
  }

  movie.id = '';

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  //add to database
  this.http.post<{message: string, movie: Movie}>('http://localhost:3000/movies',
  movie,
  {headers: headers})
  .subscribe(
    (responseData) =>{
      //add new movie to movies
      this.movies.push(responseData.movie)
      this.sortAndSend();
    }
  );
}

/*******************************************************
 *
 * UPDATE MOVIE
 *
 *******************************************************/
updateMovie(originalMovie: Movie, newMovie: Movie){
  if(!originalMovie || !newMovie){
    return;
 }

 const pos = this.movies.findIndex(m => m.id === originalMovie.id);

 if(pos < 0){
   return;
 }

 newMovie.id = originalMovie.id;


 const headers = new HttpHeaders({'Content-Type': 'application/json'});

 return this.http.put<{message: string, movie: Movie}>('http://localhost:3000/movies/' + originalMovie.id,
 newMovie,
 {headers: headers}
 ).subscribe(
   (response) => {
     this.movies[pos] = response.movie;
     this.sortAndSend();
   }
 );
}


/*******************************************************
 *
 * DELETE MOVIE
 *
 *******************************************************/
deleteMovie(movie: Movie){
  if(!movie){
    return;
  }

  const pos = this.movies.findIndex(m => m.id === movie.id);

  if(pos < 0){
    return;
  }
  //delete from database
  this.http.delete('http://localhost:3000/movies/' + movie.id)
  .subscribe(
    (response: Response) => {
      this.movies.splice(pos, 1);
      this.sortAndSend();
    }
  );
}

}
