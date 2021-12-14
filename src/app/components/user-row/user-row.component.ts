import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.css']
})
export class UserRowComponent implements OnInit {
  @Input() user!: User;

  constructor() { }

  ngOnInit(): void {
  }

}
