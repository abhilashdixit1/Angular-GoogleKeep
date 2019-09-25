//Angular core import
import { Component } from "@angular/core";
//Services import
import { NotesService } from "../../../services/notes.service";
import { RouterService } from "../../../services/router.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent {
  constructor(
    private notesService: NotesService,
    private routerService: RouterService
  ) {
    this.notesService.fetchNotesFromServer();
  }
  ngOnInit() {
    this.routerService.routeToNoteSection();
  }

  routeToCategoryTab() {
    this.routerService.routeToCategoryTab();
  }

  routeToReminderSection() {
    this.routerService.routeToReminderSection();
  }

  routeToNoteSection() {
    this.routerService.routeToNoteSection();
  }
}
