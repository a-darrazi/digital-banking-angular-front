import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!:FormGroup;
  constructor(private formBuilder:FormBuilder,
              private authServie: AuthService,
              private router:Router) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username:this.formBuilder.control(""),
      password:this.formBuilder.control("")
    })
  }

  onLogin() {
    this.authServie.login(this.formLogin.value.username, this.formLogin.value.password)
      .subscribe({
        next:value => {
          this.authServie.loadProfile(value);
          if(this.authServie.isAuthenticated)
            this.router.navigateByUrl("/admin")
        },
        error:err => console.error("err==> "+err)
      })
  }
}
