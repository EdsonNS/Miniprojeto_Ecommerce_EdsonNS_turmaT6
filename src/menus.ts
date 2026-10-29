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
    [100, '📦 Menu Produtos e Estoque', exibeMenuEstoque],
    [200, '👥 Menu Clientes', exibeMenuClientes],
    [300, '🛒 Menu Carrinho de Compra', () => { return false; }],   
    [400, '📝 Menu Pedidos', () => { return false; }],
    [500, '🖨️ Menu Relatórios', () => { return false; }],  
    [888, '🧹 Limpar a tela', () => { console.clear(); return false; }],
    [999, '🔙 Sair', () => { console.log("\n👋 saindo...\n"); return true; }]
  ];
  criarMenu(false,"Menu Principal",menuPrincipal);
}

///////////////////////////////////////////////////////////////////////
//                          Menu Estoque (Produtos)
///////////////////////////////////////////////////////////////////////

function exibeMenuEstoque(){
  const menuProduto: OpcaoMenu[] = [
    [101, '🪪📦 Cadastrar Produto', () => {cadastrarProduto(); return false;}],
    [102, '✏️📦 Editar Produto', () => {editarProduto(); return false;}],
    [103, '🗑️📦 Remover Produto', () => {removerProduto(); return false;}],    
    [104, '🔴🛍️ Ativar Filtro de Produto por Categoria', () => {ativarFiltroProdutoPorCategoria(); return false;}],
    [105, '❌🛍️ Desativar Filtro de Produto por Categoria', () => {desativarFiltroProdutoPorCategoria(); return false;}],
    [106, '🖨️🔋 Listar Produtos disponíveis (em estoque)', () => {listarProdutosDisponiveis(); return false;}],
    [107, '🖨️🪫 Listar Produtos indisponíveis (estoque zerado)', () => {listarProdutosIndisponiveis(); return false;}],
    [108, '🖨️🗑️ Listar Produtos excluídos', () => {listarProdutosExcluidos(); return false;}],
    [109, '🔍🫆 Buscar Produto pelo ID', () => {buscarProdutoPeloID(); return false;}],
    [110, '🔍🔤 Buscar Produtos por parte do nome do Produto informado', () => {buscarProdutosPorParteNomeInformado(); return false;}],
    [111, '🔍🛍️ Buscar Produtos por parte da categoria informada', () => {buscarProdutosPorParteCategoriaformada(); return false;}],

    [301, '➕📦🛒 Adicionar Produto no Carrinho', () => { return false; }],   
    [302, '➖📦🛒 Remover Produto do Carrinho', () => { return false; }], 
    [303, '✏️📦🛒 Editar Item do Carrinho', () => { return false;}],
    [304, '🖨️📦🛒 Listar Itens do Carrinho', () => { return false;}], 

    [888, '🧹 Limpar a tela', () => { console.clear(); return false; }],
    [0, '🔙 Retornar', () => {console.log("\n👋 retornando...\n"); return true; }]
  ];
  criarMenu(true,"📦 Menu Produto",menuProduto);
}

///////////////////////////////////////////////////////////////////////
//                          Menu Clientes
///////////////////////////////////////////////////////////////////////


function exibeMenuClientes(){
  const menuClientes: OpcaoMenu[] = [
    [201, '🪪👥 Cadastrar Clientes', () => {cadastrarCliente(); return false;}],
    [202, '✏️👥 Editar Cliente', () => {editarCliente(); return false;}],
    [203, '🖨️👥 Listar Clientes', () => {listarClientes(); return false;}],
    [204, '🔍🫆 Buscar Cliente pelo ID', () => {buscarClientePeloID(); return false;}],
    [205, '🔍🔤👥 Buscar Clientes por parte do nome do Cliente informado', () => {buscarClientesPorParteNomeInformado(); return false;}],
    [206, '🔍🔤✉ Buscar Clientes por parte do e-mail informado', () => {buscarClientesPorParteEMAILInformado(); return false;}],

    [305, '➕👥🛒 Adicionar CLiente ao Carrinho', () => { return false;}],
    [306, '🔄👥🛒 Trocar CLiente do Carrinho', () => { return false;}],

    [888, '🧹 Limpar a tela', () => { console.clear(); return false; }],
    [0, '🔙 Retornar', () => {console.log("\n👋 retornando...\n"); return true; }]
  ];
  criarMenu(true,"👥 Menu Clientes",menuClientes);
}



///////////////////////////////////////////////////////////////////////
//                          Menu Carrinho
///////////////////////////////////////////////////////////////////////


function exibeMenuCarrinho(){
  const menuCarrinho: OpcaoMenu[] = [
    [301, '➕📦 Adicionar Produto no Carrinho', () => { return false; }],
    [302, '➖📦 Remover Produto do Carrinho', () => { return false; }],
    [303, '✏️📦 Editar Item do Carrinho', () => { return false;}],
    [304, '🖨️📦 Listar Itens do Carrinho', () => { return false;}],
    [305, '➕👥 Adicionar Cliente ao Carrinho', () => { return false;}],
    [306, '🔄👥 Trocar Cliente do Carrinho', () => { return false;}],
    [307, '🔄🛒 Trocar de Carrinho', () => { return false;}],
   
    [401, '🛒📝 Fechar Carrinho - Abrir Pedido', () => { return false;}],

     
    [888, '🧹 Limpar a tela', () => { console.clear(); return false; }],
    [0, '🔙 Retornar', () => {console.log("\n👋 retornando...\n"); return true; }]
  ];
  criarMenu(true,"🛒 Menu Carrinho",menuCarrinho);
}



///////////////////////////////////////////////////////////////////////
//                          Menu Pedidos
///////////////////////////////////////////////////////////////////////


function exibeMenuPedidos(){
  const menuPedidos: OpcaoMenu[] = [
    [401, '🛒📝 Fechar Carrinho - Abrir Pedido', () => { return false;}],
    [402, '✏️📝 Editar Pedido - Reabrir Carrinho', () => { return false;}],
    [403, '🗑️📝 Cancelar Pedido', () => { return false;}], 
    [404, '🖨️📝 Listar Pedidos', () => { return false;}],
    [405, '🔍🫆 Buscar Pedido pelo ID', () => { return false;}],
    [406, '🔍🔤👥 Buscar Pedidos por parte do nome do Cliente informado', () => { return false;}],
    [406, '🔍🔤📦 Buscar Pedidos por parte do nome do Produto informado', () => { return false;}],
    [407, '🔍✉ Buscar Pedidos por parte do e-mail informado', () => { return false;}],

    [888, '🧹 Limpar a tela', () => { console.clear(); return false; }],
    [0, '🔙 Retornar', () => {console.log("\n👋 retornando...\n"); return true; }]
  ];
  criarMenu(true,"📝 Menu Pedidos",menuPedidos);
}

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




