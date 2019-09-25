import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Reminder } from "../reminder";
import { Note } from "../note";
import { AuthenticationService } from "./authentication.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/do";
import { Location } from "@angular/common";

@Injectable()
export class ReminderService {
  private token: any;
  private userid: string;
  reminders: Array<Reminder>;
  remindersSubject: BehaviorSubject<Array<Reminder>>;

  constructor(
    private httpClient: HttpClient,
    private location: Location,
    private authService: AuthenticationService
  ) {
    this.token = this.authService.getBearerToken();
    this.userid = this.authService.getUserId();
    this.reminders = [];
    this.remindersSubject = new BehaviorSubject(this.reminders);
    this.getAllReminders();
  }

  addReminder(reminder: Reminder): Observable<Reminder> {
    return this.httpClient
      .post<Reminder>("http://localhost:8081/api/v1/reminder", reminder, {
        headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
      })
      .do(reminder1 => {
        this.reminders.push(reminder1);
        this.remindersSubject.next(this.reminders);
      });
  }

  getAllReminders() {
    console.log("here");
    return this.httpClient
      .get<Array<Reminder>>(`http://localhost:8081/api/v1/reminder`, {
        headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
      })
      .subscribe(reminders => {
        console.log("heretoo11");
        console.log(reminders);
        this.reminders = reminders;
        this.remindersSubject.next(this.reminders);
      });
  }

  getReminders() {
    return this.remindersSubject;
  }

  deleteReminderById(reminderIdIn) {
    return this.httpClient
      .delete(`http://localhost:8081/api/v1/reminder/${reminderIdIn}`, {
        headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
      })
      .do(res => {
        const rem1 = this.reminders.find(
          rem1 => rem1.reminderId == reminderIdIn
        );
        var index = this.reminders.indexOf(rem1);
        this.reminders.splice(index, 1);
        this.remindersSubject.next(this.reminders);
      });
  }

  updateReminder(reminder: Reminder): Observable<Reminder> {
    console.log("remid" + reminder.reminderId);
    return this.httpClient
      .put<Reminder>(
        `http://localhost:8081/api/v1/reminder/${reminder.reminderId}`,
        reminder,
        {
          headers: new HttpHeaders().set(
            "Authorization",
            `Bearer ${this.token}`
          )
        }
      )
      .do(updReminder => {
        console.log(updReminder);
        const reminder = this.reminders.find(
          reminder => reminder.reminderId == updReminder.reminderId
        );
        Object.assign(reminder, updReminder);
        this.remindersSubject.next(this.reminders);
      });
  }

  getReminderById(reminderId): Observable<Reminder> {
    return this.httpClient
      .get<Reminder>(`http://localhost:8081/api/v1/reminder/${reminderId}`, {
        headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
      })
      .do(reminderById => {
        console.log(reminderById);
      });
  }

  getThisReminder(reminderId): Reminder {
    console.log("this cat id");
    console.log(reminderId);
    let selectedReminder = new Reminder();
    this.reminders.forEach(thisReminder => {
      console.log("each");
      console.log(thisReminder.reminderId);
      if (thisReminder.reminderId == reminderId) {
        console.log("did i");
        selectedReminder = thisReminder;
      }
    });
    console.log("this cat");
    console.log(selectedReminder);
    return Object.assign({}, selectedReminder);
  }
}
