//interacoesUsuario.ts: Faz pergunta e memoriza a resposta e trata a resposta
import { ehInteiroMaiorOuIgualaZero } from "./helpers";
import type { PerguntasRespostas, Produto, Entidades } from "./types";
import promptSync = require("prompt-sync");
import { definirCamposNumerosInteiros } from "./types.functions";
const prompt = promptSync({ sigint: true });

///////////////////////////////////////////////////////
//          executa uma Lista de perguntas
///////////////////////////////////////////////////////
function fazPerguntas(
  nomeEntidade: string,
  menuAnterior: string,
  pergResp: PerguntasRespostas[],
  maxTentativas: number,
) {
  //percorre as perguntas
  for (const perguntaAtual of pergResp) {
    let podeTentarNovamente: boolean = true;
    do {
      perguntaAtual.numTentativa++;
      if (perguntaAtual.pergunta != "") {
        //Se tem pergunta, Interage com usuário
        perguntaAtual.resposta = String(prompt(perguntaAtual.pergunta)).trim(); //já pergunta, converte e remove espaços
        perguntaAtual.retornoFuncao = perguntaAtual.funcaoValidadora(
          perguntaAtual.resposta,
          perguntaAtual.msgErro,
        );
      } else {
        //não interage com usuário, faz só validações das respostas anteriores
        perguntaAtual.retornoFuncao = perguntaAtual.funcaoValidadora(
          pergResp,
          perguntaAtual.msgErro,
        ); //repassa o array com todas as respostas anteriores
      }

      podeTentarNovamente =
        !perguntaAtual.retornoFuncao &&
        perguntaAtual.numTentativa <= maxTentativas;
      if (podeTentarNovamente) {
        console.log(
          `\n⚠️ Tente novamente. Tentativa ${perguntaAtual.numTentativa} de ${maxTentativas}:`,
        );
      }
    } while (podeTentarNovamente);

    if (!perguntaAtual.retornoFuncao) {
      console.log(
        `\n🚫 ${nomeEntidade} não foi cadastrado! Voltando para o Menu ${menuAnterior}...`,
      );
      return false;
    }
  }
  return true;
}

///////////////////////////////////////////////////////
//            Busca pelo ID - pergunta, busca e (Exibi ou não)
///////////////////////////////////////////////////////

// o tipo genérico <T> para que retorne exatamente o tipo da função que foi passada
//
//type Entidades = Cliente | Produto | ItemPedido | Pedido | undefined;
function buscarEntidadePeloID<T extends Entidades>(
  acao: "Editar" | "Exibir" | "Excluir", //adapta a frase a ser exibida pro usuário
  nomeEntidade: string,
  funcaoGetEntidadeById: (id: number) => T,
): T {
  let interacaoPergunta = `👉 Digite o ID do ${nomeEntidade} a ser `;

  switch (acao) {
    case "Editar":
      interacaoPergunta += "editado: ";
      break;
    case "Exibir":
      interacaoPergunta += "exibido: ";
      break;
    case "Excluir":
      interacaoPergunta += "excluído: ";
  }

  const numIntPositivo: string = prompt(interacaoPergunta);

  if (!ehInteiroMaiorOuIgualaZero(numIntPositivo)) {
    return undefined as T; // Força o retorno condizente com o genérico
  }

  const idEntidade: number = Number(numIntPositivo.trim());
  const entidadeEncontrado: T = funcaoGetEntidadeById(idEntidade);

  if (!entidadeEncontrado) {
    console.log(
      `\n❌ ${nomeEntidade} com o ID ${idEntidade} não foi encontrado.`,
    );
    return undefined as T;
  } else {
    switch (acao) {
      case "Editar":
        editarEntidade(entidadeEncontrado);
        console.log(entidadeEncontrado);
        break;
      case "Exibir":
        console.log(`\n🎉 ${nomeEntidade} com o ID ${idEntidade} encontrado: `);
        console.log(entidadeEncontrado);
        break;
      case "Excluir":
        console.log(`\n🎉 ${nomeEntidade} com o ID ${idEntidade} encontrado: `);
        break;
    }
  }

  return entidadeEncontrado;
}


// o tipo genérico <T> para que retorne exatamente o tipo da função que foi passada
//
//type Entidades = Cliente | Produto | ItemPedido | Pedido | undefined;
function buscarEntidadePeloID_OLD<T extends Entidades>(
  acao: "Editar" | "Exibir" | "Excluir", //adapta a frase a ser exibida pro usuário
  nomeEntidade: string,
  funcaoGetEntidadeById: (id: number) => T,
): T {
  let interacaoPergunta = `👉 Digite o ID do ${nomeEntidade} a ser `;

  switch (acao) {
    case "Editar":
      interacaoPergunta += "editado: ";
      break;
    case "Exibir":
      interacaoPergunta += "exibido: ";
      break;
    case "Excluir":
      interacaoPergunta += "excluído: ";
  }

  const numIntPositivo: string = prompt(interacaoPergunta);

  if (!ehInteiroMaiorOuIgualaZero(numIntPositivo)) {
    return undefined as T; // Força o retorno condizente com o genérico
  }

  const idEntidade: number = Number(numIntPositivo.trim());
  const entidadeEncontrado: T = funcaoGetEntidadeById(idEntidade);

  if (!entidadeEncontrado) {
    console.log(
      `\n❌ ${nomeEntidade} com o ID ${idEntidade} não foi encontrado.`,
    );
    return undefined as T;
  } else {
    switch (acao) {
      case "Editar":
        editarEntidade(entidadeEncontrado);
        console.log(entidadeEncontrado);
        break;
      case "Exibir":
        console.log(`\n🎉 ${nomeEntidade} com o ID ${idEntidade} encontrado: `);
        console.log(entidadeEncontrado);
        break;
      case "Excluir":
        console.log(`\n🎉 ${nomeEntidade} com o ID ${idEntidade} encontrado: `);
        break;
    }
  }

  return entidadeEncontrado;
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
      const recordDeEntidadesComCamposNumberInteiros: Record<string, string[]> =
        definirCamposNumerosInteiros();
      const tipoEntidade = entidade.nomeEntidade; // "Produto" | "Pedido" | "ItemPedido"
      const camposNumberInteirosDaEntidade =
        recordDeEntidadesComCamposNumberInteiros[tipoEntidade] || [];
      const precisaSerInteiroPositivo =
        camposNumberInteirosDaEntidade.includes(chave);

      if (precisaSerInteiroPositivo) {
        if (ehInteiroMaiorOuIgualaZero(resposta)) {
          const numeroConvertido = Number(resposta);
          (entidade as any)[chave] = numeroConvertido;
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

  console.log("\n✅ Edição concluída com sucesso!");
}

function nomeDasEntidades(entidade: Entidades): string {
  // 1. Tratamento prévio caso seja undefined
  if (!entidade) {
    return "Nenhuma entidade (undefined)";
  }

  // 2. O switch analisa a propriedade 'tipo'
  switch (entidade.nomeEntidade) {
    case "Cliente":
      // Aqui dentro, o TS sabe que 'entidade' é estritamente um Cliente
      return `Cliente (E-mail: ${entidade.email})`;

    case "Produto":
      // Aqui dentro, o TS sabe que 'entidade' é estritamente um Produto
      return `Produto (Preço: R$ ${entidade.preco})`;

    default:
      // Caso caia aqui, significa que um tipo não mapeado foi passado
      return "Entidade desconhecida";
  }
}

export { fazPerguntas, buscarEntidadePeloID };
