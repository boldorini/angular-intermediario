import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'dio-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent{

  @Input() titulo: string;
  @Input() controlName: string;
  @Input() formGroup: FormGroup;  

  constructor(public validacao: ValidarCamposService) { }

  /*
    a validação dos elementos quanto aos erros agora está
    relacionado com as validações que temos ts do componente para
    cada controle.
    Ou seja, essa verificação ficou dinâmica.
  */
  get formControl():AbstractControl{
    return this.formGroup.controls[this.controlName];
  }
}
