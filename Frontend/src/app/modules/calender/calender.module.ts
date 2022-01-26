import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalenderComponent } from './calender.component';
import { RouterModule } from '@angular/router';
import { AddMeetingDialogComponent } from './add-meeting-dialog/add-meeting-dialog.component';
import { EditMeetingDialogComponent } from './edit-meeting-dialog/edit-meeting-dialog.component';


@NgModule({
  declarations: [CalenderComponent, AddMeetingDialogComponent, EditMeetingDialogComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: CalenderComponent,
      }
    ]),
  ],
  providers: []
})


export class CalenderModule { }
