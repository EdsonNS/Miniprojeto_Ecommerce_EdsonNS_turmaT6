// menus.ts : exibição de menus

/*
function menuPrincipal(){


    const menuMain:string =    `
Digite uma opção:
1- Consulta e cadastro de produtos.
2- Consulta e cadastro de clientes.
3- Adição e alteração de itens no carrinho.
4- Cálculo dos valores da compra.
5- Finalização de pelo menos um pedido.
6- Atualização do estoque após a compra.
7- Apresentação dos relatórios.
8- Sair.
`;
    console.clear();
    console.log(menuMain);


}
    */
import promptSync from 'prompt-sync';
import type {OpcaoMenu} from './types';


const prompt = promptSync();


function criarMenu(opcoes: OpcaoMenu[]): void {
  let executar = true;

  while (executar) {
    console.log('\n=== MENU DE OPÇÕES ===');
    // Exibe as opções do array
    opcoes.forEach(([numero, texto]) => {
      console.log(`${numero}. ${texto}`);
    });

    // Lê a entrada do usuário de forma síncrona
    const escolhaStr: string  = String(prompt('Escolha uma opção: '));
    const  escolhaNum: number = parseInt(escolhaStr, 10);

    // Busca a opção correspondente
    const opcaoEncontrada = opcoes.find(([numero]) => numero === escolhaNum);

    if (opcaoEncontrada) {
      const [,, funcao] = opcaoEncontrada;
      funcao();         // Executa a função correspondente
      executar = false; // Encerra o menu
    } else {
      console.log('\n❌ Opção inválida! Tente novamente.');
    }
  }
}





// ==========================================
// EXEMPLO DE USO
// ==========================================

const acaoListar = () => console.log('\n📋 Listando todos os usuários...');
const acaoCriar = () => console.log('\n➕ Criando novo registro...');
const acaoSair = () => console.log('\n👋 Encerrando o programa...');

// Array de opções estruturado
const meuMenu: OpcaoMenu[] = [
  [1, 'Listar Usuários', acaoListar],
  [2, 'Criar Registro', acaoCriar],
  [3, 'Sair', acaoSair]
];

// Executa o menu
criarMenu(meuMenu);

export {criarMenu};
