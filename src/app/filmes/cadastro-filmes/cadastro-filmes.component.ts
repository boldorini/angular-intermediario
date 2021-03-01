import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  //vindo do formbuilder, cria um formulário que é 
  //validado e manipulado pelo Angular
  //https://angular.io/api/forms/FormBuilder
  cadastro: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.cadastro = this.fb.group({
      //Validators é uma biblioteca que ajuda na validação de 
      //valores dos formulários
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: ['', [Validators.minLength(10)]],
      dtLancamento: ['', [Validators.required]],
    });
  }
}
