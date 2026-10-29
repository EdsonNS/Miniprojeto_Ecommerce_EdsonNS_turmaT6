//produtos.ts: cadastro, consulta, atualização e remoção de produtos.

/*
Cada produto deverá possuír no mínimo:
● id: identificador único.
● nome: nome do produto.
● categoria: categoria à qual pertence.
● preco: preço unitário.
● estoque: quantidade disponível.

type Produto = {
    id: number
    nome: string
    categoria: string
    preco: number
    qtdeEstoque: number
    visivel:boolean //excluído mas 
}

Regras obrigatórias:
● O identificador de cada produto deve ser único.
● O nome não pode estar vazio.
● O preço deve ser maior que zero.
● O estoque não pode ser negativo.
● Não deve ser possível cadastrar um produto com um identificador já utilizado.

O sistema deverá permitir:
● Cadastrar novos produtos.
● Listar todos os produtos disponíveis.
● Buscar um produto pelo seu identificador.
● Buscar produtos pelo nome, permitindo localizar parte do nome informado.
● Filtrar produtos por categoria.
● Atualizar informações de um produto cadastrado.
● Remover um produto, respeitando as regras definidas pelo sistema.



const menuProdutoEstoque: OpcaoMenu[] = [
  [1, 'Menu Consulta de Produtos', acaoListar],
  [2, 'Menu Cadastro de Produtos', acaoCriar],
  [3, 'Menu Consulta de Estoque', acaoCriar],

  [0, 'Sair', acaoSair]
];
*/

//clientes.ts: cadastro e consulta de clientes.
import type { OpcaoMenu,PerguntasRespostas, Produto} from './types';
import {criarMenu} from './menus';
import  { isTextoValido,criarGeradorId, ehInteiroMaiorOuIgualaZero, ehNumericoPositivo } from './helpers';
import { fazPerguntas,buscarEntidadePeloID } from './interacoesUsuario';
import promptSync = require('prompt-sync');
const prompt = promptSync({ sigint: true });

const estoque : Produto[]=[];
const geraIdProduto = criarGeradorId();

let filtroCategoria:string="";

//////////////////////////////////////////////
//      Funções de interação com dados
//              camada model
//////////////////////////////////////////////
//          Funções de Verificação
/////////////////////////////////////////////



/////////////////////////////////////////////
//      Funções de Inserção de dados
/////////////////////////////////////////////


//iniciar com produtos já cadastrados para facilitar os testes das funcionalidades
function cargaIncialEstoque():boolean{

  console.log("\n⚠️ Iniciando Carga Inicial do Estoque...");
  pushProduto("Roupas masculinas","Calça Masculina Preta Tamanho P", 130,0, true);
  pushProduto("Roupas masculinas","Calça Masculina Preta Tamanho M", 140,11, true);
  pushProduto("Roupas masculinas","Calça Masculina Preta Tamanho G", 150,12, true);
  pushProduto("Roupas masculinas","Exemplo 1 de produto excluído", 150,12, false);
  pushProduto("Roupas masculinas","Exemplo 1 de produto estoque zerado", 150,0, true);
  

  pushProduto("Roupas masculinas","Calça Masculina Azul Tamanho P", 130,13, true);
  pushProduto("Roupas masculinas","Calça Masculina Azul Tamanho M", 140,14, true);
  pushProduto("Roupas masculinas","Calça Masculina Azul Tamanho G", 150,15, true);
  pushProduto("Roupas masculinas","Exemplo 2 de produto excluído", 150,12, false);
  pushProduto("Roupas masculinas","Exemplo 2 de produto estoque zerado", 150,0, true);

  pushProduto("Roupas Femininas","Camiseta Feminina Branca Tamanho P", 150,16, true);
  pushProduto("Roupas Femininas","Camiseta Feminina Branca Tamanho M", 160,17, true);
  pushProduto("Roupas Femininas","Camiseta Feminina Branca Tamanho G", 170,18, true);
  pushProduto("Roupas Femininas","Exemplo 3 de produto excluído", 150,12, false);
  pushProduto("Roupas Femininas","Exemplo 3 de produto estoque zerado", 150,0, true);

  pushProduto("Calçados Femininos","Sapato Feminino Preto Tamanho 35", 150,19, true);
  pushProduto("Calçados Femininos","Sapato Feminino Preto Tamanho 36", 150,20, true);
  pushProduto("Calçados Femininos","Sapato Feminino Preto Tamanho 37", 150,21, true);
  pushProduto("Calçados Femininos","Exemplo 4 de produto excluído", 150,12, false);
  pushProduto("Calçados Femininos","Exemplo 4 de produto estoque zerado", 150,0, true);


  pushProduto("Calçados Femininos","Sapato Feminino Branco Tamanho 35", 150,22, true);
  pushProduto("Calçados Femininos","Sapato Feminino Branco Tamanho 36", 150,23, true);
  pushProduto("Calçados Femininos","Sapato Feminino Branco Tamanho 37", 150,24, true);
  pushProduto("Calçados Femininos","Exemplo 5 de produto excluído", 150,12, false);
  pushProduto("Calçados Femininos","Exemplo 5 de produto estoque zerado", 150,0, true);

  console.log("\n🎉 Carga Inicial realizada com sucesso!");
  return true;
}

