
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  authenticateUser(data) {
    return this.httpClient.post('http://localhost:8089/api/v1/auth/login', data);
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }
  getBearerToken() {
    return localStorage.getItem('bearerToken');  
  }

  setUserId(userid){
    localStorage.setItem('userId',userid);
  }
  getUserId(){
    return localStorage.getItem('userId');
  }
  isUserAuthenticated(token): Promise<boolean> {
    return this.httpClient.post('http://localhost:8089/api/v1/auth/isAuthenticated', {}, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    })
    .map((res) => res['isAuthenticated'])
    .toPromise();
  }

  
  registerUser(data){
    return this.httpClient.post('http://localhost:8089/api/v1/auth/register',data);

  }
}
  

 
