//types.functions.ts :: contem funções relativas aos Types

//define os campos que precisam ser numéricos Inteiros
function definirCamposNumerosInteiros(): Record<string, string[]> {
    const camposNumerosInteiros: Record<string, string[]> = {
        Cliente: ['id'],
        Produto: ['id', 'qtdeEstoque'],
        Pedido: ['id', 'clienteId'],
        ItemPedido: ['id', 'produtoId'] // Se houver algum
    };
    return camposNumerosInteiros;
}

//define as os campos 

/*
function definirCamposComRestricaoNaEdicao(): Record<string, Record<string, FuncaoTratamento>> {
    const camposComEdicaoRestrita: Record<string, Record<string, FuncaoTratamento>> = {
        Cliente: {
            id: tratarIdNaoEditavel
        },
        Produto: {
            id: tratarIdNaoEditavel,
            qtdeEstoque: tratarEstoqueApenasPorMovimentacao
        },
        Pedido: {
            id: tratarIdNaoEditavel,
            clienteId: (campo, valor) => console.log(`Não é permitido alterar o cliente de um pedido existente.`)
        }
    };
    return camposComEdicaoRestrita;
}
*/
export  {   

    definirCamposNumerosInteiros
}

