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
import {  buscarClientePeloID,  
          buscarClientesPorParteNomeInformado, 
          buscarClientesPorParteEMAILInformado,
          cadastrarCliente,
          editarCliente,
          listarClientes } from './clientes';
import {  ativarFiltroProdutoPorCategoria, buscarProdutoPeloID, 
          buscarProdutosPorParteNomeInformado, 
          cadastrarProduto,
          editarProduto,            
          getFiltroCategiria,
          listarProdutosDisponiveis, 
          listarProdutosExcluidos, 
          listarProdutosIndisponiveis, 
          desativarFiltroProdutoPorCategoria, 
          removerProduto,
          buscarProdutosPorParteCategoriaformada, 
            } from './produtos';
const prompt = promptSync();


function getMsgAlerta():string{
  let msgAlerta:string = "";
  if (getFiltroCategiria().trim() !== ''){
    msgAlerta = `🚨 Filtro de categoria está ativado: ["${getFiltroCategiria()}"]`;
  }
  return msgAlerta;
}
///////////////////////////////////////////////////////////////////////
//                          Menu Principal
///////////////////////////////////////////////////////////////////////


function exibeMenuPrincipal(){
  const menuPrincipal: OpcaoMenu[] = [
    [1, '📦 Menu Produtos e Estoque', exibeMenuEstoque],
    [2, '👥 Menu Clientes', exibeMenuClientes],
    [3, '🛒 Menu Carrinho de Compra', () => { return false; }],   
    [4, '📝 Menu Pedidos', () => { return false; }],
    [5, '🖨️ Menu Relatórios', () => { return false; }],  
    [99, '🧹 Limpar a tela', () => { console.clear(); return false; }],
    [0, '🔙 Sair', () => { console.log("\n👋 saindo...\n"); return true; }]
  ];
  criarMenu(false,"Menu Principal",menuPrincipal);
}


///////////////////////////////////////////////////////////////////////
//                          Menu Clientes
///////////////////////////////////////////////////////////////////////


function exibeMenuClientes(){
  const menuClientes: OpcaoMenu[] = [
    [1, '🪪 Cadastrar Clientes', () => {cadastrarCliente(); return false;}],
    [2, '✏️ Editar Cliente', () => {editarCliente(); return false;}],
    [3, '🖨️ Listar Clientes', () => {listarClientes(); return false;}],
    [4, '🔍🫆 Buscar Cliente pelo ID', () => {buscarClientePeloID(); return false;}],
    [5, '🔍🔤 Buscar Clientes por parte do nome informado', () => {buscarClientesPorParteNomeInformado(); return false;}],
    [6, '🔍✉ Buscar Clientes por parte do e-mail informado', () => {buscarClientesPorParteEMAILInformado(); return false;}],
    [99, '🧹 Limpar a tela', () => { console.clear(); return false; }],
    [0, '🔙 Retornar', () => {console.log("\n👋 retornando...\n"); return true; }]
  ];
  criarMenu(true,"👥 Menu Clientes",menuClientes);
}

///////////////////////////////////////////////////////////////////////
//                          Menu Estoque (Produtos)
///////////////////////////////////////////////////////////////////////

function exibeMenuEstoque(){
  const menuProduto: OpcaoMenu[] = [
    [1, '🪪 Cadastrar Produto', () => {cadastrarProduto(); return false;}],
    [2, '✏️ Editar Produto', () => {editarProduto(); return false;}],
    [3, '🗑️ Remover Produto', () => {removerProduto(); return false;}],    
    [4, '🔴🛍️ Ativar  Filtro de Produto por Categoria', () => {ativarFiltroProdutoPorCategoria(); return false;}],
    [5, '❌🛍️ Desativar Filtro de Produto por Categoria', () => {desativarFiltroProdutoPorCategoria(); return false;}],
    [6, '🖨️🪫 Listar Produtos disponíveis (em estoque)', () => {listarProdutosDisponiveis(); return false;}],
    [7, '🖨️🔋 Listar Produtos indisponíveis (estoque zerado)', () => {listarProdutosIndisponiveis(); return false;}],
    [8, '🖨️🗑️ Listar Produtos excluídos', () => {listarProdutosExcluidos(); return false;}],
    [9, '🔍🫆 Buscar Produto pelo ID', () => {buscarProdutoPeloID(); return false;}],
    [10, '🔍🔤 Buscar Produtos por parte do nome informado', () => {buscarProdutosPorParteNomeInformado(); return false;}],
    [11, '🔍🛍️ Buscar Produtos por parte da categoria informada', () => {buscarProdutosPorParteCategoriaformada(); return false;}],
    
    [99, '🧹 Limpar a tela', () => { console.clear(); return false; }],
    [0, '🔙 Retornar', () => {console.log("\n👋 retornando...\n"); return true; }]
  ];
  criarMenu(true,"📦 Menu Produto",menuProduto);
}

