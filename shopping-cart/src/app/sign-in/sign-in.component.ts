import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(private router: Router, private formBuilder: FormBuilder) { }
  isRegisterMode: boolean = false;
  loginForm: any;
  registerValidation: string | null = null;
  loginValidation: string | null = null;
  userPresent: boolean = localStorage.getItem('currentUser') ? true : false;
  reqFromAccIcon: boolean = localStorage.getItem('accountIcon') === 'true' ? true : false;
  ngOnInit() {
    this.userPresent = localStorage.getItem('currentUser') ? true : false;
    this.reqFromAccIcon = localStorage.getItem('accountIcon') === 'true' ? true : false;
    if (!this.reqFromAccIcon && this.userPresent) {
      this.router.navigate(['/clothes/search', localStorage.getItem('previousState')])
      localStorage.removeItem('previousState');
    }
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get name() {
    return this.loginForm.get('name');
  }
  login(): void {
    if (this.loginForm.get('username').valid && this.loginForm.get('password').valid) {
      this.loginValidation = null;
      if (this.userAlready(this.loginForm.get('username').value)) {
        const item = JSON.parse(localStorage.getItem(this.loginForm.get('username').value) as string);
        if (item.password === this.loginForm.get('password').value) {
          console.log("Login Successfully")
          localStorage.setItem('currentUser', this.loginForm.get('username').value);
          if (localStorage.getItem('previousState')) {
            this.router.navigate(['/clothes/search', localStorage.getItem('previousState')])
            localStorage.removeItem('previousState');
          }
          else {
            this.router.navigate(['/'])
          }
        }
        else {
          this.loginValidation = 'Incorrect password'
        }
      } else {
        this.loginValidation = "User doesn't exist";
      }
    } else {
      console.log("Login form not submitted", this.loginForm);
    }
    this.loginForm.reset();
  }

  register(): void {
    if (this.loginForm.valid) {
      this.registerValidation = null;
      const username = this.loginForm.get('username').value;
      if (!this.userAlready(username)) {
        const userData = {
          name: this.loginForm.get('name').value,
          password: this.loginForm.get('password').value,
          cartItems: []
        };
        localStorage.setItem(username, JSON.stringify(userData));
        console.log('Registration successful:', username, userData);
        localStorage.setItem('currentUser', username);
        if (localStorage.getItem('previousState')) {
          this.router.navigate(['/clothes/search', localStorage.getItem('previousState')])
          localStorage.removeItem('previousState');
        }
        else {
          this.router.navigate(['/'])
        }
      } else {
        this.registerValidation = 'Already an user';
      }
    } else {
      console.log('Register form not submitted', this.loginForm);
    }
    this.loginForm.reset();
  }

  userAlready(username: string): boolean {
    if (localStorage.getItem(username)) {
      return true;
    } else {
      return false;
    }
  }
  inputCheck() {
    this.registerValidation = null;
    this.loginValidation = null;
  }
  signOut() {
    localStorage.removeItem('currentUser');
    this.userPresent = localStorage.getItem('currentUser') ? true : false;
    this.reqFromAccIcon = localStorage.getItem('accountIcon') === 'true' ? true : false;
  }
}


