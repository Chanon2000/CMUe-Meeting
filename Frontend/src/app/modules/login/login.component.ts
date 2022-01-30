import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  loginForm?: FormGroup;
  submitted = false;

  // apiUrl:string = "http://localhost:3000"

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private messageService: MessageService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  get f(){
    return this.loginForm?.controls;
  }


  onLogin() {
    this.submitted = true;
    if(this.loginForm?.invalid) {
      this.messageService.add({key:'alertLogin', severity:'warn', summary: 'แจ้งเตือน', detail: 'กรุณากรอกอีเมลและรหัสผ่าน'});
      return;
    }

    this.usersService.loginUser(this.loginForm?.value).subscribe((data:any)=> {
      if(data.status === 'success'){
        localStorage.setItem('userDetailToken', JSON.stringify(data.data.user));
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('login', 'true');
        this.messageService.add({key:'alertLogin', severity:'success', summary:'เข้าสู่ระบบสำเร็จ' })
        // this.userVerify();
        setTimeout(() => {
          this.router.navigate(['/admin/home']);
        }, 2000);
      }else{
        this.messageService.add({key:'alertLogin', severity:'error', summary:'เข้าสู่ระบบไม่สำเร็จ' })
        alert('error');
      }
    },(err:any) => {
      this.messageService.add({ 
        key:'alertLogin', 
        severity:'error', 
        summary:'เข้าสู่ระบบไม่สำเร็จ'
      });
    });
    
  }

}
