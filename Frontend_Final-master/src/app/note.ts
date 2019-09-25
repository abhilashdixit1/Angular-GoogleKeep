import { Category } from "./components/category/category";
import { Reminder } from "./reminder";
export class Note {
  noteId: String;
  noteContent: string;
  noteTitle: string;
  noteStatus: string;
  noteCreatedBy: string;
  category: Category;
  reminders: Array<Reminder> = [];

  constructor() {
    this.noteTitle = "";
    this.noteContent = "";
    this.noteStatus = "not-started";
    this.noteCreatedBy = "";
    this.noteStatus = "";
    this.category = new Category();
    this.reminders = [];
  }
}
