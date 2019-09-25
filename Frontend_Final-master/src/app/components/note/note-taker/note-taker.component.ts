import { Component, OnInit } from "@angular/core";
import { Note } from "../../../note";
import { NotesService } from "../../../services/notes.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ReminderService } from "../../../services/reminder.service";
import { CategoryService } from "../../../services/category.service";

@Component({
  selector: "app-note-taker",
  templateUrl: "./note-taker.component.html",
  styleUrls: ["./note-taker.component.css"]
})
export class NoteTakerComponent implements OnInit {
  errMessage: string;
  note: Note = new Note();
  notes: Array<Note> = [];
  categories;
  reminders;

  constructor(private notesService: NotesService) {
    notesService.getAllReminders().subscribe(
      data => {
        this.reminders = data;
      },
      err => {
        console.log(err);
      }
    );
    notesService.getAllCategory().subscribe(
      data => {
        this.categories = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  ngOnInit() {}

  addNote() {
    this.errMessage = "";
    if (this.note.noteTitle === "") {
      this.errMessage = "Title and Text both are required fields";
    } else if (this.note.noteContent === "") {
      this.errMessage = "Title and Text both are required fields";
    } else {
      console.log("addcheck");
      console.log(this.note);
      this.notes.push(this.note);
      this.notesService.addNote(this.note).subscribe(
        data => (this.note = new Note()),
        err => {
          const index: number = this.notes.findIndex(
            note => note.noteTitle === this.note.noteTitle
          );
          this.notes.splice(index, 1);
          if (err.status === 404) {
            this.errMessage = err.message;
          } else {
            this.errMessage = "Error:" + err.error.message;
          }
        }
      );
    }
  }
}
