//Angular import
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatSelectModule } from "@angular/material/select";
//Services Import
import { CategoryService } from "../../../services/category.service";
//Component import
import { Category } from "../category";

@Component({
  selector: "app-edit-category-view",
  templateUrl: "./edit-category-view.component.html",
  styleUrls: ["./edit-category-view.component.css"]
})
export class EditCategoryViewComponent implements OnInit {
  category: Category;
  errMessage: string;

  constructor(
    private dialogRef: MatDialogRef<EditCategoryViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    console.log("catiddddd");
    console.log(this.data.categoryId);
    this.category = this.categoryService.getThisCategory(this.data.categoryId);
  }

  onSave() {
    this.categoryService.updateCategory(this.category).subscribe(
      editNote => {
        this.dialogRef.close();
      },
      err => {
        this.errMessage = err.error ? err.error.message : err.message;
      }
    );
  }
}
