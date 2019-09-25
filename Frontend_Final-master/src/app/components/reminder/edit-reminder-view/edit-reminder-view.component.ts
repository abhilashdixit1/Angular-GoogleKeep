//Angular import
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatSelectModule } from "@angular/material/select";
//Services Import
import { ReminderService } from "../../../services/reminder.service";
//Component import
import { Reminder } from "../../../reminder";

@Component({
  selector: "app-edit-reminder-view",
  templateUrl: "./edit-reminder-view.component.html",
  styleUrls: ["./edit-reminder-view.component.css"]
})
export class EditReminderViewComponent implements OnInit {
  reminder: Reminder;
  errMessage: string;

  constructor(
    private dialogRef: MatDialogRef<EditReminderViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private reminderService: ReminderService
  ) {}

  ngOnInit() {
    console.log("catiddddd");
    console.log(this.data.reminderId);
    this.reminder = this.reminderService.getThisReminder(this.data.reminderId);
  }

  onSave() {
    this.reminderService.updateReminder(this.reminder).subscribe(
      editNote => {
        this.dialogRef.close();
      },
      err => {
        this.errMessage = err.error ? err.error.message : err.message;
      }
    );
  }
}
