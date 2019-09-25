import { Component, OnInit, Input } from "@angular/core";
import { Reminder } from "../../../reminder";
//Services Import
import { RouterService } from "../../../services/router.service";
import { ReminderService } from "../../../services/reminder.service";
@Component({
  selector: "app-reminder",
  templateUrl: "./reminder.component.html",
  styleUrls: ["./reminder.component.css"]
})
export class ReminderComponent implements OnInit {
  @Input()
  reminder: Reminder;
  constructor(
    private routerService: RouterService,
    private reminderService: ReminderService
  ) {}

  ngOnInit() {}

  openEditView() {
    this.routerService.routeToEditReminderView(this.reminder.reminderId);
  }

  deleteReminder() {
    console.log("delCat");
    console.log(this.reminder);
    this.reminderService.deleteReminderById(this.reminder.reminderId).subscribe(
      res => {
        alert("Reminder has been deleted");
      },
      err => {
        console.log(err);
        alert("Problem In deleting Reminder");
      }
    );
  }
}
