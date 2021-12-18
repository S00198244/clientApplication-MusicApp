import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm!: FormGroup; // = new FormGroup({});
  message: String = "";
  
  constructor(    
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
) { }

  ngOnInit()  {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }
  
  // get form() 
  //   { 
  //       return this.signinForm.controls; 
  //   }

    // get email() 
    // { 
    //     return this.signinForm.get("email"); 
    // }

    // get password() 
    // { 
    //     return this.signinForm.get("password"); 
    // }

    onSubmit() {

      this.userService.login(this.signinForm?.value) // this.signinForm?.value
          .subscribe(
              (response) => {
                  console.log(response);
                  // this.message = `Login successful for ${response.firstName} need to implement redirect`;
                  //window.location.reload();
                  this.router.navigate(['/songs']);
                  //window.location.reload();
              },        
              error => {
                  console.log(error);
                  this.message = "Unable to log in please try again"
              });
  }

  dismissAlert() {
      this.message = "";
  }
}

