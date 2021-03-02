import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'dio-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent implements OnInit {

  @Input() titulo: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;

  constructor(public validacao: ValidarCamposService) { }

  /*
    a validação dos elementos quanto aos erros agora está
    relacionado com o ngInit do componente, onde especificamos
    quais são as validações que serão feitas, referente aos campos.
    Ou seja, essa verificação ficou dinâmica.
  */
  get formControl():AbstractControl{
    return this.formGroup.controls[this.controlName];
  }

  ngOnInit(): void {
  }

}
