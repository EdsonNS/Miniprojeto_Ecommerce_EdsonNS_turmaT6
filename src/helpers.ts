//helpers.ts: funções reutilizáveis

function validaTexto(texto: string): boolean {
    if (texto.trim() === '') {
        console.log('Não pode ser vazio')
        return false;
    }
    return true
}

function isTextoValido(){

    
    const minhaVar: string | null | undefined = "";
/*
• const: Declara uma constante, ou seja, uma variável cujo valor não pode ser reatribuído depois.
• minhaVar: É o nome da variável.
• : string | null | undefined: É a tipagem do TypeScript. Significa que essa variável aceita
 apenas três tipos de valores: um texto (string), um valor nulo (null), ou um valor indefinido (undefined).
• = "": Atribui o valor inicial à variável. Neste caso, uma string vazia (sem nenhum caractere).
*/

    if (!minhaVar || minhaVar.trim() === "") {
      // A variável é nula, indefinida, vazia ou só contém espaços

      /*
      No JavaScript/TypeScript, os valores null, undefined e "" (string vazia) são
       considerados falsy (se comportam como falso)
       */

    }

}

function isEmailValido(email: string): boolean {
   //Fonte: https://cursos.alura.com.br/app/forum/topic/80469
   //como validar email e senha em javascript
    
  // Regex padrão baseado na especificação RFC 5322 simplificada
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
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
  if (!email) {
    return false;
  }

  return emailRegex.test(email);
}

export {
    validaTexto,
    isEmailValido
}