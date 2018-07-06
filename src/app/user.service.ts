import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { User } from './user';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  private apiUrl = "http://localhost:3000/api";

  constructor(private _http: Http) { }

  addUser(user: User){
    // console.log(user);
    let headers = new Headers({'content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this._http.post(this.apiUrl+'/user',JSON.stringify(user),options)
      .map((response: Response)=>response.json());
  }


}
