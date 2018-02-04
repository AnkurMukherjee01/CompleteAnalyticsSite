import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ContactService {

  constructor(private http: Http) { }

  postMessageData(data){
    var url = 'api/message';
    return this.http.post(url, data);
  }

}
