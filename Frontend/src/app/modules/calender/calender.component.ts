import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent, DateSelectArg, EventClickArg, EventApi  } from '@fullcalendar/angular'; // useful for typechecking
import { OverlayPanel } from 'primeng/overlaypanel';
// import { INITIAL_EVENTS, createEventId } from './event-utils';
import { Calendar, formatRange } from '@fullcalendar/core'
import { MeetingService } from 'src/app/services/meeting.service';
import {DialogService} from 'primeng/dynamicdialog';
import { AddMeetingDialogComponent } from './add-meeting-dialog/add-meeting-dialog.component';
import { EditMeetingDialogComponent } from './edit-meeting-dialog/edit-meeting-dialog.component';
import { UsersService } from 'src/app/services/users.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth/_services/auth.service';

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
  userAll?: any[]

  calendarOptions?: CalendarOptions;
  currentUser:any;

  constructor(
    private meetingService: MeetingService,
    public dialogService: DialogService,
    private usersService: UsersService,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.getUserDetail();
  }

  ngOnInit(): void {
    this.meetingService.getMeetingAll().subscribe((data) => {
      // console.log(data[0])
      this.meeting = data[0]
      this.initCalender()
    })

    this.usersService.getUserAll().subscribe((data:any) => {
      this.userAll = data.data.data
    })
  }


  initCalender() {
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
  }

  handleEventClick(clickInfo:EventClickArg) {
    // console.log(clickInfo)
    this.eventSelected = clickInfo;
    this.panelEvent?.toggle(clickInfo.jsEvent, clickInfo.jsEvent.target)
    // console.log(this.eventSelected.event.extendedProps.meeting_link)
  }

  handleDateSelect(dateInfo:any) {
    // console.log(dateInfo)
    this.dateSelected = dateInfo;
    const ref = this.dialogService.open(AddMeetingDialogComponent, {
      data: this.dateSelected,
      header: '??????????????????????????????????????????',
      width: '50%',
      height: '700px',
    });
  }

  handleEditEvent(id:any) {
    this.panelEvent?.toggle(this.eventSelected.jsEvent, this.eventSelected.jsEvent.target)
    const ref = this.dialogService.open(EditMeetingDialogComponent, {
      data: id,
      header: '??????????????????????????????????????????',
      width: '50%'
    });
  }

  handleDeleteEvent(meeting_id:string) {
    this.meetingService.deleteMeeting(meeting_id).subscribe((res:any) => {
      this.panelEvent?.hide()
      this.meeting = this.meeting?.filter(meeting => meeting._id !== meeting_id)
      this.initCalender()
      this.messageService.add({key:'alertApp', severity:'success', summary: '??????????????????', detail: '???????????????????????????????????????????????????'});
    })
  }

  translateUser(id:any):string {
    let name:string = '';
    // console.log(this.userAll)
    this.userAll?.forEach((user:any) => {
      if (user._id === id) {
        name = `${user.prename} ${user.firstname} ${user.lastname}`
      }
    })
    return name;
  }


  // toggleWeekends() {
  //   this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  // }

}
