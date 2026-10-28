//types.functions.ts :: contem funções relativas aos Types

import type { Entidades,FuncaoTratamento } from "./types";

/////////////////////////////////////////////
//          Funções de Definição
/////////////////////////////////////////////

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



// Define quais Campos e suas respectivas funções que tratarão dos detalhes da Edição 
function definirCamposComRestricaoNaEdicao(): Record<string, Record<string, FuncaoTratamento>> {
    const camposComEdicaoRestrita: Record<string, Record<string, FuncaoTratamento>> = {
        Cliente: {
            id: (id, campo, valor)  => {return false;},
            email:(id, campo, valor)  => {return true;} //verificarSeHaverahDoisEmaislAntesDaEdicao}
        },
        Produto: {
            id:(id, campo, valor)  => {return false;},
            qtdeEstoque: (id, campo, valor)  => {return true;}
        },
        Pedido: {
            id: (id, campo, valor)  => {return false;},
            clienteId: (id, campo, valor) => {console.log(`Não é permitido alterar o cliente de um pedido existente.`); return false;}
        }
    };
    return camposComEdicaoRestrita;
}





/////////////////////////////////////////////
//          Funções de Verificação
/////////////////////////////////////////////
function ifPrecisaSerInteiroPositivo(tipoEntidadeStr: string,campoDoTipoDaEntidade: string):boolean{

    const recordDeEntidadesComCamposNumberInteiros: Record<string, string[]> =   definirCamposNumerosInteiros();
    const camposNumberInteirosDaEntidade = recordDeEntidadesComCamposNumberInteiros[tipoEntidadeStr] || [];
    const precisaSerInteiroPositivo = camposNumberInteirosDaEntidade.includes(campoDoTipoDaEntidade);

    return precisaSerInteiroPositivo
}




/////////////////////////////////////////////
//      Funções de Inserção de dados
/////////////////////////////////////////////



/////////////////////////////////////////////
//          Funções de Busca
/////////////////////////////////////////////
function getFuncaoEspecificaNaEdicaoDoCampo(tipoEntidadeStr: string,campoDoTipoDaEntidade: string):FuncaoTratamento {

    const recordDeRestricoes = definirCamposComRestricaoNaEdicao();
    const restricoesDaEntidade = recordDeRestricoes[tipoEntidadeStr] ;
    // Se a entidade não tiver restrições cadastradas, assume que a edição é permitida
    if (!restricoesDaEntidade) {
        return ()=>true; 
    }
    const funcaoTratamentoEspecifica = restricoesDaEntidade[campoDoTipoDaEntidade] ;
    // Se o campo não tiver restrição específica, assume que a edição é permitida
    if (!funcaoTratamentoEspecifica) {
        return ()=>true; 
    }
    return funcaoTratamentoEspecifica;


}

/////////////////////////////////////////////
//          Funções de Edição 
/////////////////////////////////////////////



/////////////////////////////////////////////
//          Funções de Exclusão 
/////////////////////////////////////////////



////////////////////////////////////////////////////////////
//    Funções de interação com usuário (se usa console.log)
//                 camada view
///////////////////////////////////////////////////////////








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

    definirCamposNumerosInteiros, ifPrecisaSerInteiroPositivo , getFuncaoEspecificaNaEdicaoDoCampo
}

