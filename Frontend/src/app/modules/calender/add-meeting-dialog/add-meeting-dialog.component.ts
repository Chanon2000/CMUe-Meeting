import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-meeting-dialog',
  templateUrl: './add-meeting-dialog.component.html',
  styleUrls: ['./add-meeting-dialog.component.scss']
})
export class AddMeetingDialogComponent implements OnInit {
  addMeeting?: FormGroup;
  dateSelected:any = this.config.data;
  userAll?:any[]
  userName?:any[]
  selectedUserId?:any;

  constructor(
    private primengConfig: PrimeNGConfig,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private usersService: UsersService
  ) {

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
      start: new FormControl(null, [Validators.required]),
      end: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      meeting_link: new FormControl(null, [Validators.required]),
      boss_id: new FormControl(null, [Validators.required]),
      duration: new FormControl(null),
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
        this.f?.['participant_id'].value.splice(i,1);
      }
    }
  }

}
