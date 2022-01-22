import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalenderComponent } from './calender.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [CalenderComponent],
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
