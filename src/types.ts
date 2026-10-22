
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
type OpcaoMenu = [number, string, () => void];

export type {   
    Cliente,
    Produto,
    OpcaoMenu
}