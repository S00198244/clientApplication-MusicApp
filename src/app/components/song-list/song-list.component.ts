import { Component, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/data.service';
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
  showSongForm: boolean = false;
  
  currentSong? : Song;

  constructor(private songService: SongService, private dataService: DataService) {

   }

  ngOnInit(): void {

    this.getSongs();

    this.dataService.songSelected.subscribe(song => this.currentSong = song)
  }

  getSongs() {
    this.songService.getSongs().subscribe({
      next: (value: Song[] )=> this.songList = value,
      complete: () => console.log(this.songList),
      error: (mess) => this.message = mess
    })
  }

  clicked (song: Song): void {
    this.currentSong = song;
    console.table(this.currentSong)

    this.dataService.changeSong(this.currentSong);
  }

  isSelected(song: Song): boolean {
    if (!song || !this.currentSong) {
      return false;
    }
    else {
      return song._id === this.currentSong._id;
    }
  }

  openAddSong(): void {
    this.currentSong = undefined;
    this.showSongForm = true;
  }

  openEditSong(): void {
    this.showSongForm = true;
  }

  addNewSong(newSong : Song): void {
    console.log('adding new song ' + JSON.stringify(newSong));
    this.songService.addSong({ ...newSong })
      .subscribe({
        next: song => {
          console.log(JSON.stringify(song) + ' has been added');
          this.message = "new song has been added";
        },
        error: (err) => this.message = err
      });

    // so the updated list appears

  this.songService.getSongs().subscribe({
    next: (value: Song[]) => this.songList = value,
    complete: () => console.log('song service finished'),
    error: (mess) => this.message = mess
  })
}

  updateSong(song: Song): void {
    console.log('updating ' + JSON.stringify(song.title));

    this.songService.updateSong(song)
      .subscribe({
        next: song => {
          console.log(JSON.stringify(song) + ' has been updated');
          this.message = " song has been updated";
        },
        error: (err) => this.message = err
      });

          // so the updated list appears

          this.songService.getSongs().subscribe({
            next: (value: Song[]) => this.songList = value,
            complete: () => console.log('song service finished'),
            error: (mess) => this.message = mess
          })

    }

    // note: Bad UX there is no check that the user wants to delete the book and hasn't just 
// hit the button by mistake

  deleteSong() {

    console.log('deleting a song');

    if (this.currentSong) {
      this.songService.deleteSong(this.currentSong._id)
        .subscribe({
          next: song => {
            console.log(JSON.stringify(song) + ' has been added');
            this.message = "book has been deleted";
          },
          error: (err) => this.message = err
        });
    }
    // so the updated list appears
    this.songService.getSongs().subscribe({
      next: (value: Song[]) => this.songList = value,
      complete: () => console.log('book service finished'),
      error: (mess) => this.message = mess
    })
  }


    
  /* either the form has closed without saving or new book details have been
  entered or a book has been updated */

  songFormClose(song? : Song): void {
    this.showSongForm = false;
    console.table(song);
    if (song == null) {
      this.message = "form closed without saving";
      this.currentSong = undefined
    }
    else if (this.currentSong == null) {
      this.addNewSong(song);
    }

    else {
      this.updateSong(song)
    }
  }

  dismissAlert() {
    this.message = "";
  }

}
