
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
type PerguntasRespostas = {
    pergunta:string
    numTentativa:number
    msgErro:string
    msgAcerto:string
}

export type {   
    Cliente,
    Produto,
    ItemPedido,
    Pedido,
    OpcaoMenu
}