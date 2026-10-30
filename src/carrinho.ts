//carrinho.ts: operações do carrinho, um pedido é o mesmo que um carrinho Finalizado

import promptSync = require('prompt-sync');
import type {Carrinho, Cliente, EstatusCarrinho, FuncaoTratamento, OpcaoMenu,PerguntasRespostas} from './types';
import {criarMenu} from './menus';
import { isEmailValido,isTextoValido,criarGeradorId } from './helpers';
import { buscarEntidadePeloID,buscarEntidadesPorParteDoTexto, fazPerguntas} from './interacoesUsuario'

const prompt = promptSync({ sigint: true });
const frota : Carrinho[]=[];
const geraIdPedido = criarGeradorId();

//////////////////////////////////////////////
//      Funções de interação com dados
//              camada model
//////////////////////////////////////////////
//          Funções de Verificação
/////////////////////////////////////////////


//////////////////////////////////////////////
//      Funções de interação com dados
//              camada model
/////////////////////////////////////////////
//      Funções de Inserção de dados
/////////////////////////////////////////////
//O sistema deverá iniciar com pelo menos 3 clientes cadastrados para facilitar os
//testes das funcionalidades
function cargaIncialCarrinho():boolean{
    console.log("\n⚠️ Iniciando Carga Inicial...");
    /*
    pushCarrinho(
        iClienteNome:string,
        iClienteEmail:string,
        iCarrinhoValorTotal:number,
        iCarrinhoData:Date,
        iCarrinhoStatus: EstatusCarrinho)
    );

    */
    console.log("\n🎉 Carga Inicial realizada com sucesso!");
    return true;
}
       
function pushCarrinho(
        iClienteNome:string,
        iClienteEmail:string,
        iCarrinhoValorTotal:number,
        iCarrinhoQtdeItens:number,
        iCarrinhoData:Date,
        iCarrinhoStatus: EstatusCarrinho):boolean {    
    const novoCarrinho: Carrinho = {
        id: geraIdPedido(),
        nomeEntidade: 'Carrinho',//Propriedade Discriminadora (Tagged Union)
        clienteNome:iClienteNome,
        clienteEmail:iClienteEmail,
        carrinhoValorTotal:iCarrinhoValorTotal,
        carrinhoQtdeItens:iCarrinhoQtdeItens,
        carrinhoData:iCarrinhoData,
        carrinhoStatus:iCarrinhoStatus,


    }
    frota.push(novoCarrinho);
    return true;
}

//////////////////////////////////////////////
//      Funções de interação com dados
//              camada model
/////////////////////////////////////////////
//          Funções de Busca
/////////////////////////////////////////////

//////////////////////////////////////////////
//      Funções de interação com dados
//              camada model
/////////////////////////////////////////////
//          Funções de Edição 
/////////////////////////////////////////////


//////////////////////////////////////////////
//      Funções de interação com dados
//              camada model
/////////////////////////////////////////////
//          Funções de Exclusão 
/////////////////////////////////////////////


//////////////////////////////////////////////
//    Funções de interação com usuário 
//    camada view (se usa console.log)
//////////////////////////////////////////////
//          Funções de Verificação
/////////////////////////////////////////////


//////////////////////////////////////////////
//    Funções de interação com usuário 
//    camada view (se usa console.log)
//////////////////////////////////////////////
//      Funções de Inserção de dados 
/////////////////////////////////////////////




//////////////////////////////////////////////
//    Funções de interação com usuário 
//    camada view (se usa console.log)
//////////////////////////////////////////////
//          Funções de Busca 
/////////////////////////////////////////////




//////////////////////////////////////////////
//    Funções de interação com usuário 
//    camada view (se usa console.log)
//////////////////////////////////////////////
//          Funções de Edição 
/////////////////////////////////////////////




//////////////////////////////////////////////
//    Funções de interação com usuário 
//    camada view (se usa console.log)
//////////////////////////////////////////////
//          Funções de Exclusão 
/////////////////////////////////////////////



///////////////////////////////////////////////////////
//                 EXPORTAÇÔES
///////////////////////////////////////////////////////

