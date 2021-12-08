import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Song } from './song';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentSong!: Song;

  private songSource = new BehaviorSubject<Song>(this.currentSong);
  
  songSelected = this.songSource.asObservable();

  constructor() { }

  changeSong(song: Song) {
    this.songSource.next(song)
  }

}
