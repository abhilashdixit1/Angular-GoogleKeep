import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// ----- Components --------
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/others/header/header.component";
import { LoginComponent } from "./components/others/login/login.component";
import { DashboardComponent } from "./components/others/dashboard/dashboard.component";
import { NoteTakerComponent } from "./components/note/note-taker/note-taker.component";
import { NoteViewComponent } from "./components/note/note-view/note-view.component";
import { NoteComponent } from "./components/note/note/note.component";
import { ListViewComponent } from "./components/others/list-view/list-view.component";
import { EditNoteViewComponent } from "./components/note/edit-note-view/edit-note-view.component";
import { EditNoteOpenerComponent } from "./components/note/edit-note-opener/edit-note-opener.component";
import { EditCategoryOpenerComponent } from "./components/category/edit-category-opener/edit-category-opener.component";
import { EditCategoryViewComponent } from "./components/category/edit-category-view/edit-category-view.component";

// ----- Services & Guards-----
import { NotesService } from "./services/notes.service";
import { AuthenticationService } from "./services/authentication.service";
import { RouterService } from "./services/router.service";
import { CanActivateRouteGuard } from "./can-activate-route.guard";
import { CategoryService } from "./services/category.service";
import { ReminderService } from "./services/reminder.service";
import { UserService } from "./services/user.service";

// ------- Material imports---------s
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatListModule } from "@angular/material/list";
import { CategoryComponent } from "./components/category/category/category.component";
import { CategorySectionComponent } from "./components/category/category-section/category-section.component";
import { CategoryTakerComponent } from "./components/category/category-taker/category-taker.component";
import { CategoryViewComponent } from "./components/category/category-view/category-view.component";
import { ReminderComponent } from "./components/reminder/reminder/reminder.component";
import { ReminderSectionComponent } from "./components/reminder/reminder-section/reminder-section.component";
import { ReminderTakerComponent } from "./components/reminder/reminder-taker/reminder-taker.component";
import { ReminderViewComponent } from "./components/reminder/reminder-view/reminder-view.component";
import { NoteSectionComponent } from "./components/note/note-section/note-section.component";
import { EditReminderViewComponent } from "./components/reminder/edit-reminder-view/edit-reminder-view.component";
import { EditReminderOpenerComponent } from "./components/reminder/edit-reminder-opener/edit-reminder-opener.component";
import { UserSectionComponent } from "./components/user/user-section/user-section.component";
import { UserViewComponent } from "./components/user/user-view/user-view.component";
import { EditUserOpenerComponent } from "./components/user/edit-user-opener/edit-user-opener.component";
import { EditUserViewComponent } from "./components/user/edit-user-view/edit-user-view.component";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
      {
        path: "view/noteview",
        component: NoteViewComponent
      },
      {
        path: "view/listview",
        component: ListViewComponent
      },
      {
        path: "",
        redirectTo: "view/noteview",
        pathMatch: "full"
      },
      {
        path: "note/:noteId/edit",
        component: EditNoteOpenerComponent,
        outlet: "noteEditOutlet"
      },
      {
        path: "category/:categoryId/edit",
        component: EditCategoryOpenerComponent,
        outlet: "categoryEditOutlet"
      },
      {
        path: "reminder/:reminderId/edit",
        component: EditReminderOpenerComponent,
        outlet: "reminderEditOutlet"
      },
      {
        path: "user/:userId/edit",
        component: EditUserOpenerComponent,
        outlet: "userEditOutlet"
      },
      {
        path: "view/categoryview",
        component: CategorySectionComponent
      },
      {
        path: "view/reminderView",
        component: ReminderSectionComponent
      },
      {
        path: "view/noteView",
        component: NoteSectionComponent
      },
      {
        path: "view/userView",
        component: UserSectionComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    NoteTakerComponent,
    NoteViewComponent,
    NoteComponent,
    ListViewComponent,
    EditNoteViewComponent,
    EditNoteOpenerComponent,
    CategoryComponent,
    CategorySectionComponent,
    CategoryTakerComponent,
    CategoryViewComponent,
    ReminderComponent,
    ReminderSectionComponent,
    ReminderTakerComponent,
    ReminderViewComponent,
    NoteSectionComponent,
    EditCategoryOpenerComponent,
    EditCategoryViewComponent,
    EditReminderViewComponent,
    EditReminderOpenerComponent,
    UserSectionComponent,
    UserViewComponent,
    EditUserOpenerComponent,
    EditUserViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatListModule
  ],
  providers: [
    NotesService,
    AuthenticationService,
    RouterService,
    CanActivateRouteGuard,
    CategoryService,
    ReminderService,
    UserService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EditNoteViewComponent,
    EditCategoryViewComponent,
    EditReminderViewComponent,
    EditUserViewComponent
  ]
})
export class AppModule {}
