type Cliente = {
    tipo: 'cliente'; // Propriedade discriminadora fixa
    id: number;
    nome: string;
    email: string;
}

type Produto = {
    tipo: 'produto'; // Propriedade discriminadora fixa
    id: number;
    categoria: string;
    nome: string;
    preco: number;
    qtdeEstoque: number;
    visivel: boolean;
}

type Entidades = Cliente | Produto | undefined;

function nomeDasEntidades(entidade: Entidades): string {
    // 1. Tratamento prévio caso seja undefined
    if (!entidade) {
        return "Nenhuma entidade (undefined)";
    }

    // 2. O switch analisa a propriedade 'tipo'
    switch (entidade.tipo) {
        case 'cliente':
            // Aqui dentro, o TS sabe que 'entidade' é estritamente um Cliente
            return `Cliente (E-mail: ${entidade.email})`;
            
        case 'produto':
            // Aqui dentro, o TS sabe que 'entidade' é estritamente um Produto
            return `Produto (Preço: R$ ${entidade.preco})`;
            
        default:
            // Caso caia aqui, significa que um tipo não mapeado foi passado
            return "Entidade desconhecida";
    }
}


