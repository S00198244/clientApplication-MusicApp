import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private defaultUrl : string = environment.apiUrl;
  private apiURI: string = environment.apiUrl + "/songs";
  private uri: string = environment.apiUrl + '/users';

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
  
    return this.http.post<User>(this.uri, user).
      pipe(
        catchError(this.handleError)
      );
  }

// GET A USER

  getUsers(): Observable<User[]> {

    console.log("get Users called");

    return this.http.get<User[]>(`${this.uri}`)
      .pipe(
        catchError(this.handleError)
      )
  }

//LOG USER IN

  //TAKING IN FORMGROUP AS A PARAMETER AS OPPOSED TO EMAIL + PASSWORD

  public login(user: User): Observable<any> {

    return this.http.post<any>(`${this.defaultUrl}/auth`, user, {withCredentials:true}).
    pipe(map(user => {
      

    // later we will start a timer based on the JWT expiry and
    // use a refresh token to get a new JWT in the background.

    const payload = JSON.parse(atob(user.accessToken.split('.')[1]));
    const expires = new Date(payload.exp * 1000);

    localStorage.setItem('currentUser', JSON.stringify(user))
    this.userSubject.next(user);

    //this.startAuthenticateTimer(expires);

    return user;}
    ))
  }

  startAuthenticateTimer(expires: Date) {
    throw new Error('Method not implemented.');
  }

  //LOG OUT A USER

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');

    this.userSubject.next(null);
}

//

private getNewAccessToken(): Observable<any> {

  // note the withCredentials below means that cookies will be sent to the server

  return this.http.post<any>(`${this.apiURI}/auth/refresh`, {userid : this.userValue?._id},
    { withCredentials: true }).
    pipe(map(user => {
      console.log('here')

      // get the expiry time from the JWT
      const payload = JSON.parse(atob(user.accessToken.split('.')[1]));
      const expires = new Date(payload.exp * 1000);

      localStorage.setItem('currentUser', JSON.stringify(user))
      this.userSubject.next(user);

      this.startAuthenticateTimer(expires);
      return user;
    }),
      catchError(this.handleError))
}


  //____________________________________________________________________________________________________ ERROR HANDLING

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
