//ng g i shared/models/filme
//normalmente, as interfaces ficam nessa pasta, models
//essa interface foi criada para padronizar o objeto
//modelo, que será utilizado no serviço core/filmes.service.ts
export interface Filme {
    //essa anotação ? deixa o campo opcional
    //esse valor opcional pq no insert ele não existe
    //e será criado automaticamente pelo método responsável
    //pela inserção

    //IMPORTANTE: esses nomes têm que ser iguais ao definido no
    //backend, no modelo.
    //Aqui estamos utilizando um json, mas esses caras tem que ter 
    //o mesmo nome do campo do BD se estivermos utilizando o mesmo
    /*
        titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
        urlFoto: ['', [Validators.minLength(10)]],
        dtLancamento: ['', [Validators.required]],
        descricao:[''],
        notaIMDb: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
        urlIMDb: ['',[Validators.minLength(10)]],
        genero: ['',[Validators.required]]
    */
    id?: number;
    titulo: string;
    urlFoto?: string;
    dtLancamento: Date;
    descricao?: string;
    notaIMDb: number;
    urlIMDb?: string;
    genero: string;
}
