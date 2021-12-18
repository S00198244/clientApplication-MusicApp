import { Component, Input, OnInit, Output } from '@angular/core';
import { Song } from 'src/app/song';
import { EventEmitter } from '@angular/core';
import { SongService } from 'src/app/song.service';

@Component({
  selector: 'app-song-row',
  templateUrl: './song-row.component.html',
  styleUrls: ['./song-row.component.css']
})
export class SongRowComponent implements OnInit {
  @Input() song!: Song;

  @Output("getSongs") getSongs: EventEmitter<any> = new EventEmitter();
  message!: string;
  data!: Song;

  constructor(private songService: SongService) { }

  ngOnInit(): void {

  }

  delete() {
    this.songService.deleteSong(this.song._id)
        .subscribe({
          next: song => {
            console.log(JSON.stringify(song) + ' has been deleted');
            this.message = "book has been deleted";
          },
          error: (err) => this.message = err
        });

        this.getSongs.emit();
    
  }

  favourite() {

    console.log('updating ' + JSON.stringify(this.song.title));

    //this.data = this.song; //{'_id': this.song._id, 'favourited': true}

    this.song.favourited = true;

    //console.log(this.data);

    this.songService.updateSong(this.song)
    .subscribe({
      next: song => {
        console.log(JSON.stringify(song) + ' has been updated');
        this.message = " song has been updated";
      },
      error: (err) => this.message = err
    });

    //this.getSongs.emit();

  }
}
