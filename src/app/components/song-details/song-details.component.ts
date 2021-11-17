import { Component, Input, OnInit } from '@angular/core';
import { Song } from 'src/app/song';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.css']
})
export class SongDetailsComponent implements OnInit {
  @Input() song!: Song;

  constructor() { }

  ngOnInit(): void {
  }

}
