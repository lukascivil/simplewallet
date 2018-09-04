import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/providers/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: this.formBuilder.control("", [Validators.required, Validators.minLength(8)]),
      password: this.formBuilder.control("", [Validators.required, Validators.minLength(8)]),
    })
  }

  // Check if the inputs are valid
  isValidInput(name): string {
    if (this.loginForm.get(name).invalid && this.loginForm.get(name).dirty)
      return "invalid";
  }

  onFormSubmit(): void {
    let username = this.loginForm.get('username').value;
    let password = this.loginForm.get('password').value;

    // Prevent auth
    if (this.loginForm.invalid)
      return

    // Authenticate user
    this.authenticationService.login(username, password)
      .then(result => {
        console.log(result)
        if (result)
          this.router.navigate(["/"]);
      })
      .catch(result => {
      })
  }

}
