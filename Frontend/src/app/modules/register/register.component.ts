import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { UsersService } from 'src/app/services/users.service';
// import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  signUpForm?: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.initForm();
  }

  get f() {
    return this.signUpForm?.controls;
  }


  initForm() {
    this.signUpForm = new FormGroup({
      prename: new FormControl(null, [Validators.required]),
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      passwordConfirm: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
    // this.signUpForm?.setValidators([ MustMatch('Password', 'passwordConfirm') ]);
  }

  onSubmit() {
    this.submitted = true;
    if (this.signUpForm?.invalid) {
      this.messageService.add({key:'alertSignup', severity:'warn', summary: 'แจ้งเตือน', detail: 'กรุณากรอกข้อมูลส่วนตัวใหม่'});
      return;
    }

    this.usersService.signUpMember(this.signUpForm?.value).subscribe(
      (res:any) => {
        if (res.status === 'success') {
          this.showSuccess('ลงทะเบียนเรียบร้อยแล้ว');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
      },
      (error:any) => {
        this.showError(error.error.message);
      }
    );
  }

  onCancel() {

  }


  /////////////////// Toast ////////////////////
  showError(message: string) {
    this.messageService.add({key: 'alertSignup',severity: 'error', summary: 'Error', detail: message});
  }

  showSuccess(message: string) {
    this.messageService.add({key: 'alertSignup',severity: 'success', summary: 'Success', detail: message});
  }

}
