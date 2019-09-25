import { Component, OnInit } from "@angular/core";
import { Category } from "../category";
import { CategoryService } from "../../../services/category.service";

@Component({
  selector: "app-category-view",
  templateUrl: "./category-view.component.html",
  styleUrls: ["./category-view.component.css"]
})
export class CategoryViewComponent implements OnInit {
  errMessage: string;

  constructor(private categoryService: CategoryService) {}
  categories;
  ngOnInit() {
    console.log("nowhere");
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      err => (this.errMessage = err.message)
    );
    console.log("catcheck");
    console.log(this.categories);
  }
}
