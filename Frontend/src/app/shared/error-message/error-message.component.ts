import { Component, Input, OnInit } from '@angular/core';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {
  @Input() control?:any;
  @Input() nameField?:any;
  @Input() submitted?:any;

  message: any;

  constructor() { }

  ngOnInit(): void {
    this.message = this.errorMessage()
    this.control.valueChanges.subscribe((value:any) => {
      this.message = this.errorMessage()
    })
  }

  errorMessage(){
    for(let propertyName in this.control?.errors){ // call service if control has error
      if(this.control?.errors.hasOwnProperty(propertyName)){
        return ValidationService.getValidatorErrorMessage(propertyName, this.control?.errors[propertyName], this.nameField)
        // , this.nameFieldConfirm
      }
    }
    return null;
  }

}
