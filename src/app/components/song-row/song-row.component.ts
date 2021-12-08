import { Component, Input, OnInit } from '@angular/core';
import { Song } from 'src/app/song';

@Component({
  selector: 'app-song-row',
  templateUrl: './song-row.component.html',
  styleUrls: ['./song-row.component.css']
})
export class SongRowComponent implements OnInit {
  @Input() song!: Song;

  constructor() { }

  ngOnInit(): void {

  }
}
