import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { MeetingService } from 'src/app/services/meeting.service';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from '../../auth/_services/auth.service';

@Component({
  selector: 'app-add-meeting-dialog',
  templateUrl: './add-meeting-dialog.component.html',
  styleUrls: ['./add-meeting-dialog.component.scss'],
  // providers: [MessageService]
})
export class AddMeetingDialogComponent implements OnInit {
  addMeeting?: FormGroup;
  dateSelected:any = this.config.data;
  userAll?:any[]
  userName?:any[]
  selectedUserId?:any;
  currentUser:any;

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
    console.log(this.currentUser)
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.initForm();
    this.getUserIntoDropdown();
    // this.usersService.getUserAll().subscribe((data:any) => {
    //   this.userAll = data.data.data
    //   console.log(this.userAll)
    // })
  }
  get f(){
    return this.addMeeting?.controls;
  }

  initForm() {
    this.addMeeting = new FormGroup({
      start: new FormControl(this.dateSelected.startStr),
      end: new FormControl(this.dateSelected.endStr),
      title: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      meeting_link: new FormControl(null),
      boss_id: new FormControl(this.currentUser._id),
      // duration: new FormControl(null),
      allDay: new FormControl(this.dateSelected.allDay),
      detail: new FormControl(null),
      status: new FormControl('waiting'),
      participant_id: new FormControl([])
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
    console.log(this.addMeeting?.value)
    if (this.addMeeting?.invalid) {
      this.messageService.add({key:'alertApp', severity:'warn', summary: 'แจ้งเตือน', detail: 'กรุณากรอกข้อมูลใหม่'});
      return;
    }
    this.meetingService.createMeeting(this.addMeeting?.value).subscribe((res:any) => {
      console.log(res)
      if (res.status === 'success') {
        this.messageService.add({key:'alertApp', severity:'success', summary: 'สำเร็จ', detail: 'เพิ่มการประชุมสำเร็จ'});
        this.ref.close();
        window.location.reload();
      }
    }, (err) => {
      this.messageService.add({key:'alertApp', severity:'danger', summary: 'เกิดปัญหา', detail: 'เพิ่มการประชุมไม่สำเร็จ'});
    })
  }

  onCancel() {
    this.ref.close();
  }

}
