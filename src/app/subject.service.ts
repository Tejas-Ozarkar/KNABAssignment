import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Subject } from './subject';
import 'rxjs/add/operator/map';

@Injectable()
export class SubjectService {

  private apiUrl = "http://localhost:3000/api";

  constructor(private _http: Http) { }

  addSubject(subject: Subject){
    // console.log(user);
    let headers = new Headers({'content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this._http.post(this.apiUrl+'/subject',JSON.stringify(subject),options)
      .map((response: Response)=>response.json());
  }

  getSubjects(){
    let headers = new Headers({'content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this._http.get(this.apiUrl+'/subjects',options)
      .map((response: Response)=>response.json());
  }

  editSubject(subject){
    console.log(subject);
    let headers = new Headers({'content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this._http.put(this.apiUrl+'/subject',subject,options)
      .map((response: Response)=>response.json());
  }

  deleteSubject(id){
    let headers = new Headers({'content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this._http.delete(this.apiUrl+'/subject/'+id,options)
      .map((response: Response)=>response);
  }
}
