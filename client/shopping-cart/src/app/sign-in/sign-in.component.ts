import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { LocalstorageService } from '../localstorage.service';
import { AuthService } from '../service/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(private router: Router, private formBuilder: FormBuilder,private localStorageService : LocalstorageService, private authService: AuthService) { }
  isRegisterMode: boolean = false;
  loginForm: any;
  registerValidation: string | null = null;
  loginValidation: string | null = null;
  userPresent: boolean = false;
  user: User ={};
  userName: string ="";
  // userPresent: boolean = this.localStorageService.getLocalStorageItem('currentUser') ? true : false;
  
  // reqFromAccIcon: boolean = this.localStorageService.getLocalStorageItem('accountIcon') === 'true' ? true : false;
  ngOnInit() {
     this.authService.getCurrentUserFlag().subscribe((flag: boolean) => {
      this.userPresent =  flag
    });
    // this.userPresent = this.localStorageService.getLocalStorageItem('currentUser') ? true : false;
    // this.reqFromAccIcon = this.localStorageService.getLocalStorageItem('accountIcon') === 'true' ? true : false;
    if (this.userPresent) {
      if (this.localStorageService.getLocalStorageItem('previousState')) {
        this.router.navigate(['/clothes/search', this.localStorageService.getLocalStorageItem('previousState')])
        this.localStorageService.removeLocalStorageItem('previousState');
      }
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
        // const item = JSON.parse(this.localStorageService.getLocalStorageItem(this.loginForm.get('username').value) as string);
       
        this.authService.getUserdetails(this.loginForm.get('username').value).subscribe((user) => {
          this.user = user as User;
        });
       
        if (this.user.password === this.loginForm.get('password').value) {

          this.authService.updateCurrentUserFlag(this.loginForm.get('username').value, true );
          // this.localStorageService.setLocalStorageItem('currentUser', this.loginForm.get('username').value);
          
          if (this.localStorageService.getLocalStorageItem('previousState')) {
            this.router.navigate(['/clothes/search', this.localStorageService.getLocalStorageItem('previousState')])
            this.localStorageService.removeLocalStorageItem('previousState');
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
    }
    this.loginForm.reset();
  }

  register(): void {
    if (this.loginForm.valid) {
      this.registerValidation = null;
       this.userName = this.loginForm.get('username').value;
      if (!this.userAlready(this.userName)) {
        const userData = {
          userName: this.loginForm.get('username').value, 
          name: this.loginForm.get('name').value,
          password: this.loginForm.get('password').value,
          isCurrentUser: true,
          cartItem: []
        };
        this.authService.createUserdetails(userData)
        // this.localStorageService.setLocalStorageItem(username, JSON.stringify(userData));
        // this.localStorageService.setLocalStorageItem('currentUser', username);
        if (this.localStorageService.getLocalStorageItem('previousState')) {
          this.router.navigate(['/clothes/search', this.localStorageService.getLocalStorageItem('previousState')])
          this.localStorageService.removeLocalStorageItem('previousState');
        }
        else {
          this.router.navigate(['/'])
        }
      } else {
        this.registerValidation = 'Already an user';
      }
    }
    this.loginForm.reset();
  }

  userAlready(username: string): boolean {
    if (this.authService.getUserdetails(username)) {
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
    this.authService.updateCurrentUserFlag(this.username, false);
    // this.localStorageService.removeLocalStorageItem('currentUser');

    this.authService.getCurrentUserFlag().subscribe((flag: boolean) => {
      this.userPresent =  flag
    });
    // this.userPresent = this.localStorageService.getLocalStorageItem('currentUser') ? true : false;
    // this.reqFromAccIcon = this.localStorageService.getLocalStorageItem('accountIcon') === 'true' ? true : false;
  }
}


