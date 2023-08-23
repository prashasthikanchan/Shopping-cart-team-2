import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private router: Router) { }

  username: string='';
  password: string='';
  name: string='';
  isRegisterMode: boolean = false;

  ngOnInit() {
  }

  login(): void {
    
  }

  register():void{
    
  }
}


