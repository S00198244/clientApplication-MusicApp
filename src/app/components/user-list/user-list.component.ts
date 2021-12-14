import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList: User[] = [];
  message: string = "Error retrieving users";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (value: User[])=> this.userList = value,
      complete: () => console.log(this.userList),
      error: (mess) => this.message = mess
    })
    
  }

}
