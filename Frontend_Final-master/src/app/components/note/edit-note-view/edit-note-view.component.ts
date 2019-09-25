//Angular import
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatSelectModule } from "@angular/material/select";
//Services Import
import { NotesService } from "../../../services/notes.service";
//Component import
import { Note } from "../../../note";

@Component({
  selector: "app-edit-note-view",
  templateUrl: "./edit-note-view.component.html",
  styleUrls: ["./edit-note-view.component.css"]
})
export class EditNoteViewComponent implements OnInit {
  note: Note;
  states: Array<string> = ["not-started", "started", "completed"];
  errMessage: string;
  categories: any;
  reminders: any;

  constructor(
    private dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private noteService: NotesService
  ) {
    noteService.getAllReminders().subscribe(
      data => {
        this.reminders = data;
      },
      err => {
        console.log(err);
      }
    );
    noteService.getAllCategory().subscribe(
      data => {
        this.categories = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.note = this.noteService.getNoteById(this.data.noteId);
  }

  onSave() {
    this.noteService.editNote(this.note).subscribe(
      editNote => {
        this.dialogRef.close();
      },
      err => {
        this.errMessage = err.error ? err.error.message : err.message;
      }
    );
  }
}
