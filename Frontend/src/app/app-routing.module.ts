import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/_services/auth.guard';
import { CallbackComponent } from './modules/callback/callback.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'callback', component: CallbackComponent },
  {
    path: 'admin',
    loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
    canActivate: [AuthGuard]
  },
  { path:'**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
