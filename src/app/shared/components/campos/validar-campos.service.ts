import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

//significa que esse serviço foi injetado diretamente no root
//o root é a parte principal do sistema, isso significa que
//em qq local que eu estiver do sistema, posso acessar os
//serviços desse módulo
@Injectable({
  providedIn: 'root'
})
export class ValidarCamposService {

  constructor() { }

  hasErrorValidate(control: AbstractControl, errorName: string): boolean{
    if ((control.dirty || control.touched) && this.hasError(control, errorName)){
      return true;
    }    
    return false;
  }

  hasError(control: AbstractControl, errorName: string): boolean{
    return control.hasError(errorName);
  }

  lengthValidar(control: AbstractControl, errorName: string): number{
    const error = control.errors[errorName];
    return error.requiredLength || error.min || error.max || 0;
  }
}
