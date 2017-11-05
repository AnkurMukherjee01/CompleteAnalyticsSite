import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ContactService {

  public base_url = "http://localhost:4000/";
  constructor(private http: Http) { }

  postMessageData(data){
    return this.http.post(this.base_url + 'api/message/', data);
  }

}
