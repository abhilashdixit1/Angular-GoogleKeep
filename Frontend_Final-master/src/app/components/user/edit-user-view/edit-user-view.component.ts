//Angular import
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatSelectModule } from "@angular/material/select";
//Services Import
import { UserService } from "../../../services/user.service";
//Component import
import { User } from "../../../user";

@Component({
  selector: "app-edit-user-view",
  templateUrl: "./edit-user-view.component.html",
  styleUrls: ["./edit-user-view.component.css"]
})
export class EditUserViewComponent implements OnInit {
  user: User;
  errMessage: string;

  constructor(
    private dialogRef: MatDialogRef<EditUserViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private userService: UserService
  ) {}

  ngOnInit() {
    console.log("catiddddd");
    console.log(this.data.userId);
    this.user = this.userService.getThisUser(this.data.userId);
  }

  onSave() {
    console.log("on save");
    console.log(this.user);
    this.userService.updateUser(this.user).subscribe(
      updatedUser => {
        this.dialogRef.close();
        console.log("upd user");
        console.log(updatedUser);
        this.user = updatedUser;
        console.log("upd user 2");
        console.log(this.user);
      },
      err => {
        this.errMessage = err.error ? err.error.message : err.message;
      }
    );
  }
}
