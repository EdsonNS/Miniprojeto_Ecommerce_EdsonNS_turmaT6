
//types.ts: definição dos tipos utilizados pelo sistema

type Cliente = {
    id:number
    nome:string
    email:string
}

type Produto = {
    id: number
    nome: string
    categoria: string
    preco: number
    qtdeEstoque: number
    visivel:boolean //excluído mas 
}

type ItemPedido = {
    produtoId: number
    qtdeComprada:number
    valorUnitario:number
}

type Pedido = {
    id: number
    clienteId: number
    itens:ItemPedido[]
    valorTotal:number
    data:Date
}

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

export type {   
    Cliente,
    Produto,
    ItemPedido,
    Pedido,
    OpcaoMenu,
    PerguntasRespostas
}