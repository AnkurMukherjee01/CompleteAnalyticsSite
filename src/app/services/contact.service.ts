import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ContactService {

  //baseUrl = environment.basePath;
  constructor(private http: Http) { }

  postMessageData(data){
    return this.http.post('/api/message/', data);
  }

}
