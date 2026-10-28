//helpers.ts: funções reutilizáveis




/////////////////////////////////////////////
//          Funções de Verificação
/////////////////////////////////////////////

function isTextoValido(
  minhaVar: string | null | undefined,
  msgErro: string | null | undefined,
): boolean {
  /*
    • minhaVar: É o nome do parâmetro.
    • : string | null | undefined: É a tipagem do TypeScript. Significa que essa variável aceita
    apenas três tipos de valores: um texto (string), um valor nulo (null), ou um valor indefinido (undefined).
    */

  if (!minhaVar || minhaVar.trim() === "") {
    // A variável é nula, indefinida, vazia ou só contém espaços

    /*
      No JavaScript/TypeScript, os valores null, undefined e "" (string vazia) são
       considerados falsy (se comportam como falso)
       */
    ifIsTextoValidoPrint(msgErro);
    return false;
  } else {
    return true;
  }
}

function ehNaoNuloNemVazio(valor: unknown): boolean {
    // Elimina null, undefined e booleanos
    if (valor === null || valor === undefined || typeof valor === "boolean") {
      ifIsTextoValidoPrint(
        "\n❌ Valor não pode ser null, undefined ou booleanos!",
      );
      return false;
    }

    // Elimina strings vazias ou que contêm apenas espaços em branco
    if (typeof valor === "string" && valor.trim() === "") {
      ifIsTextoValidoPrint("\n❌ Valor não pode ser vazio!");
      return false;
    }
    return true;

}

function ehInteiroMaiorOuIgualaZero(valor: unknown): boolean {
      if (!ehNaoNuloNemVazio(valor)){
        return false;
      } 

      // Converte para número
      const numeroConvertido = Number(valor);

      // Verifica se é um número inteiro válido E se é maior ou igual a zero
      if (Number.isInteger(numeroConvertido) && numeroConvertido >= 0) {
        return true;
      } else {
        ifIsTextoValidoPrint(
          "\n❌ Valor tem que ser Inteiro e maior ou igual a zero!",
        );
        return false;
      }
}

function ehInteiroMaiorQueZero(valor: unknown): boolean {
      if (!ehNaoNuloNemVazio(valor)){
        return false;
      } 

      // Converte para número
      const numeroConvertido = Number(valor);

      // Verifica se é um número inteiro válido E se é maior ou igual a zero
      if (Number.isInteger(numeroConvertido) && numeroConvertido > 0) {
        return true;
      } else {
        ifIsTextoValidoPrint(
          "\n❌ Valor tem que ser Inteiro e maior que zero!",
        );
        return false;
      }
}

function ehNumericoPositivo(valor: unknown): boolean {
  if (!ehNaoNuloNemVazio(valor)){
    return false;
  } 

  // Converte para número
  const numeroConvertido = Number(valor);

  // Verifica se é um número válido E se é maior ou igual a zero
  if (numeroConvertido >= 0) {
    return true;
  } else {
    ifIsTextoValidoPrint("\n❌ Valor tem que ser maior ou igual a zero!");
    return false;
  }
}



function ifIsTextoValidoPrint(msgToPrint: string | null | undefined): boolean {
  if (!msgToPrint || msgToPrint.trim() === "") {
    return false;
  } else {
    console.log(msgToPrint);
    return true;
  }
}

function isEmailValido(
  email: string | null | undefined,
  msgErro: string | null | undefined,
): boolean {
  if (!isTextoValido(email, msgErro)) {
    return false;
  }

  //Fonte: https://cursos.alura.com.br/app/forum/topic/80469
  //como validar email e senha em javascript

  // Regex padrão baseado na especificação RFC 5322 simplificada

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /*
    Explicação da Regex utilizada
    O padrão /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/ funciona da seguinte forma:
    • ^: Início da linha.
    • [^\\s@]+: Um ou mais caracteres que não sejam espaços em branco ou o símbolo @.
    • @: Exige exatamente um caractere @.
    • [^\\s@]+: Um ou mais caracteres após o @ que não sejam espaços ou outro @.
    • \\.: Exige um ponto final (.) separando o domínio da extensão.
    • [^\\s@]+: Um ou mais caracteres para a extensão final (como com, org, com.br).
    • $: Fim da linha.
  */
  const emailStr = String(email).trim();

  if (emailRegex.test(emailStr)) {
    return true;
  } else {
    ifIsTextoValidoPrint(msgErro);
    return false;
  }
}

/////////////////////////////////////////////
//      Funções de Inserção de dados
/////////////////////////////////////////////

//Closure que gera um incremento
function criarGeradorId(): () => number {
  let sequencial: number = 0;
  return function (): number {
    sequencial++;
    return sequencial;
  };
}



/////////////////////////////////////////////
//          Funções de Busca
/////////////////////////////////////////////




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







export {
  isTextoValido,
  isEmailValido,
  criarGeradorId,
  ehInteiroMaiorOuIgualaZero,
  ehInteiroMaiorQueZero,
  ehNumericoPositivo,
};
