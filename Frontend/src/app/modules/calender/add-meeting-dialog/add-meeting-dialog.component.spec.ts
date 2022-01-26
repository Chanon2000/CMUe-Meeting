import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeetingDialogComponent } from './add-meeting-dialog.component';

describe('AddMeetingDialogComponent', () => {
  let component: AddMeetingDialogComponent;
  let fixture: ComponentFixture<AddMeetingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMeetingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMeetingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
