import { Injectable } from '@angular/core';
import { Song } from './song';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private dataUri = 'http://localhost:3000/songs'

  constructor(private http: HttpClient) { }

  //ADD
  addSong(song: Song): Observable<Song> {
    return this.http.post<Song>(this.dataUri, song)
      .pipe(
        catchError(this.handleError)
      )
  }

  //UPDATE
  updateSong(song: Song): Observable<Song> {

    console.log('subscribing to update ' + song._id);

    let songURI: string = `${this.dataUri}/${song._id}`;
    
    return this.http.put<Song>(songURI, song)
      .pipe(
        catchError(this.handleError)
      )
  }

  //GET 
  getSongs(): Observable<Song[]>{
    console.log('getSongs called');

    return this.http.get<Song[]>(`${this.dataUri}?limit=5`)
    .pipe(
      catchError(this.handleError)
    )
  }

    /** DELETE: delete the song from the server */
deleteSong(id: string): Observable<unknown> {
  const url = `${this.dataUri}/${id}`; // DELETE 
  return this.http.delete(url)
    .pipe(
      catchError(this.handleError)
    );
}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
