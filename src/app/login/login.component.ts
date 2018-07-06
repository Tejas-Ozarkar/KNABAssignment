import { UserService } from './../user.service';
import {Component, ElementRef, AfterViewInit, OnInit} from '@angular/core';
import {Router} from '@angular/router';
declare const gapi: any;

@Component({
  selector: 'google-signin',
  template: '<button id="googleBtn">Google Sign-In</button>'
})
export class GoogleSigninComponent implements AfterViewInit {

  private clientId:string = '633611715938-plo6i4ueji69ri65mqt08bh5jae1fv3m.apps.googleusercontent.com';
 
  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');


  public auth2: any;
  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      that.attachSignin(that.element.nativeElement.firstChild);
    });
  }
 attachSignin = (element) => {
    let that = this;
    this.auth2.attachClickHandler(element, {},
       (googleUser) => {

        let profile = googleUser.getBasicProfile();

        // console.log('Token || ' + googleUser.getAuthResponse().id_token);
        // console.log('ID: ' + profile.getId());
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE

        let userData = {
          googleId: profile.getId(),
          name: profile.getName(),
          email: profile.getEmail(),
          imageUrl: profile.getImageUrl()
        }

        this.addUser(userData);
  

     

      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  constructor(private router: Router, private element: ElementRef, private __userService: UserService) {
    console.log('ElementRef: ', this.element);
    this.__userService.addUser
  }

  ngAfterViewInit() {
    this.googleInit();
  }

  addUser(userData){
    console.log('adding new user');
    this.__userService.addUser(userData)
      .subscribe(resp=>{
        console.log(resp);
        if(resp.success){
          localStorage.setItem('userId',resp.data._id);
          localStorage.setItem('name',resp.data.name);
          localStorage.setItem('email',resp.data.email);
          localStorage.setItem('imageUrl',resp.data.imageUrl);
          this.router.navigate(['home']);
        }else{
          console.log('Unable to sign in ');
        }
      },err=>{
        console.log(err);
        
      })
  }
  

}

   
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit {

  constructor() {
  
   }

  ngOnInit() {

  }

}
