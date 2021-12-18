import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public user?: User|null;
  
  constructor(private userService: UserService) {
    this.userService.user.subscribe(user => this.user = user);
   }

  ngOnInit(): void {
  }

}
