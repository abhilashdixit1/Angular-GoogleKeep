import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Note } from "../note";
import { AuthenticationService } from "./authentication.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/do";
@Injectable()
export class NotesService {
  private token: any;
  private userid: string;
  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;

  constructor(
    private http: HttpClient,
    private _authService: AuthenticationService
  ) {
    this.userid = this._authService.getUserId();
    this.token = this._authService.getBearerToken();
    this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
    this.fetchNotesFromServer();
  }

  fetchNotesFromServer() {
    console.log("fetchnotes");
    return this.http
      .get<Array<Note>>(`http://localhost:8082/api/v1/note/${this.userid}`, {
        headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
      })
      .subscribe(notes => {
        this.notes = notes;
        this.notesSubject.next(this.notes);
      });
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    note.noteCreatedBy = this.userid;
    note.noteStatus = "not-started";
    console.log(note);
    return this.http
      .post<Note>("http://localhost:8082/api/v1/note", note, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
          UserId: `${this.userid}`
        })
      })
      .do(addedNote => {
        addedNote = note;
        this.notes.push(addedNote);
        this.notesSubject.next(this.notes);
        this.fetchNotesFromServer();
      });
  }

  editNote(note): Observable<Note> {
    return this.http
      .put<Note>(
        `http://localhost:8082/api/v1/note/${this.userid}/${note.noteId}`,
        note,
        {
          headers: new HttpHeaders().set(
            "Authorization",
            `Bearer ${this.token}`
          )
        }
      )
      .do(editedNote => {
        const note = this.notes.find(note => note.noteId == editedNote.noteId);
        Object.assign(note, editedNote);
        this.notesSubject.next(this.notes);
      });
  }

  deleteNote(note) {
    return this.http
      .delete(
        `http://localhost:8082/api/v1/note/${this.userid}/${note.noteId}`,
        {
          headers: new HttpHeaders().set(
            "Authorization",
            `Bearer ${this.token}`
          )
        }
      )
      .do(res => {
        const note1 = this.notes.find(note1 => note1.noteId == note.noteId);
        var index = this.notes.indexOf(note1);
        this.notes.splice(index, 1);
        this.notesSubject.next(this.notes);
      });
  }

  getNoteById(noteId): Note {
    const note = this.notes.find(
      noteFromNotes => noteFromNotes.noteId === noteId
    );
    return Object.assign({}, note);
  }

  getAllReminders() {
    return this.http
      .get(`http://localhost:8081/api/v1/reminder`, {
        headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
      })
      .do(reminders => {});
  }

  getAllCategory() {
    return this.http
      .get(`http://localhost:8083/api/v1/category`, {
        headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
      })
      .do(categories => {});
  }
}
