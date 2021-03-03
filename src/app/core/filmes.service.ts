import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigParams } from '../shared/models/config-params';
import { Filme } from '../shared/models/filme';
import { ConfigParamsService } from './config-params.service';

const url = "http://localhost:3000/filmes/"

@Injectable({
  providedIn: 'root'
})
export class FilmesService {
  
  constructor(private http: HttpClient,
              private configParamsService: ConfigParamsService) { }

  salvar(filme: Filme): Observable<Filme>{
    return this.http.post<Filme>(url, filme);
  }

  editar(filme: Filme): Observable<Filme>{
    return this.http.put<Filme>(url + filme.id, filme);
  }

  //listar(pagina: number, qtdeRegistrosPorPagina: number, texto: string, genero: string): Observable<Filme[]>{
  listar(configParams: ConfigParams): Observable<Filme[]>{
    // let httpParams = new HttpParams();
    // httpParams = httpParams.set("_page", configParams.pagina.toString());
    // httpParams = httpParams.set("_limit", configParams.limite.toString());
    // httpParams = httpParams.set("_sort", 'id');
    // httpParams = httpParams.set("_order", 'desc');
    // if (configParams.pesquisa) {
    //   httpParams = httpParams.set("q", configParams.pesquisa);
    // }
    // if (configParams.campo) {
    //   httpParams = httpParams.set(configParams.campo.tipo, configParams.campo.valor);
    // }
    //extraído para config-params.service
    const config = this.configParamsService.configurarParametros(configParams);
    return this.http.get<Filme[]>(url,{params: config});
  }

  visualizar(id: number): Observable<Filme>{
    return this.http.get<Filme>(url + id);
  }

  excluir(id: number):Observable<void> {
    return this.http.delete<void>(url + id);
  }
}