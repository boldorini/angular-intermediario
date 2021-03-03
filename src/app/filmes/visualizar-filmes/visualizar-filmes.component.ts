import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {
  filme: Filme;
  id: number;
  readonly semFoto = 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Svg_image.svg';

  constructor(public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private filmesService: FilmesService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  excluir(): void{    
    const config = {
      data: {
        titulo: "Você tem certeza que deseja excluir?",
        mensagem: "Caso queria mesmo excluir, clique no botão OK",
        possuirBtnCancelar: true
      } as Alerta
    };

    const dialogRef = this.dialog.open(AlertaComponent, config);
    //esse subscribe recebe o valor que foi passado no
    //[mat-dialog-close] do html alerta.component.html      
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao){
        this.filmesService.excluir(this.id).subscribe(() => this.router.navigateByUrl("/filmes"));
      }
    });
  }
  
  editar(): void{
    this.router.navigateByUrl("/filmes/cadastro/" + this.id);
  }

  private visualizar(): void{
    this.filmesService.visualizar(this.id).subscribe((filme: Filme) => {
      this.filme = filme;
    });
  }

}
