import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';


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
  generos: Array<string>;
  id: number;
  
  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private filmeService: FilmesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  get f() {    
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    if (this.id){
      this.filmeService.visualizar(this.id)
        .subscribe((filme: Filme) => this.criarFormulario(filme));
    } else {
      this.criarFormulario(this.criarFilmeEmBranco());
    }

    // this.cadastro = this.fb.group({
    //   //Validators é uma biblioteca que ajuda na validação de 
    //   //valores dos formulários
    //   //FORMATO
    //   // nome do campo, valor e validators em forma de array
    //   //criamos um formGroup e vamos referenciá-lo no HTML
    //   //no arquivo cadastro-filmes.component.html
    //   titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
    //   urlFoto: ['', [Validators.minLength(10)]],
    //   dtLancamento: ['', [Validators.required]],
    //   descricao:[''],
    //   notaIMDb: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
    //   urlIMDb: ['',[Validators.minLength(10)]],
    //   genero: ['',[Validators.required]]
    // });

    this.generos = ["Ação","Aventura","Romance","Terror","Ficção Científica", "Comédia", "Drama"];
  }

  private criarFormulario(filme: Filme): void{
    this.cadastro = this.fb.group({
      titulo: [filme.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [filme.urlFoto, [Validators.minLength(10)]],
      dtLancamento: [filme.dtLancamento, [Validators.required]],
      descricao:[filme.descricao],
      notaIMDb: [filme.notaIMDb, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: [filme.urlIMDb,[Validators.minLength(10)]],
      genero: [filme.genero,[Validators.required]]
    });
  }

  private criarFilmeEmBranco(): Filme{
    return{
      id: null,
      titulo: null,
      urlFoto: null,
      dtLancamento: null,
      descricao:  null,
      notaIMDb: null,
      urlIMDb: null,
      genero: null
    } as Filme;
  }

  //por padrão os métodos são publicos
  // public salvar(): void
  // salvar(): void{
  //   //esse cara dispara as validações de erro em todo
  //   //o form sem precisarmos clicar em todos
  //   this.cadastro.markAllAsTouched();
  //   if (this.cadastro.invalid){
  //     return;
  //   }
  //   alert("SUCESSO! " + JSON.stringify(this.cadastro.value,null));
  // }

  //após gerar o core/filmes.service, implementamos o método que realmente 
  //salva no nosso mock backend  
  submit(){
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid){
      return;
    }
    //getRawValue retorna os campos que existam no cadastro
    //é importante que os nomes do cadastro tenham exatamente o 
    //mesmo nome dos campos do nosso backend, logo, convertemos
    //o objeto retornado utilzando o "as Interface" 
    const filme = this.cadastro.getRawValue() as Filme;
    this.salvar(filme);
  }

  reiniciarForm():void{
    this.cadastro.reset();
  }

  private salvar(filme: Filme): void{
    this.filmeService.salvar(filme).subscribe(() => {
      //SUCESSO
      const config = {
        data: {
          btnSucesso: "Ir para listagem",
          btnCancelar: "Cadastrar um novo filme",
          corBtnCancelar: "primary",
          possuirBtnCancelar: true
        } as Alerta
      };

      const dialogRef = this.dialog.open(AlertaComponent, config);
      //esse subscribe recebe o valor que foi passado no
      //[mat-dialog-close] do html alerta.component.html      
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
          if (opcao){
            this.router.navigateByUrl("filmes");
          } else {
            this.reiniciarForm();
          }
        });
      },
      //ERRO
      () => {
        const config = {
          data: {
            titulo: "Erro ao salvar o registro!",
            mensagem: "Não foi possível salvar o registro! Tente novamente mais tarde!",
            corBtnSucesso: "warn",
            btnSucesso: "Fechar"          
          } as Alerta
        };
        this.dialog.open(AlertaComponent,config);
    });
      //FINALLY - executa sempre
      //() => {});    
    }
}
