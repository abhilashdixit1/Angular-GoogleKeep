import { Component, OnInit } from "@angular/core";
import { Category } from "../category";
import { CategoryService } from "../../../services/category.service";

@Component({
  selector: "app-category-taker",
  templateUrl: "./category-taker.component.html",
  styleUrls: ["./category-taker.component.css"]
})
export class CategoryTakerComponent implements OnInit {
  category: Category = new Category();
  categories: Array<Category> = [];
  errMessage: string;
  constructor(private categoryService: CategoryService) {}

  ngOnInit() {}

  addCategory() {
    this.errMessage = "";
    if (
      this.category.categoryName === "" ||
      this.category.categoryDescription === ""
    ) {
      this.errMessage = "All are required fields";
    } else {
      console.log("addcheck");
      console.log(this.category);
      this.categories.push(this.category);
      this.categoryService.addCategory(this.category).subscribe(
        data => (this.category = new Category()),
        err => {
          const index: number = this.categories.findIndex(
            note => this.category.categoryId === this.category.categoryId
          );
          this.categories.splice(index, 1);
          if (err.status === 404) {
            this.errMessage = err.message;
          } else {
            this.errMessage = "Error:" + err.error.message;
          }
        }
      );
    }
  }
}
