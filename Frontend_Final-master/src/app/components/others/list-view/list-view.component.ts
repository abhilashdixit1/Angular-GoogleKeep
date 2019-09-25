//Angular import
import { Component, OnInit } from "@angular/core";
//Component Import
import { Note } from "../../../note";
//Services Import
import { NotesService } from "../../../services/notes.service";

@Component({
  selector: "app-list-view",
  templateUrl: "./list-view.component.html",
  styleUrls: ["./list-view.component.css"]
})
export class ListViewComponent implements OnInit {
  errMessage: string;
  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;

  constructor(private notesService: NotesService) {}
  ngOnInit() {
    this.notStartedNotes = [];
    this.startedNotes = [];
    this.completedNotes = [];
    this.notesService.getNotes().subscribe(
      data => {
        this.notStartedNotes = data.filter(
          note => note.noteStatus === "not-started"
        );
        this.startedNotes = data.filter(note => note.noteStatus === "started");
        this.completedNotes = data.filter(
          note => note.noteStatus === "completed"
        );
      },
      err => (this.errMessage = err.message)
    );
  }
}
