import { Component, Input, OnInit, ViewChild  } from '@angular/core';
import { Song } from './song';
import { SongDetailsComponent } from './components/song-details/song-details.component';
import { SongRowComponent } from './components/song-row/song-row.component';
import { DataService } from './data.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'clientApplication-MusicApp';

  constructor(private data: DataService, private userService: UserService, private router: Router) { }

  currentSong? : Song;

  public loggedIn = localStorage.getItem('currentUser');

  ngOnInit() {
    this.data.songSelected.subscribe(currentSong => this.currentSong = currentSong)
  }

  logout() {
    this.userService.logout();

    window.location.reload();

    this.router.navigate(['/login']);
  }
}
