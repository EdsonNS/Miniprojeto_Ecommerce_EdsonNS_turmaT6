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
import  { isTextoValido,criarGeradorId, ehInteiroPositivo, ehNumericoPositivo } from './helpers';
import { fazPerguntas,buscarEntidadePeloID } from './interacoesUsuario';
import promptSync = require('prompt-sync');
const prompt = promptSync({ sigint: true });

const estoque : Produto[]=[];
const geraIdProduto = criarGeradorId();


let filtroCategoria:string="";

function getFiltroCategiria():string{
    return filtroCategoria;
}
function setFiltroCategoria(categoria:string){
    filtroCategoria=categoria;
}

//iniciar com 10 produtos cadastrados para facilitar os testes das funcionalidades
function cargaIncialEstoque():boolean{
  console.log("\n⚠️ Iniciando Carga Inicial do Estoque...");
  pushProduto("Roupas masculinas","Calça Masculina Preta Tamanho P", 130,10, true);
  pushProduto("Roupas masculinas","Calça Masculina Preta Tamanho M", 140,11, true);
  pushProduto("Roupas masculinas","Calça Masculina Preta Tamanho G", 150,12, true);

  pushProduto("Roupas masculinas","Calça Masculina Azul Tamanho P", 130,13, true);
  pushProduto("Roupas masculinas","Calça Masculina Azul Tamanho M", 140,14, true);
  pushProduto("Roupas masculinas","Calça Masculina Azul Tamanho G", 150,15, true);

  pushProduto("Roupas Femininas","Camiseta Feminina Branca Tamanho P", 150,16, true);
  pushProduto("Roupas Femininas","Camiseta Feminina Branca Tamanho M", 160,17, true);
  pushProduto("Roupas Femininas","Camiseta Feminina Branca Tamanho G", 170,18, true);

  pushProduto("Calçados Femininos","Sapato Feminino Preto Tamanho 35", 150,19, true);
  pushProduto("Calçados Femininos","Sapato Feminino Preto Tamanho 36", 150,20, true);
  pushProduto("Calçados Femininos","Sapato Feminino Preto Tamanho 37", 150,21, true);

  pushProduto("Calçados Femininos","Sapato Feminino Branco Tamanho 35", 150,22, true);
  pushProduto("Calçados Femininos","Sapato Feminino Branco Tamanho 36", 150,23, true);
  pushProduto("Calçados Femininos","Sapato Feminino Branco Tamanho 37", 150,24, true);

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
            funcaoValidadora:ehInteiroPositivo,
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


function listarProdutos():boolean{
    console.log("lista de produtos: ");
    console.log( estoque);
    return true;
}

function buscarProdutoPeloID():Produto | undefined {
    return buscarEntidadePeloID("Exibir","Produto",getProdutoById);
}
function editarProduto(){
    return buscarEntidadePeloID('Editar',"Produto",getProdutoById);
}

function listarProdutosDisponiveis(){

}

function listarProdutosIndisponiveis(){

}

function listarProdutosExcluidos(){

}



function removerProduto(){

    }

function filtrarProdutoPorCategoria():boolean{

    setFiltroCategoria("xxx");

  return true;
}


function getProdutoById(idProduto:number):Produto | undefined {
    return estoque.find(produto => produto.id === idProduto);
}

function buscarProdutoPorParteNomeInformado(){

/*
    const chaveBusca="";

    return estoque.filter(elemento => 
        elemento.nome?.toLowerCase().includes(chaveBusca.toLowerCase())
    );
*/

}


export { 
    cargaIncialEstoque,
    cadastrarProduto,
    editarProduto,
    removerProduto,
    filtrarProdutoPorCategoria,
    listarProdutosDisponiveis,
    listarProdutosIndisponiveis,
    listarProdutosExcluidos,
    buscarProdutoPeloID,
    buscarProdutoPorParteNomeInformado,
    getFiltroCategiria,
    setFiltroCategoria
};
