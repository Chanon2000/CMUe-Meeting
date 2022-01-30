import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MeetingService } from 'src/app/services/meeting.service';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from '../../auth/_services/auth.service';

@Component({
  selector: 'app-edit-meeting-dialog',
  templateUrl: './edit-meeting-dialog.component.html',
  styleUrls: ['./edit-meeting-dialog.component.scss']
})
export class EditMeetingDialogComponent implements OnInit {
  editMeetingForm?: FormGroup;
  meetingId:any = this.config.data;
  eventSelected?:any;
  currentUser:any;
  selectedUserId?:any;

  userAll?:any[]
  userName?:any[]

  submitted = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private usersService: UsersService,
    private messageService: MessageService,
    private authService: AuthService,
    private meetingService: MeetingService
  ) { 
    this.currentUser = this.authService.getUserDetail();
    
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    
    this.getUserIntoDropdown();
    
    this.meetingService.getMeetingById(this.meetingId).subscribe((meeting) => {
      this.eventSelected = meeting.data.data
      this.initForm();
    })
  }

  get f(){
    return this.editMeetingForm?.controls;
  }

  initForm() {
    this.editMeetingForm = new FormGroup({
      start: new FormControl(this.eventSelected.start),
      end: new FormControl(this.eventSelected.end),
      title: new FormControl(this.eventSelected.title, [Validators.required]),
      type: new FormControl(this.eventSelected.type, [Validators.required]),
      meeting_link: new FormControl(this.eventSelected.meeting_link),
      boss_id: new FormControl(this.eventSelected.boss_id),
      // duration: new FormControl(null),
      allDay: new FormControl(this.eventSelected.allDay),
      detail: new FormControl(this.eventSelected.detail),
      status: new FormControl(this.eventSelected.status),
      participant_id: new FormControl(this.eventSelected.participant_id)
    })
  }

  getUserIntoDropdown() {
    this.usersService.getUserAll().subscribe((data:any) => {
      this.userAll = data.data.data
      this.userName = data.data.data
      console.log(this.userAll)
    })
  }

  handleSelectUser() {
    if (this.selectedUserId == (undefined || null) ) return;
    this.f?.['participant_id'].value.push(this.selectedUserId);
    this.userAll = this.userAll?.filter((user) => user._id != this.selectedUserId);
    this.selectedUserId = null;
    // this.userAll = [];
  }

  getUserName(id:any) {
    let name:string = '';
    // console.log(this.userAll)
    this.userName?.forEach((user:any) => {
      if (user._id === id) {
        name = `${user.prename} ${user.firstname} ${user.lastname}`
      }
    })
    return name;
  }

  RemoveParticipant(id:any) {
    for(let i=0;i < this.f?.['participant_id'].value.length;i++) {
      if(this.f?.['participant_id'].value[i] === id) {
        // push back in userAll
        this.userName?.forEach(user => {
          if(user._id == this.f?.['participant_id'].value[i]) {
            this.userAll?.push(user)
          }
        })
        // remove out of form
        this.f?.['participant_id'].value.splice(i,1);
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.editMeetingForm?.value)
    if (this.editMeetingForm?.invalid) {
      this.messageService.add({key:'alertApp', severity:'warn', summary: 'แจ้งเตือน', detail: 'กรุณากรอกข้อมูลใหม่'});
      return;
    }
    this.meetingService.updateMeeting(this.meetingId, this.editMeetingForm?.value).subscribe((res:any) => {
      console.log(res)
      if (res.status === 'success') {
        this.messageService.add({key:'alertApp', severity:'success', summary: 'สำเร็จ', detail: 'แก้ไขการประชุมสำเร็จ'});
        this.ref.close();
        window.location.reload();
      }
    }, (err) => {
      this.messageService.add({key:'alertApp', severity:'danger', summary: 'เกิดปัญหา', detail: 'แก้ไขการประชุมไม่สำเร็จ'});
    })
  }

  onCancel() {
    this.ref.close();
  }

}
