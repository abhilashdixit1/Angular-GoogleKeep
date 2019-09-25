//Angular import
import { Component } from "@angular/core";
//Services import
import { RouterService } from "../../../services/router.service";
import { AuthenticationService } from "../../../services/authentication.service";
import { UserService } from "../../../services/user.service";
import { User } from "../../../user";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent {
  isNoteView = true;
  isShow = true;
  userId: string;
  userName: String;
  user: User = new User();
  constructor(
    private routerService: RouterService,
    private authService: AuthenticationService,
    private userService: UserService
  ) {
    this.userId = authService.getUserId();
  }

  ngOnInit() {
    console.log("in user view");
    this.userId = this.authService.getUserId();
    console.log(this.userId);
    this.userService.getUserById(this.userId).subscribe(data => {
      this.user = data;
      console.log("fetched123");
      console.log(this.user);
      console.log(this.user.userName);
      this.userName = this.user.userName;
    });
    console.log("catcheck");
    console.log(this.user);
  }

  toggle() {
    this.isNoteView = !this.isNoteView;
    if (this.isNoteView) {
      this.routerService.routeToNoteView();
    } else {
      this.routerService.routeToListView();
    }
  }

  logOut() {
    this.routerService.routeToLogin();
    this.userId = "";
    this.authService.setUserId(this.userId);
    this.isShow = false;
  }

  routeToUserSection() {
    this.routerService.routeToUserSection();
  }
}
