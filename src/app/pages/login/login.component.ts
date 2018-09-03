import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as M from 'materialize-css';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: this.formBuilder.control("", [Validators.required, Validators.minLength(8)]),
      password: this.formBuilder.control("", [Validators.required, Validators.minLength(8)]),
    })
  }

  // Check if the input is valid
  isValidInput(name): string {
    if (this.loginForm.get(name).invalid && this.loginForm.get(name).dirty)
      return "invalid";
  }

  ngAfterContentInit() {
    // Auto Init all Materialize Components
    M.AutoInit();
  }

}