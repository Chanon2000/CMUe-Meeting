import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalenderComponent } from '../calender/calender.component';
import { HomeComponent } from '../home/home.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'calender',
        loadChildren: () => import('../calender/calender.module').then((m) => m.CalenderModule)
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      { path:'*', redirectTo: 'home', pathMatch: 'full' },
      { path:'**', redirectTo: 'home', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  // forRoot
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
