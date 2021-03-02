import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';


@Component({
  //padrão de construção de nomes de selector
  //acrescenta-se na frente um identificador do
  //projeto
  //Ex: dio-cadastro-filmes
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  //vindo do formbuilder, cria um formulário que é 
  //validado e manipulado pelo Angular
  //https://angular.io/api/forms/FormBuilder
  cadastro: FormGroup;
  
  constructor(
    public validacao: ValidarCamposService,
    private fb: FormBuilder
  ) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.cadastro = this.fb.group({
      //Validators é uma biblioteca que ajuda na validação de 
      //valores dos formulários
      //FORMATO
      // nome do campo, valor e validators em forma de array
      //criamos um formGroup e vamos referenciá-lo no HTML
      //no arquivo cadastro-filmes.component.html
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: ['', [Validators.minLength(10)]],
      dtLancamento: ['', [Validators.required]],
      descricao:[''],
      notaIMDb: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['',[Validators.minLength(10)]],
      genero: ['',[Validators.required]]

    });
  }


  //por padrão os métodos são publicos
  // public salvar(): void
  salvar(): void{
    //esse cara dispara as validações de erro em todo
    //o form sem precisarmos clicar em todos
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid){
      return;
    }
    alert("SUCESSO! " + JSON.stringify(this.cadastro.value,null));
  }

  reiniciarForm():void{
    this.cadastro.reset();
  }
}
