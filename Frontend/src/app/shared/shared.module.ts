import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import {DynamicDialogModule} from 'primeng/dynamicdialog';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  listPlugin
]);

@NgModule({
  declarations: [],
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
    DynamicDialogModule
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
    DynamicDialogModule
  ]
})


export class SharedModule { }
