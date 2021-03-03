import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'dio-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css']
})
export class InputNumberComponent{
  //https://angular.io/guide/inputs-outputs
  //documentação sobre Input e Output
  @Input() titulo: string;
  @Input() controlName: string;
  @Input() formGroup: FormGroup;
  @Input() minimo = 0;
  @Input() maximo = 10;
  @Input() passo = 1;

  //NÃO ESQUECER DO PUBLIC AQUI JUMENTOOOO
  constructor(public validacao: ValidarCamposService) { }

  get formControl():AbstractControl{
    return this.formGroup.controls[this.controlName];
  }

}
