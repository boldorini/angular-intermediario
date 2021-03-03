/*
  D:\Pessoal\Digital Inovation\angular-intermediario\curso-angular>ng g c shared/components/alerta
  Your global Angular CLI version (11.2.2) is greater than your local version (8.3.29). The local Angular CLI version is used.

  To disable this warning use "ng config -g cli.warnings.versionMismatch false".

  ESSE ERRO OCORRE QUANDO ELE NÃO ACHA O MÓDULO ONDE IMPORTAR, LOGO PRECISAMOS INFORMAR O MÓDULO DESEJADO
  More than one module matches. Use the skip-import option to skip importing the component into the closest module or use the
  module option to specify a module.

  D:\Pessoal\Digital Inovation\angular-intermediario\curso-angular>ng g c shared/components/alerta --skip-tests --module app
  Your global Angular CLI version (11.2.2) is greater than your local version (8.3.29). The local Angular CLI version is used.

  To disable this warning use "ng config -g cli.warnings.versionMismatch false".
  CREATE src/app/shared/components/alerta/alerta.component.html (21 bytes)
  CREATE src/app/shared/components/alerta/alerta.component.ts (271 bytes)
  CREATE src/app/shared/components/alerta/alerta.component.css (0 bytes)
  UPDATE src/app/app.module.ts (1233 bytes)

  //O --module app acrescentou essas linhas no arquivo app.module.ts
  import { AlertaComponent } from './shared/components/alerta/alerta.component';
  e no @ngModule:Declarations - AlertaComponent

  D:\Pessoal\Digital Inovation\angular-intermediario\curso-angular>
*/
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alerta } from '../../models/alerta';

@Component({
  selector: 'dio-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit {

  //por ser um componente de modal, o tratamento dos campos
  //é diferente. Não utilizamos o @Input aqui
  alerta = {
    titulo: "Sucesso",
    mensagem: "Seu registro foi cadastrado com sucesso!",
    btnSucesso: "Ok",
    corBtnSucesso: "accent",
    btnCancelar: "Cancelar",
    corBtnCancelar: "warn",
    possuirBtnCancelar: false
  } as Alerta;

  constructor(public dialogRef: MatDialogRef<AlertaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Alerta) {}

  ngOnInit(): void {
    if (this.data) {
      this.alerta.titulo = this.data.titulo || this.alerta.titulo;
      this.alerta.mensagem = this.data.mensagem || this.alerta.mensagem;
      this.alerta.btnSucesso = this.data.btnSucesso || this.alerta.btnSucesso;
      this.alerta.corBtnSucesso = this.data.corBtnSucesso || this.alerta.corBtnSucesso;
      this.alerta.btnCancelar = this.data.btnCancelar || this.alerta.btnCancelar;
      this.alerta.corBtnCancelar = this.data.corBtnCancelar || this.alerta.corBtnCancelar;
      this.alerta.possuirBtnCancelar = this.data.possuirBtnCancelar || this.alerta.possuirBtnCancelar;
    }    
  }

}
