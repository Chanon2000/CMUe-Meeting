import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {PanelMenuModule} from 'primeng/panelmenu';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ToastModule} from 'primeng/toast';
import {DividerModule} from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TableModule} from 'primeng/table';
import {BadgeModule} from 'primeng/badge';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {PasswordModule} from 'primeng/password';
import { ErrorMessageComponent } from './error-message/error-message.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  listPlugin
]);

@NgModule({
  declarations: [ErrorMessageComponent],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    FullCalendarModule,
    ProgressSpinnerModule,
    PanelMenuModule,
    AvatarModule,
    AvatarGroupModule,
    OverlayPanelModule,
    NgbModule,
    ToastModule,
    DividerModule,
    DynamicDialogModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    TagModule,
    DropdownModule,
    InputTextareaModule,
    TableModule,
    BadgeModule
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    RippleModule,
    FullCalendarModule,
    ProgressSpinnerModule,
    PanelMenuModule,
    AvatarModule,
    AvatarGroupModule,
    OverlayPanelModule,
    NgbModule,
    ToastModule,
    DividerModule,
    DynamicDialogModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
    TagModule,
    DropdownModule,
    InputTextareaModule,
    TableModule,
    BadgeModule
  ]
})


export class SharedModule { }
