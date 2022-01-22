import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  // items?: MenuItem[]; // error in html (model)
  items: MenuItem[] = [];
  showSidebar: boolean = true;

  constructor() { }

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

}
