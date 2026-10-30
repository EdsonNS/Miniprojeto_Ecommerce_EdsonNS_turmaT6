//types.ts: definição dos tipos utilizados pelo sistema

//Union Types (Tipos de União). Para juntar vários tipos possíveis em um único tipo, 
// utiliza-se o caractere barra vertical (|).
type Entidades = (Cliente | Produto | Carrinho | ItemCarrinho | undefined);

type Cliente = {
    nomeEntidade: 'Cliente';
    //Propriedade Discriminadora (Tagged Union), usada para saber o type quando usado em Entidades
    id:number;
    nome:string;
    email:string;
    visivel:boolean //indica que foi excluído
    bloqueioEdicao:boolean //se editar o Carrinho ficará órfão
}

type Produto = {
    nomeEntidade: 'Produto';//Propriedade Discriminadora (Tagged Union)
    id: number
    categoria: string
    nome: string
    preco: number
    qtdeEstoque: number
    visivel:boolean //indica que foi excluído  
    bloqueioEdicao:boolean //se editar o Carrinho ficará órfão
}

type ItemCarrinho = {
    nomeEntidade: 'ItemCarrinho';//Propriedade Discriminadora (Tagged Union)
    id: number,    
    itemCarrinhoEsgotado: boolean
    produtoId: number
    produtoCategoria: string
    produtoNome: string
    produtoPrecoUnitario: number
    carrinhoId: number
}

type EstatusCarrinho =
  'Carrinho vazio' 
| 'Carrinho em uso' 
| 'Carrinho excluido' 
| 'Carrinho fechado' //'Pedido concluído'
| 'Carrinho Cancelado' //'Pedido cancelado'

type Carrinho = {
    nomeEntidade: 'Carrinho';//Propriedade Discriminadora (Tagged Union)
    id: number
    clienteNome:string //preserva se mudarem ou excluirem o nome
    clienteEmail:string //preserva se mudarem ou excluirem o nome
    carrinhoValorTotal:number
    carrinhoQtdeItens:number
    carrinhoData:Date
    carrinhoStatus: EstatusCarrinho
}

//declara qual função que vai tratar a restrição de edição|exclusão das Entidades
type FuncaoTratamento = (id:number, campo: string, valor: any)  => (boolean);

// Definição do tipo: um array contendo [número, texto, função]
type OpcaoMenu = [number, string, () => (void|boolean)];

// Definição do tipo: interação com o usuário
//type PerguntasRespostas = {
type PerguntasRespostas<TArgs extends any[] = any[], TReturn = any> = {
    idPergunta:number
    pergunta:string
    resposta:string
    numTentativa:number    
    msgErro:string
    msgAcerto:string            
    //funcaoValidadora:(minhaVar:(string | null | undefined),msgErro:(string | null | undefined))=>(boolean)
    //funcaoValidadora: (...args: TArgs) => TReturn; // Aceita qualquer assinatura de função
    funcaoValidadora: (...args: any[]) => (boolean); // Aceita qualquer assinatura de função
    retornoFuncao:boolean
}


///////////////////////////////////////////////////////
//                 EXPORTAÇÔES
///////////////////////////////////////////////////////

export type {   
    Entidades,
    Cliente,
    Produto,
    OpcaoMenu,
    PerguntasRespostas,
    FuncaoTratamento,
    EstatusCarrinho,
    Carrinho,
    ItemCarrinho
    
}

