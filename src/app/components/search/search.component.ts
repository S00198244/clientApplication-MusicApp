import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupName, FormsModule } from '@angular/forms';
import { Song } from 'src/app/song';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() song?: Song;
  @Output() songFormClose = new EventEmitter<Song>();
  message: string = "";
  songForm! : FormGroup;

  constructor() { }

  ngOnInit(): void {
    
    this.songForm = new FormGroup({
      title: new FormControl(this.song?.title, [Validators.required, Validators.minLength(3)]),
      artists: new FormControl(this.song?.artists, [Validators.required, Validators.minLength(3)]),
      favourited: new FormControl(this.song?.favourited, [Validators.required])
    })
  }

  onSubmit() {
    console.log('forms submitted with ');
    console.table(this.songForm?.value);
    
    this.songFormClose.emit(this.songForm?.value);
  }

  get title() {
    return this.songForm?.get('title');
  }
  get artists() {
    return this.songForm?.get('artists');
  }

  get favourited() {
    return this.songForm?.get('favourited');
  }

  closeForm() {
    this.songFormClose.emit(undefined)
  }
}
