import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Category } from "../components/category/category";
import { AuthenticationService } from "./authentication.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/do";
import { Location } from "@angular/common";

@Injectable()
export class CategoryService {
  private token: any;
  private userid: string;
  categories: Array<Category>;
  categoriesSubject: BehaviorSubject<Array<Category>>;

  constructor(
    private httpClient: HttpClient,
    private location: Location,
    private _authService: AuthenticationService
  ) {
    this.userid = this._authService.getUserId();
    this.token = this._authService.getBearerToken();
    this.categories = [];
    this.categoriesSubject = new BehaviorSubject(this.categories);
    this.getAllCategory();
  }

  addCategory(category: Category): Observable<Category> {
    category.categoryCreatedBy = this.userid;
    console.log(category);
    return this.httpClient
      .post<Category>("http://localhost:8083/api/v1/category", category, {
        headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
      })
      .do(newCategory => {
        this.categories.push(newCategory);
        this.categoriesSubject.next(this.categories);
      });
  }

  getThisCategory(categoryId): Category {
    console.log("this cat id");
    console.log(categoryId);
    let selectedCategory = new Category();
    this.categories.forEach(thisCategory => {
      console.log("each");
      console.log(thisCategory.categoryId);
      if (thisCategory.categoryId == categoryId) {
        console.log("did i");
        selectedCategory = thisCategory;
      }
    });
    console.log("this cat");
    console.log(selectedCategory);
    return Object.assign({}, selectedCategory);
  }

  getCategories() {
    return this.categoriesSubject;
  }

  getAllCategory() {
    console.log("catgetallcheck");
    console.log(this.token);
    return this.httpClient
      .get<Array<Category>>(`http://localhost:8083/api/v1/category`, {
        headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
      })
      .subscribe(categories => {
        console.log("heretoo");
        console.log(categories);
        this.categories = categories;
        this.categoriesSubject.next(this.categories);
      });
  }

  deleteCategoryById(categoryIdIn) {
    return this.httpClient
      .delete(`http://localhost:8083/api/v1/category/${categoryIdIn}`, {
        headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
      })
      .do(res => {
        const catdel = this.categories.find(
          catdel => catdel.categoryId == categoryIdIn
        );
        var index = this.categories.indexOf(catdel);
        this.categories.splice(index, 1);
        this.categoriesSubject.next(this.categories);
      });
  }

  updateCategory(category: Category): Observable<Category> {
    console.log("catid" + category.categoryId);
    return this.httpClient
      .put<Category>(
        `http://localhost:8083/api/v1/category/${category.categoryId}`,
        category,
        {
          headers: new HttpHeaders().set(
            "Authorization",
            `Bearer ${this.token}`
          )
        }
      )
      .do(updCategory => {
        console.log(updCategory);
        const reminder = this.categories.find(
          reminder => reminder.categoryId == updCategory.categoryId
        );
        Object.assign(reminder, updCategory);
        this.categoriesSubject.next(this.categories);
      });
  }
}
