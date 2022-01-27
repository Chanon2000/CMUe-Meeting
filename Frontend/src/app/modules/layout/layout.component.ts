import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { AuthService } from '../auth/_services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  // items?: MenuItem[]; // error in html (model)
  items: MenuItem[] = [];
  showSidebar: boolean = true;
  currentUser:any;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.getUserDetail();
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-th-large',
        routerLink: 'home'
      },
      {
        label: 'Calender',
        icon: 'pi pi-tag',
        routerLink: 'calender',
      },
      {
        label: 'User',
        icon: 'pi pi-tag',
        routerLink: 'user',
      },
    ]
  }


  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  logout() {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('userDetailToken');
    localStorage.removeItem('login');
    this.router.navigate(['/login'], {
      queryParams: {},
    });
  }

}
