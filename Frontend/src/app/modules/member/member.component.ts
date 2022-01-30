import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  users?: any[];

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private messageService: MessageService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.getUserAll().subscribe((users:any) => {
      this.users = users.data.data;
      // console.log(this.users)
    })
  }

}
