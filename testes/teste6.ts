type Produto = { 
    nomeEntidade: "Produto"; // Propriedade Discriminadora
    id: number;
    categoria: string; 
    nome: string; 
    preco: number; 
    qtdeEstoque: number; 
    visivel: boolean; 
};

type Entidades = Produto; // Adicione Cliente, Pedido, etc. conforme seu código

// 1. Definimos o tipo da função que vai tratar a restrição
type FuncaoTratamento = (campo: string, valor: any) => void;

// Funções específicas de tratamento
const tratarIdNaoEditavel: FuncaoTratamento = (campo, valor) => {
    console.log(`[Erro] O campo '${campo}' é a chave primária e não pode ser alterado! Valor tentado: ${valor}`);
};

const tratarEstoqueApenasPorMovimentacao: FuncaoTratamento = (campo, valor) => {
    console.log(`[Aviso] O campo '${campo}' não pode ser editado diretamente. Use a função de entrada/saída de estoque. Valor tentado: ${valor}`);
};

// 2. Mudamos o retorno para mapear: Entidade -> (Campo -> Função Específica)
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

function definirCamposNumerosInteiros(): Record<string, string[]> {
    return {
        Cliente: ['id'],
        Produto: ['id', 'qtdeEstoque'],
        Pedido: ['id', 'clienteId']
    };
}

function editarEntidade(entidade: Entidades): void {
    const tipoEntidade = entidade.nomeEntidade; // Ex: "Produto"
    
    // Configurações de Inteiros (Seu código original)
    const recordDeEntidadesComCamposNumberInteiros = definirCamposNumerosInteiros();
    const camposNumberInteirosDaEntidade = recordDeEntidadesComCamposNumberInteiros[tipoEntidade] || [];

    // Configurações de Restrições (Nova abordagem)
    const recordDeRestricoes = definirCamposComRestricaoNaEdicao();
    const restricoesDaEntidade = recordDeRestricoes[tipoEntidade] || {};

    for (const chave in entidade) {
        if (!entidade.hasOwnProperty(chave)) continue;
        
        const valorAtual = (entidade as any)[chave];

        // 1. Sua validação antiga de inteiros
        const precisaSerInteiroPositivo = camposNumberInteirosDaEntidade.includes(chave);
        if (precisaSerInteiroPositivo) {
            // Seu tratamento de inteiro positivo aqui...
        }

        // 2. Nova validação: Verifica se o campo possui uma função restrita mapeada
        const funcaoTratamentoEspecifica = restricoesDaEntidade[chave];
        
        if (funcaoTratamentoEspecifica) {
            // Executa a função específica passando o nome do campo e o valor
            funcaoTratamentoEspecifica(chave, valorAtual);
        }
    }
}
