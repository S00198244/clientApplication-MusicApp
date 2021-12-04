import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    private userService: UserService
) { }

  ngOnInit()  {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('')
    })
  //   this.signinForm = this.fb.group({
  //     email: [null, [Validators.required, Validators.email]],
  //     password: [null, Validators.required]
  // });
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
              data => {
                  console.log(data);
                  this.message = `Login successful for ${data.firstName} need to implement redirect`
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

