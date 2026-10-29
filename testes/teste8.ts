//@ts-nocheck
teste


// 1. Tipo da função que vai tratar a restrição de edição/exclusão das Entidades
type FuncaoTratamento = (id: number, campo: string, valor: any) => boolean;

// 2. Define quais Campos e suas respectivas funções tratarão dos detalhes da Edição
function definirCamposComRestricaoNaEdicao(): Record<string, Record<string, FuncaoTratamento>> {
  const camposComEdicaoRestrita: Record<string, Record<string, FuncaoTratamento>> = {
    Cliente: {
      id: (id, campo, valor) => false, // Bloqueia alteração de ID
      email: (id, campo, valor) => true // Permite (inserir lógica de validação aqui)
    },
    Produto: {
      id: (id, campo, valor) => false,
      qtdeEstoque: (id, campo, valor) => true
    },
    Pedido: {
      id: (id, campo, valor) => false,
      clienteId: (id, campo, valor) => {
        console.log(`Não é permitido alterar o cliente de um pedido existente.`);
        return false; // Retorna false para BLOQUEAR a edição
      }
    }
  };

  return camposComEdicaoRestrita;
}

// 3. Executa a busca e retorna uma função válida (ou uma função padrão que permite o fluxo)
function executarFuncaoNaEdicaoDoCampo(tipoEntidadeStr: string, campoDoTipoDaEntidade: string): FuncaoTratamento {
  const recordDeRestricoes = definirCamposComRestricaoNaEdicao();
  const restricoesDaEntidade = recordDeRestricoes[tipoEntidadeStr];

  // Se a entidade não tiver restrições cadastradas, assume que a edição é permitida
  if (!restricoesDaEntidade) {
    return () => true; 
  }

  // Se o campo não tiver restrição específica, assume que a edição é permitida
  const funcaoTratamentoEspecifica = restricoesDaEntidade[campoDoTipoDaEntidade];
  if (!funcaoTratamentoEspecifica) {
    return () => true; 
  }

  return funcaoTratamentoEspecifica;
}

// --- Exemplo de Uso ---
const entidade = { id: 10 };
const chave = "clienteId";
const numeroConvertido = 42;

// Cenário de teste: Pedido -> clienteId (Vai disparar o console.log e retornar false)
const funcaoEditar = executarFuncaoNaEdicaoDoCampo("Pedido", chave);

// Só prossegue com a edição se a função retornar TRUE
if (funcaoEditar(entidade.id, chave, numeroConvertido)) {
  console.log("Edição permitida e executada com sucesso!");
} else {
  console.log("Edição bloqueada pelas regras de restrição.");
}




valor declarado e não usado, como fazer? e como retornar true se o tipo FuncaoTratamento não aceita

function getClienteByEmail(valor){
    //só para teste
    return true;
}

type FuncaoTratamento = (id: number, campo: string, valor: any) => boolean;

function verificarSeHaverahDoisEmaislAntesDaEdicao(id: number, campo: string, valor: any){

    const clienteEncontrado = getClienteByEmail(valor);
    if (clienteEncontrado) {
        const msgErro=`\n❌ E-mail já está em uso pelo cliente com o ID: ${clienteEncontrado.id}`;
        console.log(msgErro,);
        return false;
    }
    return true;

}







//tipo da função que vai tratar a restrição de edição|exclusão das Entidades
type FuncaoTratamento = (id:number, campo: string, valor: any)  => (boolean);


function verificarSeHaverahDoisEmaislAntesDaEdicao(id: number, campo: string, valor: any):boolean{

    console.log("verificarSeHaverahDoisEmaislAntesDaEdicao------------");
    console.log("valor=>",valor,"<=");
    const clienteEncontrado = getClienteByEmail(valor);
    console.log("clienteEncontrado",clienteEncontrado);
    
    if (clienteEncontrado) {
        const msgErro=`\n❌ E-mail já está em uso pelo cliente com o ID: ${clienteEncontrado.id}`;
        console.log(msgErro,);
        return false;
    }
    return true;


}


// Define quais Campos e suas respectivas funções que tratarão dos detalhes da Edição 
function definirFuncaoEspecificaNaEdicaoDoCampo(): Record<string, Record<string, FuncaoTratamento>> {
    const camposComEdicaoRestrita: Record<string, Record<string, FuncaoTratamento>> = {
        Cliente: {
            id: (id, campo, valor)  => {return false;},
            email:(id, campo, valor)  => {verificarSeHaverahDoisEmaislAntesDaEdicao},
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
