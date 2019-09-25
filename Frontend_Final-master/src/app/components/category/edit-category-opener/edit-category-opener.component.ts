//Angular impoprts
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
//Component import
import { EditCategoryViewComponent } from "../edit-category-view/edit-category-view.component";
import { ActivatedRoute } from "@angular/router";
//Services import
import { RouterService } from "../../../services/router.service";

@Component({
  selector: "app-edit-category-opener",
  templateUrl: "./edit-category-opener.component.html",
  styleUrls: ["./edit-category-opener.component.css"]
})
export class EditCategoryOpenerComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private routerService: RouterService
  ) {
    console.log("inopener");
    console.log(activatedRoute.snapshot.paramMap);
    const categoryId = +this.activatedRoute.snapshot.paramMap.get("categoryId");
    console.log(categoryId);
    this.dialog
      .open(EditCategoryViewComponent, {
        data: {
          categoryId: categoryId
        }
      })
      .afterClosed()
      .subscribe(result => {
        this.routerService.routeBack();
      });
  }

  ngOnInit() {}
}
