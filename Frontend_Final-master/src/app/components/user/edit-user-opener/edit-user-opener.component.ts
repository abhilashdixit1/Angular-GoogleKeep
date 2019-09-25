//Angular impoprts
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
//Component import
import { EditUserViewComponent } from "../edit-user-view/edit-user-view.component";
import { ActivatedRoute } from "@angular/router";
//Services import
import { RouterService } from "../../../services/router.service";

@Component({
  selector: "app-edit-user-opener",
  templateUrl: "./edit-user-opener.component.html",
  styleUrls: ["./edit-user-opener.component.css"]
})
export class EditUserOpenerComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private routerService: RouterService
  ) {
    console.log("inopener");
    console.log(activatedRoute.snapshot.paramMap);
    const userId = +this.activatedRoute.snapshot.paramMap.get("categoryId");
    console.log(userId);
    this.dialog
      .open(EditUserViewComponent, {
        data: {
          userId: userId
        }
      })
      .afterClosed()
      .subscribe(result => {
        this.routerService.routeBack();
      });
  }

  ngOnInit() {}
}
