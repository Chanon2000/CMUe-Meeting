import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from '@fullcalendar/daygrid';
import { MessageService } from 'primeng/api';
import { MeetingService } from 'src/app/services/meeting.service';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from '../auth/_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(Table) table?: Table;
  loadingTable: boolean = true;
  rows:number =10;
  first:number = 0;
  listMeeting: any = [];

  currentUser:any;
  userAll?: any[]

  selectedStatus?:string = "";

  constructor(
    private meetingService: MeetingService,
    private usersService: UsersService,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.getUserDetail();
  }

  ngOnInit(): void {
    this.meetingService.getMeetingMe(this.currentUser._id).subscribe((meetings) => {
      this.listMeeting = meetings.data.data
      this.loadingTable = false;
    })

    this.usersService.getUserAll().subscribe((data:any) => {
      this.userAll = data.data.data
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

  translateEmail(id:any):string {
    let email:string = '';
    this.userAll?.forEach((user:any) => {
      if (user._id === id) {
        email = `${user.email}`
      }
    })
    return email;
  }

}