///////////////////////////////////////////////////////////////////////
//                          Menu Pedidos
///////////////////////////////////////////////////////////////////////

/*
function exibeMenuPedidos(){
  const menuPedidos: OpcaoMenu[] = [
    [1, '🪪 Cadastrar Pedido', () => {cadastrarPedido(); return false;}],
    [2, '✏️ Editar Pedido', () => {editarPedido(); return false;}],
    [3, '🖨️ Listar Pedidos', () => {listarPedidos(); return false;}],
    [4, '🔍🫆 Buscar Pedido pelo ID', () => {buscarClientePeloID(); return false;}],
    [5, '🔍🔤 Buscar Pedidos por parte do nome informado', () => {buscarClientesPorParteNomeInformado(); return false;}],
    [6, '🔍✉ Buscar Pedidos por parte do e-mail informado', () => {buscarClientesPorParteEMAILInformado(); return false;}],
    [99, '🧹 Limpar a tela', () => { console.clear(); return false; }],
    [0, '🔙 Retornar', () => {console.log("\n👋 retornando...\n"); return true; }]
  ];
  criarMenu(true,"📝 Menu Pedidos",menuPedidos);
}
*/
// Definição do tipo: um array contendo [número, texto, função]
//type OpcaoMenu = [number, string, () => void];

function criarMenu(cls:boolean,titulo:string, opcoes: OpcaoMenu[]): void {
  if (cls) {
  // Limpa o terminal imediatamente
  console.clear(); 
  }

  let executar:boolean = true;
  let numTentaiva:number=0;
  while (executar) {
    //console.clear(); 
    console.log(`\n=== ${titulo} ===`);
    // Exibe as opções do array
    opcoes.forEach(([numero, texto]) => {
      console.log(`${numero}. ${texto}`);
    });
    //if (msgAleta!==""){
    console.log("--->",getMsgAlerta(),"<----");
    //}
    // Lê a entrada do usuário de forma síncrona
    const escolhaStr: string  = String(prompt('Escolha uma opção: '));
    const  escolhaNum: number = parseInt(escolhaStr, 10);

    // Busca a opção correspondente
    const opcaoEncontrada = opcoes.find(([numero]) => numero === escolhaNum);

    if (opcaoEncontrada) {
      const funcao = opcaoEncontrada[2]; // Pega o terceiro elemento
      if (funcao()){ // Executa a função, se retornar false continua exibindo o Menu
          executar = false; // Encerra o menu
      }; 
      
    } else {
          numTentaiva++;   
          const msgOpcaoInvalida:string=" Opção inválida! Tente novamente.";
          let emoji:string="";

          if (numTentaiva > 7) {
            emoji="😴";
          } else if (numTentaiva > 5) {
            emoji="👽";
          } else if (numTentaiva > 3) {
            emoji="🥱";
          } else {
            emoji="❌";
          }
          console.clear();
          console.log(emoji,msgOpcaoInvalida);

    }   
  }   
}





/*
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
criarMenu("Menu Principal",meuMenu);
*/



///////////////////////////////////////////////////////
//                 EXPORTAÇÔES
///////////////////////////////////////////////////////


export {criarMenu, exibeMenuPrincipal,exibeMenuClientes,exibeMenuEstoque};




