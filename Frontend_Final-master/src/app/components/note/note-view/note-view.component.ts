//Angular import
import { Component, OnInit } from "@angular/core";
//Component import
import { Note } from "../../../note";
//Services Import
import { NotesService } from "../../../services/notes.service";

@Component({
  selector: "app-note-view",
  templateUrl: "./note-view.component.html",
  styleUrls: ["./note-view.component.css"]
})
export class NoteViewComponent implements OnInit {
  errMessage: string;
  notes: Array<Note>;
  serachText: string;
  allNotes: Array<Note>;

  constructor(private notesService: NotesService) {}
  ngOnInit() {
    this.notesService
      .getNotes()
      .subscribe(
        data => (this.notes = data),
        err => (this.errMessage = err.message)
      );
    console.log("fcheck");
    console.log(this.notes);
  }
  filterText(searchText: string) {
    if (searchText === "") {
      this.notesService
        .getNotes()
        .subscribe(
          data => (this.notes = data),
          err => (this.errMessage = err.message)
        );
    } else {
      this.notesService.getNotes().subscribe(
        data => {
          this.allNotes = data;
          this.notes = [];
          this.allNotes.forEach(note => {
            console.log(note);
            if (
              note.noteTitle.toLowerCase().indexOf(searchText.toLowerCase()) !=
                -1 ||
              note.noteContent
                .toLowerCase()
                .indexOf(searchText.toLowerCase()) != -1
            ) {
              this.notes.push(note);
            }
          });
          if (this.notes.length == 0) {
            alert("No Such Note Found, Refine the Search Keyword..!!");
          }
        },
        err => (this.errMessage = err.message)
      );
    }
  }
}
