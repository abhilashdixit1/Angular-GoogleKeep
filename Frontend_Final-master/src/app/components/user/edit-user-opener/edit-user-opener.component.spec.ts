import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserOpenerComponent } from './edit-user-opener.component';

describe('EditUserOpenerComponent', () => {
  let component: EditUserOpenerComponent;
  let fixture: ComponentFixture<EditUserOpenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserOpenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
