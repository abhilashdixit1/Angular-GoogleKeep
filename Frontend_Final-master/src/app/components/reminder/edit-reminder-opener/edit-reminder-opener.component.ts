//Angular impoprts
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
//Component import
import { EditReminderViewComponent } from "../edit-reminder-view/edit-reminder-view.component";
import { ActivatedRoute } from "@angular/router";
//Services import
import { RouterService } from "../../../services/router.service";

@Component({
  selector: "app-edit-reminder-opener",
  templateUrl: "./edit-reminder-opener.component.html",
  styleUrls: ["./edit-reminder-opener.component.css"]
})
export class EditReminderOpenerComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private routerService: RouterService
  ) {
    console.log("inopener");
    console.log(activatedRoute.snapshot.paramMap);
    const reminderId = +this.activatedRoute.snapshot.paramMap.get("reminderId");
    console.log(reminderId);
    this.dialog
      .open(EditReminderViewComponent, {
        data: {
          reminderId: reminderId
        }
      })
      .afterClosed()
      .subscribe(result => {
        this.routerService.routeBack();
      });
  }

  ngOnInit() {}
}
