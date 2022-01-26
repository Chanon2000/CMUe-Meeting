import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMeetingDialogComponent } from './edit-meeting-dialog.component';

describe('EditMeetingDialogComponent', () => {
  let component: EditMeetingDialogComponent;
  let fixture: ComponentFixture<EditMeetingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMeetingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMeetingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
