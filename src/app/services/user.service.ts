import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURI: string = 'http://localhost:3000';
  private userSubject: BehaviorSubject<User|null>;
  public user: Observable<User|null>;

  constructor(private http: HttpClient) { 

    this.userSubject = new BehaviorSubject<User|null>
    (JSON.parse(localStorage.getItem('currentUser') || '{}')) ;
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User|null {
    return this.userSubject.value;
  }

  // POST A USER

  createUser(user: User): Observable<User> {

    const uri: string = this.apiURI + '/users';

    return this.http.post<User>(uri, user).
      pipe(
        catchError(this.handleError)
      );
  }

// GET A USER

  getUsers(): Observable<User[]> {

    console.log("get Users called");

    return this.http.get<User[]>(`${this.apiURI}/users`)
      .pipe(
        catchError(this.handleError)
      )
  }

//LOG USER IN

  //TAKING IN FORMGROUP AS A PARAMETER AS OPPOSED TO EMAIL + PASSWORD

  public login(user: User): Observable<any> {

    return this.http.post<any>(`${this.apiURI}/auth`, user).
    pipe(map(user => {
     localStorage.setItem('currentUser', JSON.stringify(user))
     this.userSubject.next(user);
    // later we will start a timer based on the JWT expiry and
    // use a refresh token to get a new JWT in the background.
    //this.startAuthenticateTimer();
    return user;}
    ))
  }

  //LOG OUT A USER

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
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
