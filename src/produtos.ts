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
import promptSync = require('prompt-sync');
import type { OpcaoMenu,PerguntasRespostas, Produto} from './types';
import {criarMenu} from './menus';
import  { isTextoValido,criarGeradorId, ehInteiroPositivo, ehNumericoPositivo } from './helpers';

const estoque : Produto[]=[];
const geraIdProduto = criarGeradorId();
const prompt = promptSync({ sigint: true });

let filtroCategoria:string="";

//iniciar com menos 10 produtos cadastrados para facilitar os
//testes das funcionalidades
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
        visivel:visivel //se for excluído
    }
    estoque.push(novoProduto);
    return true;
}


function exibeMenuEstoque(){
  const menuProduto: OpcaoMenu[] = [
    [1, '👉 Cadastrar Produto', () => {cadastrarProduto(); return false;}],
    [2, '👉 Editar Produto', () => {editarProduto(); return false;}],
    [3, '👉 Remover Produto', () => {removerProduto(); return false;}],    
    [4, '👉 Filtar Produto por Categoria', () => {filtrarProdutoPorCategoria(); return false;}],
    [5, '👉 Remover Filtro de Produto por Categoria', () => {filtroCategoria=""; return false;}],
    [6, '👉 Listar Produto disponíveis', () => {listarProdutosDisponiveis(); return false;}],
    [7, '👉 Listar Produto indisponíveis', () => {listarProdutosIndisponiveis(); return false;}],
    [8, '👉 Listar Produto excluídos', () => {listarProdutosExcluidos(); return false;}],
    [9, '👉 Buscar Produto pelo ID', () => {buscarProdutoPeloID(); return false;}],
    [10, '👉 Buscar Produto por parte do nome informado', () => {buscarProdutoPorParteNomeInformado(); return false;}],
    
    [99, '🧹 Limpar a tela', () => { console.clear(); return false; }],
    [0, '🔙 Retornar', () => {console.log("\n👋 retornando...\n"); return true; }]
  ];
  let msgAlerta:string = ""
  if (filtroCategoria!==""){
    msgAlerta = `🚨 Filtro de categoria está ativado: ["${filtroCategoria}"]`;
  }
  criarMenu(true,"Menu Produto",menuProduto,msgAlerta);
}

function cadastrarProduto():boolean {
    let tentativa:number=1;
    const maxTentativas:number=3;
    const pergResp:PerguntasRespostas[] = [
        //Validar se nomes, categorias, etc  foram informados.
        {
            idPergunta:1,
            pergunta:'👉 Digite o nome do categoria ',
            resposta:"",
            numTentativa:1,
            msgErro:"\n❌ Digite um nome válido para a categoria",
            msgAcerto:"✔️",
            funcaoValidadora:isTextoValido,
            retornoFuncao:false,
        },        {
            idPergunta:2,
            pergunta:'👉 Digite o nome do produto ',
            resposta:"",
            numTentativa:1,
            msgErro:"\n❌ Digite um nome válido para o produto",
            msgAcerto:"✔️",
            funcaoValidadora:isTextoValido,
            retornoFuncao:false,
        },        {
            idPergunta:3,
            pergunta:'👉 Digite o preço unitário do produto ',
            resposta:"",
            numTentativa:1,
            msgErro:"\n❌ Digite um valor numérico válido",
            msgAcerto:"✔️",
            funcaoValidadora:ehNumericoPositivo,
            retornoFuncao:false,
        },
        {   idPergunta:4,
            pergunta:'👉 Digite a quantidade em estoque',
            resposta:"",
            numTentativa:1,
            msgErro:"", //função já emite mensagem própria de erro
            msgAcerto:"✔️",
            funcaoValidadora:ehInteiroPositivo,
            retornoFuncao:false,
        },
    ];

     
     
    for (const perguntaAtual of pergResp) {
        let podeTentarNovamente:boolean=true;
        do {
            perguntaAtual.numTentativa++;  
            if (perguntaAtual.pergunta!=""){//Se tem pergunta, Interage com usuário
                perguntaAtual.resposta=(String(prompt( perguntaAtual.pergunta))).trim();//já pergunta, converte e remove espaços
                perguntaAtual.retornoFuncao=perguntaAtual.funcaoValidadora( perguntaAtual.resposta,perguntaAtual.msgErro);

            }  else {//não interage com usuário, faz só validações das respostas anteriores
                perguntaAtual.retornoFuncao=perguntaAtual.funcaoValidadora(pergResp,perguntaAtual.msgErro);//repassa o array com todas as respostas anteriores

            }            
            
            podeTentarNovamente = (!perguntaAtual.retornoFuncao && perguntaAtual.numTentativa<=maxTentativas);
            if (podeTentarNovamente){
                console.log(`\n⚠️ Tente novamente. Tentativa ${perguntaAtual.numTentativa} de ${maxTentativas}:`);
            }

        }while (podeTentarNovamente);

        if (!perguntaAtual.retornoFuncao){
            console.log("\n🚫 Produto não foi cadastrado! Voltando para o Menu de opções...");
            return false;
        }
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
    console.log("lista de produtos:");
    console.log( estoque);
    return true;
}

function buscarProdutoPeloID():Produto | undefined {
    const numIntPositivo: string = prompt('👉 Digite o ID do produto a ser localizado: ');
    if (!ehInteiroPositivo(numIntPositivo)){
        return undefined;
    }
    const idProduto:number = Number(numIntPositivo.trim());
    const produtoEncontrado = getProdutoById(idProduto);
    if (!produtoEncontrado) {
        console.log(`\n❌ Produto com o ID ${idProduto} não foi encontrado.`);
        return undefined;
    } else {
        console.log(`\n🎉 Produto com o ID ${idProduto} encontrado:`);
        console.log(produtoEncontrado);
    }
    
    return produtoEncontrado;

}

function filtrarProdutoPorCategoria():boolean{



  return true;
}


function getProdutoById(idProduto:number):Produto | undefined {
    return estoque.find(produto => produto.id === idProduto);
}

function buscarProdutoPorParteNomeInformado(){


const chaveBusca="";



return estoque.filter(elemento => 
  elemento.nome?.toLowerCase().includes(chaveBusca.toLowerCase());
);


}


export { cargaIncialEstoque, exibeMenuEstoque};
