import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated:boolean=false;
  roles:any;
  username:string="";
  accessToken!:string|undefined;

  constructor(private http:HttpClient) { }

  public login(username:string, password:string){
    return this.http.post("http://localhost:8085/auth/login",
      {"username":username, "password":password})
  }

  loadProfile(value: any) {
    this.accessToken = value['access-token'];
    this.isAuthenticated=true;
    let decodedJwt:any = jwtDecode(this.accessToken!);
    this.username = decodedJwt.sub;
    this.roles = decodedJwt.scope
  }

  clearCredentials() {
    this.accessToken = undefined;
    this.roles=undefined;
    this.username="";
    this.isAuthenticated=false;
  }
}
