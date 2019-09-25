//Angular import
import { Component, OnInit, Input } from "@angular/core";
//Component import
import { Note } from "../../../note";
//Services Import
import { RouterService } from "../../../services/router.service";
import { NotesService } from "../../../services/notes.service";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.css"]
})
export class NoteComponent implements OnInit {
  @Input() note: Note;
  constructor(
    private routerService: RouterService,
    private noteService: NotesService
  ) {}
  ngOnInit() {}
  openEditView() {
    this.routerService.routeToEditNoteView(this.note.noteId);
  }
  deleteNote() {
    console.log("delnote");
    console.log(this.note);
    this.noteService.deleteNote(this.note).subscribe(
      res => {
        alert("Note has been deleted");
      },
      err => {
        console.log(err);
        alert("Could not delete the note");
      }
    );
  }
}
