import { Component, OnInit, Input } from "@angular/core";
import { Category } from "../category";
//Services Import
import { RouterService } from "../../../services/router.service";
import { CategoryService } from "../../../services/category.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent implements OnInit {
  @Input()
  category: Category;
  constructor(
    private routerService: RouterService,
    private categoryervice: CategoryService
  ) {}

  ngOnInit() {}

  openEditView() {
    this.routerService.routeToEditCategoryView(this.category.categoryId);
  }

  deleteCategory() {
    console.log("delCat");
    console.log(this.category);
    this.categoryervice.deleteCategoryById(this.category.categoryId).subscribe(
      res => {
        alert("Category has been deleted");
      },
      err => {
        console.log(err);
        alert("Problem In deleting Category");
      }
    );
  }
}
