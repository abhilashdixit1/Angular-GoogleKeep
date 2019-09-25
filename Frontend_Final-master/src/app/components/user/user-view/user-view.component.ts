import { Component, OnInit } from "@angular/core";
import { User } from "../../../user";
import { UserService } from "../../../services/user.service";
import { AuthenticationService } from "../../../services/authentication.service";
import { RouterService } from "../../../services/router.service";

@Component({
  selector: "app-user-view",
  templateUrl: "./user-view.component.html",
  styleUrls: ["./user-view.component.css"]
})
export class UserViewComponent implements OnInit {
  errMessage: string;
  userId: String;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private routerService: RouterService
  ) {}
  user: User = new User();
  ngOnInit() {
    console.log("in user view");
    this.userId = this.authService.getUserId();
    console.log(this.userId);
    this.userService.getUserById(this.userId).subscribe(
      data => {
        this.user = data;
        console.log("fetched");
        console.log(data);
      },
      err => (this.errMessage = err.message)
    );
    console.log("catcheck");
    console.log(this.user);
  }
  openEditView() {
    this.routerService.routeToEditUserView(this.userId);
  }
}
