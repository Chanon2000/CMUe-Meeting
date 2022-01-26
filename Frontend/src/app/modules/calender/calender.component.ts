import { Component, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent, DateSelectArg, EventClickArg, EventApi  } from '@fullcalendar/angular'; // useful for typechecking
import { OverlayPanel } from 'primeng/overlaypanel';
// import { INITIAL_EVENTS, createEventId } from './event-utils';
import { Calendar, formatRange } from '@fullcalendar/core'
import { MeetingService } from 'src/app/services/meeting.service';
import {DialogService} from 'primeng/dynamicdialog';
import { AddMeetingDialogComponent } from './add-meeting-dialog/add-meeting-dialog.component';
import { EditMeetingDialogComponent } from './edit-meeting-dialog/edit-meeting-dialog.component';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
  providers: [DialogService]
})
export class CalenderComponent implements OnInit {
  @ViewChild('panelEvent',{static:true}) panelEvent?: OverlayPanel;
  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;

  eventSelected:any;
  dateSelected:any;
  meeting?: any[]

  calendarOptions?: CalendarOptions;

  constructor(
    private meetingService: MeetingService,
    public dialogService: DialogService
  ) {
    
  }

  ngOnInit(): void {
    this.meetingService.getMeetingAll().subscribe((data) => {
      console.log(data[0])
      this.meeting = data[0]
      forwardRef(() => Calendar);

      this.calendarOptions = {

        //#Calender
        timeZone: 'UTC',
        initialView: 'timeGridWeek',
        // weekends: false,
        selectable: true,
        select: this.handleDateSelect.bind(this),
        // unselect
        handleWindowResize: true,
        themeSystem: 'bootstrap',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
        // weekNumbers: true,
        dayMaxEvents: true,
    
        //#Date
        // dateClick: this.handleDateSelect.bind(this),
    
        //#Event
        eventClick: this.handleEventClick.bind(this),
        editable: true,
        // eventMouseEnter: this.handleMouseEnter.bind(this),
        // eventMouseLeave: this.handleMouseLeave.bind(this),
        events: this.meeting
        // events: 'https://fullcalendar.io/demo-events.json'
      };
    })
  }

  handleDateSelect(dateInfo:any) {
    console.log(dateInfo)
    this.dateSelected = dateInfo;

    const ref = this.dialogService.open(AddMeetingDialogComponent, {
      data: this.dateSelected,
      header: 'เพิ่มการประชุม',
      width: '50%'
    });
  }


  handleEventClick(clickInfo:EventClickArg) {
    console.log(clickInfo)
    this.eventSelected = clickInfo;
    this.panelEvent?.toggle(clickInfo.jsEvent, clickInfo.jsEvent.target)

    // console.log(this.eventSelected.event.extendedProps)
    console.log(this.eventSelected.event.extendedProps.meeting_link)
  }

  editEvent() {
    this.panelEvent?.toggle(this.eventSelected.jsEvent, this.eventSelected.jsEvent.target)
    const ref = this.dialogService.open(EditMeetingDialogComponent, {
      data: this.dateSelected,
      header: 'แก้ไขการประชุม',
      width: '50%'
    });
  }

  deleteEvent() {
    
  }




  // toggleWeekends() {
  //   this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  // }

}
