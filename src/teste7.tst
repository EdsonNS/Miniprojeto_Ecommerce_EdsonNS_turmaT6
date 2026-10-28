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
type FuncaoTratamento = (id:number, campo: string, valor: any)  => (boolean);

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
            clienteId: (id, campo, valor) => {console.log(`Não é permitido alterar o cliente de um pedido existente.`); return true;}
        }
    };
    return camposComEdicaoRestrita;
}

function executarFuncaoNaEdicaoDoCampo(tipoEntidadeStr: string,campoDoTipoDaEntidade: string){

    const recordDeRestricoes = definirCamposComRestricaoNaEdicao();
    const restricoesDaEntidade = recordDeRestricoes[tipoEntidadeStr] ;
    if (!restricoesDaEntidade) {
        return null; 
    }
    const funcaoTratamentoEspecifica = restricoesDaEntidade[campoDoTipoDaEntidade] || {};

    return funcaoTratamentoEspecifica;


}

const funcaoEditar = executarFuncaoNaEdicaoDoCampo("x","y" );
if (funcaoEditar(entidade.id, chave, numeroConvertido)){
        console.log("teste");
    }
          


///////////////////////////////////////////////////////
//            Busca pelo ID - EDITAR depois de localizar
///////////////////////////////////////////////////////

function editarEntidade(entidade: Entidades): void {
  if (!entidade) {
    console.log("❌ Nenhuma entidade válida foi fornecida para edição.");
    return;
  }

  console.log(
    `\n--- Editando: ${entidade.nomeEntidade.toUpperCase()} (ID: ${entidade.id}) ---`,
  );
  console.log(
    "\nInstruções: Pressione [Enter] sem digitar nada para manter o valor atual.\n",
  );

  //  Loop por todas as chaves do objeto
  for (const chave in entidade) {

    // Evita ler propriedades herdadas do protótipo
    if (!Object.prototype.hasOwnProperty.call(entidade, chave)) continue;

    // Bloqueio de propriedades protegidas
    if (chave === "id" || chave === "nomeEntidade") {
      //console.log(`🔒 [${chave}]: ${entidade[chave as keyof typeof entidade]} (Não pode ser alterado)`);
      continue;
    }

    // Pega o valor atual de forma segura
    const valorAtual = entidade[chave as keyof typeof entidade];
    //Se a entidade que está sendo editada for o Cliente
    //const valorAtual = entidade[chave as 'tipo' | 'id' | 'nome' | 'email']
    /*
    No JavaScript puro, se você fizer entidade[chave], o código funciona perfeitamente. 
    Porém, o TypeScript é rígido. Como a variável chave vem de um loop for...in, o TypeScript
     a enxerga apenas como uma string genérica.
    O TypeScript reclama dizendo: "Eu não posso deixar você acessar entidade[chave], 
    porque chave pode ser qualquer texto (como 'banana'), e o objeto Cliente ou 
    Produto não tem uma propriedade chamada 'banana'."

    . Desestruturando a sintaxe: as keyof typeof entidade

    • typeof entidade: Descobre o tipo dinâmico do objeto naquele momento. Se o objeto atual 
    for um Cliente, isso vira o tipo Cliente. Se for um Produto, vira o tipo Produto.
    • keyof ...: Extrai uma lista com os nomes de todas as propriedades (chaves) permitidas para aquele tipo.
        • Se for Cliente, o keyof resulta em: 'tipo' | 'id' | 'nome' | 'email'.
        • Se for Produto, resulta em: 'tipo' | 'id' | 'categoria' | 'nome' | 'preco' | 'qtdeEstoque' | 'visivel'.
    • as (Type Assertion / Asserção de Tipo): É a palavra que usamos para forçar um tipo.
     Você está dizendo: "TypeScript, force a variável chave a ser interpretada estritamente como 
     uma das opções dessa lista de propriedades válidas".
        
    */
    //-------------------------
    //  TRATA CAMPOS BOOLEANOS
    //-------------------------
    let msgPrompt: string = "";
    const respFalse = ["false", "f", "0", "no", "n"];
    const respTrue = ["true", "t", "1", "yes", "s"];
    if (typeof valorAtual === "boolean") {
      msgPrompt = "Instruções: \nAceita respostas:" + respFalse + " como NÃO ou DESATIVADO";
      msgPrompt += "\nAceita respostas:" + respTrue + " como SIM ou ATIVADO\n";
    }

    //-------------------------
    //  CAPTURA (LÊ) O VALOR
    //-------------------------

    // Captura a resposta do usuário
    console.log(msgPrompt);
    const resposta = String(
      prompt(
        ` Digite um conteúdo para [${chave}] (Conteúdo atual: ${valorAtual}): `,
      ),
    );

    // Se o usuário apenas apertou Enter, mantém o valor original
    if (resposta === null || resposta.trim() === "") {
      continue;
    }

    //-------------------------
    //  TRATA CAMPOS NUMÉRICOS
    //-------------------------
    // Conversão e validação de tipos baseada no valor original
    if (typeof valorAtual === "number") {

      //------------------------------------
      //  TRATA CAMPOS NUMÉRICOS - INTEIROS
      //------------------------------------
      const precisaSerInteiroPositivo = ifPrecisaSerInteiroPositivo( entidade.nomeEntidade, chave);
      if (precisaSerInteiroPositivo) {
        if (ehInteiroMaiorOuIgualaZero(resposta)) {
          const numeroConvertido = Number(resposta);
          
          const funcaoEditar = executarFuncaoNaEdicaoDoCampo(entidade.nomeEntidade, chave );
          const resultadoDaFuncao:boolean = funcaoEditar(entidade.id, chave, numeroConvertido);
          if (resultadoDaFuncao){
            (entidade as any)[chave] = numeroConvertido;
          }
          


        } else {
          console.log(
            `⚠️ Valor inválido para número inteiro e positivo. Mantendo: ${valorAtual}`,
          );
        }
      } 
      //------------------------------------
      //  TRATA CAMPOS NUMÉRICOS - FRACIONÁRIOS
      //------------------------------------
      else {
        // Trata como número decimal comum, podendo ter vírgula (fracionário)
        const novoNumero = Number(resposta);
        if (!isNaN(novoNumero)) {
          (entidade as any)[chave] = novoNumero;
          /*         
                A expressão (entidade as any)[chave] = novoNumero; (e as similares logo abaixo dela)
                é um artifício usado para burlar temporariamente a rigidez do TypeScript, 
                permitindo que você grave um novo valor dentro do objeto sem que o 
                compilador aponte um erro de tipo
                */
        } else {
          console.log(`⚠️ Valor inválido para número. Mantendo: ${valorAtual}`);
        }
      }
    } 
    //-------------------------
    //  TRATA CAMPOS BOOLEANOS
    //-------------------------
    
    else if (typeof valorAtual === "boolean") {
      // Aceita 'true', 't', '1', 'sim', 's' como verdadeiro
      const respostaLower = resposta.toLowerCase().trim();
      if (respFalse.includes(respostaLower)) {
        (entidade as any)[chave] = false;
      } else if (respTrue.includes(respostaLower)) {
        (entidade as any)[chave] = true;
      } else {
        console.log(`⚠️ Valor inválido para booleano. Mantendo: ${valorAtual}`);
      }
    } 
    
    //-------------------------
    //  TRATA CAMPOS DOUTROS TIPOS
    //-------------------------
    else {
      // Se for string ou outro tipo, salva diretamente
      (entidade as any)[chave] = resposta;
    }
  }
 
      // Executa a função específica passando o nome do campo e o valor
     
 
  console.log("\n✅ Edição concluída com sucesso!");
}

