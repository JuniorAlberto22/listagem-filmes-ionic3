import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {

  public BASE_URL = 'https://api.themoviedb.org/3/';
  public API_KEY = 'api_key=78b0c5a2c5aa0630948970183b9076ca';
  constructor(public http: Http) {
    console.log('Hello MovieProvider Provider');
  }

  getLetestMovies(page = 1): Observable<any>{
    return this.http.get(this.BASE_URL + `movie/popular?page=${page}&&` + this.API_KEY);
  }

  getDetailsMovie(id: any): Observable<any>{
    return this.http.get(this.BASE_URL + `movie/${id}?` + this.API_KEY);
  }
}
