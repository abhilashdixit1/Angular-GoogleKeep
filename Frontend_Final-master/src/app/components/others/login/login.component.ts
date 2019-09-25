//Angular imports
import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
//Services Imports
import { AuthenticationService } from "../../../services/authentication.service";
import { RouterService } from "../../../services/router.service";
import { User } from "../../../user";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  public submitMessage: String = "";
  public bearerToken: any;
  userm: User = new User();

  username = new FormControl("", [Validators.required]);
  password = new FormControl("", [Validators.required]);

  userId = new FormControl("", [Validators.required]);
  userPassword = new FormControl("", [Validators.required]);
  firstName = new FormControl("", [Validators.required]);
  lastName = new FormControl("", [Validators.required]);
  userRole = new FormControl("", [Validators.required]);
  userMobile = new FormControl("", [Validators.required]);

  constructor(
    private _authService: AuthenticationService,
    private routerService: RouterService,
    private userService: UserService
  ) {}

  loginSubmit() {
    this.submitMessage = "";
    const user = {
      userId: this.username.value,
      userPassword: this.password.value
    };
    console.log(user);
    console.log("helloooo");
    this._authService.authenticateUser(user).subscribe(
      res => {
        this.bearerToken = res["token"];
        console.log(this.bearerToken);
        this._authService.setBearerToken(this.bearerToken);
        console.log(user.userId);
        this._authService.setUserId(user.userId);
        this.routerService.routeToDashboard();
        console.log("CHECK");
      },
      err => {
        console.log("error");
        this.submitMessage = err.error ? err.error.message : err.message;
      }
    );
  }

  loginRegister() {
    this.submitMessage = "";
    let regUser = {
      userId: this.userId.value,
      userPassword: this.userPassword.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      userRole: this.userRole.value
    };
    console.log(regUser);
    this._authService.registerUser(regUser).subscribe(
      res => {
        this.userId.reset();
        this.userPassword.reset();
        this.firstName.reset();
        this.lastName.reset();
        this.userRole.reset();
        this.userMobile.reset();
        console.log("CHECK1");
      },
      err => {
        this.submitMessage = err.error ? err.error.message : err.message;
      }
    );

    this.userm.userId = this.userId.value;
    this.userm.userPassword = this.userPassword.value;
    this.userm.userName = this.firstName.value;
    this.userm.userMobile = this.userMobile.value;

    console.log("user to mongo");
    console.log(this.userm);

    this.userService.addUser(this.userm).subscribe(res => {
      alert("user registered Successfully");
    });
  }

  invalidUserName(): string {
    return this.username.hasError("required") ? "Username Is mandatory." : "";
  }
  invalidPassword(): string {
    return this.password.hasError("required") ? "Password Is Mandatory." : "";
  }
}
