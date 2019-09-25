import { Component, OnInit } from "@angular/core";
import { Reminder } from "../../../reminder";
import { ReminderService } from "../../../services/reminder.service";

@Component({
  selector: "app-reminder-view",
  templateUrl: "./reminder-view.component.html",
  styleUrls: ["./reminder-view.component.css"]
})
export class ReminderViewComponent implements OnInit {
  reminders;
  constructor(private reminderService: ReminderService) {}

  ngOnInit() {
    console.log("now rem here");
    this.reminderService.getReminders().subscribe(
      data => {
        this.reminders = data;
        console.log(this.reminders);
      },
      err => console.log(err)
    );
  }
}
