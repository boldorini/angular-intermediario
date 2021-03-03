import { AbstractControl, FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'dio-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css']
})
export class InputDateComponent{

  @Input() titulo: string;
  @Input() controlName: string;
  @Input() formGroup: FormGroup;  

  constructor(public validacao: ValidarCamposService) { }

  get formControl():AbstractControl{
    return this.formGroup.controls[this.controlName];
  }

}
