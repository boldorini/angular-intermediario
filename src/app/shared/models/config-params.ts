import { CampoGenerico } from "./campo-generico";

//ng g i shared/models/configParams
export interface ConfigParams {
    pagina?:number;
    limite?:number;
    pesquisa?:string;
    campo?:CampoGenerico;
}
