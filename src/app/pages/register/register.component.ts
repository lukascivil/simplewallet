import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/providers/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class registerComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: this.formBuilder.control("", [Validators.required, Validators.minLength(8)]),
      email: this.formBuilder.control("", [Validators.required, Validators.email]),
      password: this.formBuilder.control("", [Validators.required, Validators.minLength(8)]),
    })
  }

  // Check if the inputs are valid
  isValidInput(name): string {
    if (this.registerForm.get(name).invalid && this.registerForm.get(name).dirty)
      return "invalid";
  }

  onFormSubmit(): void {
    let username = this.registerForm.get('username').value;
    let email = this.registerForm.get('password').value;
    let password = this.registerForm.get('password').value;

    // Prevent auth
    if (this.registerForm.invalid)
      return

    // Authenticate user
    this.userService.register(username, email, password)
      .then(result => {
        console.log(result)
        if (result)
          this.router.navigate(["/"]);
      })
      .catch(result => {
      })
  }

}
