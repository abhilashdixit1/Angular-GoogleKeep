//Angular impoprts
import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
//Component import
import { EditNoteViewComponent } from "../edit-note-view/edit-note-view.component";
import { ActivatedRoute } from "@angular/router";
//Services import
import { RouterService } from "../../../services/router.service";

@Component({
  selector: "app-edit-note-opener",
  templateUrl: "./edit-note-opener.component.html",
  styleUrls: ["./edit-note-opener.component.css"]
})
export class EditNoteOpenerComponent {
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private routerService: RouterService
  ) {
    console.log("inopener");
    console.log(activatedRoute.snapshot.paramMap);

    const noteId = +this.activatedRoute.snapshot.paramMap.get("noteId");
    console.log("noteid");
    console.log(noteId);
    this.dialog
      .open(EditNoteViewComponent, {
        data: {
          noteId: noteId
        }
      })
      .afterClosed()
      .subscribe(result => {
        this.routerService.routeBack();
      });
  }
}
