import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  static getValidatorErrorMessage(validatorName: any,validatorValue?: any, nameField?: string){
    const messages = {
      'required' : `จำเป็นต้องใส่ "${nameField}"`,
      'email' : `ใส่ได้เฉพาะ "${nameField}"`,
      'minlength' : `"${nameField}" จำเป็นต้องมีอย่างน้อย ${validatorValue.requiredLength} ตัว`,
      'maxlength': `"${nameField}" จำเป็นต้องมีไม่เกิน ${validatorValue.requiredLength} ตัว`
    };

    for (const [key, value] of Object.entries(messages)) {
      if (key === validatorName){
        return value;
      }
    }

    return ;
  }
}
