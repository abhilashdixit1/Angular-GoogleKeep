import { Component, OnInit } from "@angular/core";
import { Reminder } from "../../../reminder";
import { ReminderService } from "../../../services/reminder.service";
import { RouterService } from "../../../services/router.service";

@Component({
  selector: "app-reminder-taker",
  templateUrl: "./reminder-taker.component.html",
  styleUrls: ["./reminder-taker.component.css"]
})
export class ReminderTakerComponent implements OnInit {
  reminder: Reminder = new Reminder();
  reminders: Array<Reminder> = [];
  errorMessage: string;
  constructor(
    private reminderService: ReminderService,
    private routerService: RouterService
  ) {}

  ngOnInit() {}

  addReminder() {
    if (
      this.reminder.reminderName == "" ||
      this.reminder.reminderDescription == "" ||
      this.reminder.reminderType == ""
    ) {
      this.errorMessage = "All fields are mandatory";
      return;
    }

    this.reminders.push(this.reminder);
    this.reminderService.addReminder(this.reminder).subscribe(
      data => {
        console.log("success");
        this.errorMessage = "";
      },
      err => {
        console.log(err);
        const index: number = this.reminders.findIndex(
          reminder => reminder.reminderId === this.reminder.reminderId
        );
        this.reminders.splice(index, 1);
        console.log(err.error.message);
        this.errorMessage = err.error.message;
      }
    );
    this.reminder = new Reminder();
    console.log(this.reminders);
  }
}
