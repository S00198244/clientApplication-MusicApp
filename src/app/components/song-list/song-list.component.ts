import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/song';
import { SongService } from 'src/app/song.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  songList: Song[] = [];
  message: string = "";
  
  currentSong! : Song;


  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.songService.getSongs().subscribe({
      next: (value: Song[] )=> this.songList = value,
      complete: () => console.log(this.songList),
      error: (mess) => this.message = mess
    })
  }

  clicked (song: Song): void {
    this.currentSong = song;
  }

}
