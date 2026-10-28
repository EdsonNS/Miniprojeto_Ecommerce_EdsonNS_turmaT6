//types.ts: definição dos tipos utilizados pelo sistema

//Union Types (Tipos de União). Para juntar vários tipos possíveis em um único tipo, 
// utiliza-se o caractere barra vertical (|).
type Entidades = Cliente | Produto | ItemPedido | Pedido | undefined;


type Cliente = {
    nomeEntidade: "Cliente";
    //Propriedade Discriminadora (Tagged Union), usada para saber o type quando usado em Entidades
    id:number;
    nome:string;
    email:string;
}

type Produto = {
    nomeEntidade: "Produto";//Propriedade Discriminadora (Tagged Union)
    id: number
    categoria: string
    nome: string
    preco: number
    qtdeEstoque: number
    visivel:boolean //indica que foi excluído  
}

type ItemPedido = {
    nomeEntidade: "ItemPedido";//Propriedade Discriminadora (Tagged Union)
    id: number
    produtoId: number
    qtdeComprada:number
    valorUnitario:number
    indisponivel:boolean
}

type Pedido = {
    nomeEntidade: "Pedido";//Propriedade Discriminadora (Tagged Union)
    id: number
    clienteId: number
    itens:ItemPedido[]
    valorTotal:number
    data:Date
    finalizado:boolean
}

//tipo da função que vai tratar a restrição de edição|exclusão das Entidades
type FuncaoTratamento = (campo: string, valor: any) => void;

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
    Entidades,
    Cliente,
    Produto,
    ItemPedido,
    Pedido,
    OpcaoMenu,
    PerguntasRespostas,
    
}

