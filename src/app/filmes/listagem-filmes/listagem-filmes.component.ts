import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { debounceTime } from 'rxjs/operators';

import { FilmesService } from 'src/app/core/filmes.service';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {
  readonly semFoto = 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Svg_image.svg';
  
  // readonly qtdeRegistrosPorPagina = 4;
  // pagina = 1;
  // texto: string;
  // genero: string;
  //esses caras foram substituídos por uma interface
  configParams: ConfigParams = {
    pagina: 1,
    limite: 4
  };
  filmes: Filme[] = [];  
  filtrosListagem: FormGroup;
  generos: Array<string>;
  

  constructor(private filmesService: FilmesService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.listarFilmes();
    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });

    this.filtrosListagem.get('texto').valueChanges
    //debounceTime acrescenta um tempo para requisitar novamente a consulta no backend
    .pipe(debounceTime(400))
    .subscribe((val:string) => {
      this.configParams.pesquisa = val;
      this.resetarConsulta();

    });

    this.filtrosListagem.get('genero').valueChanges.subscribe((val:string) => {
      this.configParams.campo = {tipo: 'genero', valor: val};
      this.resetarConsulta();
    });

    this.generos = ["Ação","Aventura","Romance","Terror","Ficção Científica", "Comédia", "Drama"];
  }

  onScroll(): void{    
    this.configParams.pagina++;
    this.listarFilmes();    
  }

  abrir(id: number): void{
    const filme = this.router.navigateByUrl('/filmes/' + id);
  }

  private listarFilmes(): void{
    this.filmesService.listar(this.configParams).subscribe(
      (filmes: Filme[]) => {
        this.filmes.push(...filmes);
      }
    );
  }

  private resetarConsulta():void{
    this.configParams.pagina = 1;
    this.filmes = [];
    this.listarFilmes();
  }
}
