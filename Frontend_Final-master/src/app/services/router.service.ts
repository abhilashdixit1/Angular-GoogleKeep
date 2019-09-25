import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class RouterService {

  constructor(private router: Router, private location: Location) { }

  routeToDashboard() {
    this.router.navigate([ 'dashboard' ]);
  }

  routeToLogin() {
    this.router.navigate([ 'login' ]);
  }

  routeToEditNoteView(noteId) {
    this.router.navigate([
      'dashboard',
      {
        outlets :
        {
          noteEditOutlet : [ 'note', noteId, 'edit' ]
        }
      }
    ]);
  }

  routeToEditCategoryView(categoryId) {
    console.log("inroute")
    console.log(categoryId)
    this.router.navigate([
      'dashboard',
      {
        outlets :
        {
           categoryEditOutlet: [ 'category', categoryId, 'edit' ]
        }
      }
    ]);
  }

  routeToEditReminderView(reminderId) {
    console.log("inroute")
    console.log(reminderId)
    this.router.navigate([
      'dashboard',
      {
        outlets :
        {
           reminderEditOutlet: [ 'reminder', reminderId, 'edit' ]
        }
      }
    ]);
  }

  routeBack() {
    this.location.back();
  }

  routeToNoteView() {
    this.router.navigate([ 'dashboard/view/noteview' ]);
  }

  routeToListView() {
    this.router.navigate([ 'dashboard/view/listview' ]);
  }

  routeToCategoryTab(){
    this.router.navigate(['dashboard/view/categoryview']);
  }

  routeToReminderSection(){
    this.router.navigate(['dashboard/view/reminderView']);
  }
  routeToNoteSection(){
    this.router.navigate(['dashboard/view/noteView']);
  }
  routeToUserSection(){
    this.router.navigate(['dashboard/view/userView']);
  }

  routeToEditUserView(userId) {
    console.log("inroute user view")
    console.log(userId)
    this.router.navigate([
      'dashboard',
      {
        outlets :
        {
           userEditOutlet: [ 'user', userId, 'edit' ]
        }
      }
    ]);
  }

}
