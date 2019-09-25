import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../user';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';
import { Location } from '@angular/common';

@Injectable()
export class UserService {

  private token : any;
  private userid : string;
  user : User = new User();
  userSubject : BehaviorSubject<User>;

  constructor(private httpClient : HttpClient , private location : Location ,
    private authService : AuthenticationService) { 
      this.token = this.authService.getBearerToken();
      this.userid = this.authService.getUserId();
      this.user = new User();
      this.userSubject = new BehaviorSubject(this.user);
    }

    addUser(user:User):Observable<User>{
      console.log("user is service")
      console.log(user)
      return this.httpClient.post<User>('http://localhost:8080/api/v1/user', user,
      {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
      }).do(user1 => {
        console.log("user registered")
        console.log(user1);

      });
    }

    updateUser(user:User):Observable<User>{
      console.log("userId"+user.userId)
      return this.httpClient.put<User>(`http://localhost:8080/api/v1/user/${user.userId}`,user,
        { headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
       }).do(updUser => {      
            console.log(updUser);
            this.user = updUser;
          }
        );
    }

    getUserById(userId):Observable<User>{        
      console.log("in user service")      
      console.log(userId);
      return this.httpClient.get<User>(`http://localhost:8080/api/v1/user/${userId}`,
        {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`) }).do(
          userById => {
            console.log("user by id")
            console.log(userById);
            this.user = userById;
            console.log(this.user);
          }
        );
    }

    getThisUser(userId): User {
      console.log("this cat id")
      console.log(userId)
      let selUser =  new User();
          selUser = this.user;
     console.log("selected user")
      console.log(selUser)
      return Object.assign({}, selUser);
    }



}