function pushProduto(categoria: string,nome: string,preco: number,qtdeEstoque: number,visivel:boolean):boolean {  
    const novoProduto: Produto = {
        id: geraIdProduto(),
        categoria: categoria,
        nome: nome,
        preco: preco,
        qtdeEstoque: qtdeEstoque,
        visivel: visivel, //se for excluído
        nomeEntidade: 'Produto'
    }
    estoque.push(novoProduto);
    return true;
}



/////////////////////////////////////////////
//          Funções de Busca
/////////////////////////////////////////////
function getFiltroCategiria():string{
    return filtroCategoria;
}

// Obtém a lista filtrada
function getProdutosVisiveis():Produto[]{
    return estoque.filter(p => p.visivel);
}

function getProdutosNaoVisiveis():Produto[]{
    return estoque.filter(p => !p.visivel);
}

function getProdutoById(idProduto:number):Produto | undefined {
    return estoque.find(produto => produto.id === idProduto);
}

function getListaCategorias():string[] {

    const produtosVisiveis=getProdutosVisiveis();
    const categoriasUnicas: string[] = [...new Set(produtosVisiveis.map(produto => produto.categoria))];
    return categoriasUnicas;
    /*
    Para obter um array com valores únicos das categorias do estoque, 
    a forma mais eficiente e moderna em JavaScript/TypeScript é utilizar
     o Set combinado com o método .map(). 
     O Set descarta automaticamente qualquer valor duplicado.

    Funcionamento:

    1. estoque.map(p => p.categoria): Cria um novo array contendo apenas as strings de categoria
    de cada produto (ex: ["Roupas masculinas", "Roupas masculinas", "Roupas Femininas", ...]).
    2. new Set(...): O objeto Set armazena apenas valores únicos, removendo todas as repetições de texto.
    3. [... ] (Spread Operator): Transforma o Set de volta em um array convencional do TypeScript (string[]).
    */
}

function buscarProdutoPeloID():Produto | undefined {
    return buscarEntidadePeloID("Exibir","Produto",getProdutoById);
}


function buscarProdutoPorParteNomeInformado(){

/*
    const chaveBusca="";

    return estoque.filter(elemento => 
        elemento.nome?.toLowerCase().includes(chaveBusca.toLowerCase())
    );
*/

}

/////////////////////////////////////////////
//          Funções de Edição 
/////////////////////////////////////////////
function setFiltroCategoria(outraCategoria:string){
    filtroCategoria=outraCategoria;
}

function editarProduto(){
    return buscarEntidadePeloID('Editar',"Produto",getProdutoById);
}



/////////////////////////////////////////////
//          Funções de Exclusão 
/////////////////////////////////////////////
function removerFiltroProdutoPorCategoria(){
    filtroCategoria="";
}

function removerProduto(): boolean {
    //to do: remover/marcar como indisponível o mesmo Produto no Carrinho e de Pedidos em aberto 
  
  /*
    const produto = estoque.find(p => p.id === id);
  if (produto) {
    produto.visivel = false;
    return true;
  }
    */
  return false;

  //removerProdutoByID(id);
}

function removerProdutoByID(id: number): boolean {
  const produto = estoque.find(p => p.id === id);
  if (produto) {
    produto.visivel = false;
    return true;
  }
  return false;
}




////////////////////////////////////////////////////////////
//    Funções de interação com usuário (se usa console.log)
//                     camada view
//
//                      INSERÇÃO
///////////////////////////////////////////////////////////
function cadastrarProduto():boolean {
    let tentativa:number=1;
    const maxTentativas:number=3;
    const pergResp:PerguntasRespostas[] = [
        //Validar se nomes, categorias, etc  foram informados.
        {
            idPergunta:1,
            pergunta:'👉 Digite o nome do categoria: ',
            resposta:"",
            numTentativa:1,
            msgErro:"\n❌ Digite um nome válido para a categoria ",
            msgAcerto:"✔️",
            funcaoValidadora:isTextoValido,
            retornoFuncao:false,
        },        {
            idPergunta:2,
            pergunta:'👉 Digite o nome do produto: ',
            resposta:"",
            numTentativa:1,
            msgErro:"\n❌ Digite um nome válido para o produto ",
            msgAcerto:"✔️",
            funcaoValidadora:isTextoValido,
            retornoFuncao:false,
        },        {
            idPergunta:3,
            pergunta:'👉 Digite o preço unitário do produto: ',
            resposta:"",
            numTentativa:1,
            msgErro:"\n❌ Digite um valor numérico válido",
            msgAcerto:"✔️",
            funcaoValidadora:ehNumericoPositivo,
            retornoFuncao:false,
        },
        {   idPergunta:4,
            pergunta:'👉 Digite a quantidade em estoque: ',
            resposta:"",
            numTentativa:1,
            msgErro:"", //função já emite mensagem própria de erro
            msgAcerto:"✔️",
            funcaoValidadora:ehInteiroMaiorOuIgualaZero,
            retornoFuncao:false,
        },
    ];

    //a variável "pergResp" é editada pela função abaixo
    if (!fazPerguntas("Produto", "Principal", pergResp, maxTentativas)){
        return false;
    }     
     
    const perguntaUm = pergResp.find(item => item.idPergunta === 1);//recupera resposta da pergunta 1 (nome)
    const categoriaProduto:string = perguntaUm!.resposta;
    const perguntaDois = pergResp.find(item => item.idPergunta === 2);
    const nomeProduto:string = perguntaDois!.resposta;
    const precoProduto:number = Number(pergResp.find(item => item.idPergunta === 3)!.resposta);
    const qtdeEstoque:number = Number(pergResp.find(item => item.idPergunta === 4)!.resposta);

    if (pushProduto(categoriaProduto,nomeProduto,precoProduto,qtdeEstoque,true)){
          console.log(`\n🎉 Produto cadastrado com sucesso!`); 
      return true;
    };
    return false;

}

