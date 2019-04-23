import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserAuthService } from 'src/services/logged-in/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(
    private user: UserAuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.user.isLogged()){
      this.router.navigate(['query'])
    }
  }

}
