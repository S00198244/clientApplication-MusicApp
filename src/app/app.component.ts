import { Component, Input, OnInit, ViewChild  } from '@angular/core';
import { Song } from './song';
import { SongDetailsComponent } from './components/song-details/song-details.component';
import { SongRowComponent } from './components/song-row/song-row.component';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'clientApplication-MusicApp';

  constructor(private data: DataService) { }

  currentSong? : Song;

  ngOnInit() {
    this.data.songSelected.subscribe(currentSong => this.currentSong = currentSong)
  }
}