////////////////////////////////////////////////////////////
//    Funções de interação com usuário (se usa console.log)
//                     camada view
//
//                      BUSCA
///////////////////////////////////////////////////////////
function listarProdutosDisponiveis(){
    const produtosVisiveis=getProdutosVisiveis();
    const produtosVisiveisEmEstoque = (): Produto[] => produtosVisiveis.filter(p => p.qtdeEstoque>0);
    console.log("lista de produtos disponíveis (Em estoque):");
    console.log( produtosVisiveisEmEstoque());
    return true;
}


function listarProdutosIndisponiveis(){
    /*

    type Produto = {
    nomeEntidade: "Produto";//Propriedade Discriminadora (Tagged Union)
    id: number
    categoria: string
    nome: string
    preco: number
    qtdeEstoque: number
    visivel:boolean //indica que foi excluído  }

    */
    const produtosVisiveis=getProdutosVisiveis();
    const produtosVisiveisComEstoqueZerado = (): Produto[] => produtosVisiveis.filter(p => p.qtdeEstoque==0);

    console.log("lista de produtos indisponíveis (estoque zerado):");
    console.log( produtosVisiveisComEstoqueZerado());
    return true;


}

function listarProdutosExcluidos(){
    console.log("lista de produtos excluídos:");
    const obterProdutosExcluidos = (): Produto[] => estoque.filter(p => !p.visivel);
    console.log( obterProdutosExcluidos());
    console.log( estoque.filter(p => !p.visivel));
    return true
}


////////////////////////////////////////////////////////////
//    Funções de interação com usuário (se usa console.log)
//                     camada view
//
//                      EDIÇÃO
///////////////////////////////////////////////////////////

function ativarFiltroProdutoPorCategoria():boolean{
     const categorias=getListaCategorias();
    // 1. Organiza a lista em ordem alfabética (crescente)
    categorias.sort();
    // 2. Cria o array com opções de menu
    const menuEscolheCategoria: OpcaoMenu[] = [];
    // 3. Passa item por item da lista colocando no formato da lista de menu
    categorias.forEach((categoria, index) => {
    menuEscolheCategoria.push([
        index + 1, // Começa no 1 e vai somando
        categoria, // Nome da categoria
        () => {
        setFiltroCategoria(categoria); // Usa o mesmo nome aqui dentro
        return false;
        },
    ]);
    });
    menuEscolheCategoria.push([98, '🔓📌 Remover Filtro de Produto por Categoria', () => {removerFiltroProdutoPorCategoria(); return false;}]);
    menuEscolheCategoria.push([99, '🧹 Limpar a tela', () => { console.clear(); return false; }]);
    menuEscolheCategoria.push([0, '🔙 Retornar', () => {console.log("\n👋 retornando...\n"); return true; }]);
    criarMenu(true,"Escolher uma Categoria",menuEscolheCategoria);

  return true;
}




////////////////////////////////////////////////////////////
//    Funções de interação com usuário (se usa console.log)
//                     camada view
//
//                      EXCLUSÃO
///////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////
//    Funções de interação com usuário (se usa console.log)
//                     camada view
//
//                      INTERAÇÃO
///////////////////////////////////////////////////////////









///////////////////////////////////////////////////////
//                 EXPORTAÇÔES
///////////////////////////////////////////////////////




export { 
    cargaIncialEstoque,
    cadastrarProduto,
    editarProduto,
    removerProduto,
    ativarFiltroProdutoPorCategoria,
    removerFiltroProdutoPorCategoria,
    listarProdutosDisponiveis,
    listarProdutosIndisponiveis,
    listarProdutosExcluidos,
    buscarProdutoPeloID,
    buscarProdutoPorParteNomeInformado,
    getFiltroCategiria
    
};
