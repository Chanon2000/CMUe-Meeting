import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent, DateSelectArg, EventClickArg, EventApi  } from '@fullcalendar/angular'; // useful for typechecking
import { OverlayPanel } from 'primeng/overlaypanel';
// import { INITIAL_EVENTS, createEventId } from './event-utils';
import { formatRange } from '@fullcalendar/core'

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {
  @ViewChild('panel',{static:true}) panel?: OverlayPanel;
  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;

  eventSelected:any;
  meeting?: any[] = [
    { title: 'event 1', date: '2022-01-01' },
    { title: 'event 2', date: '2022-01-02' },
    { title: 'event 3', date: '2022-01-20' },
    { title: 'event 4', date: '2022-01-18' },
    { title: 'event 5', date: '2022-01-10' },
  ];

  calendarOptions: CalendarOptions = {

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
    // dateClick: this.handleDateClick.bind(this),

    //#Event
    eventClick: this.handleEventClick.bind(this),
    editable: true,
    // eventMouseEnter: this.handleMouseEnter.bind(this),
    // eventMouseLeave: this.handleMouseLeave.bind(this),
    events: this.meeting
    // events: 'https://fullcalendar.io/demo-events.json'
    
  };

  constructor() {
  }

  ngOnInit(): void {
    // 
  }

  handleDateSelect(dateInfo:any) {
    console.log(dateInfo)
    const title = prompt('Please enter a new title for your event');
    const calendarApi = dateInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      let newEvent = {
        // id: createEventId(),
        title,
        start: dateInfo.startStr,
        end: dateInfo.endStr,
        allDay: dateInfo.allDay
      }
      // calendarApi.addEvent(newEvent);

      this.meeting?.push(newEvent)
    }
    
    console.log(this.meeting)
  }


  handleEventClick(clickInfo:EventClickArg) {
    console.log(clickInfo)
    this.eventSelected = clickInfo.event.title;
    this.panel?.toggle(clickInfo.jsEvent, clickInfo.jsEvent.target)
  }




  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }

}
