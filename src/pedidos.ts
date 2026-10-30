//pedidos.ts: operações do carrinho e pedidos, carrinho é o embrião do Pedido, ou um Pedido que não amadureceu

import promptSync = require('prompt-sync');
import type {Cliente, EstatusPedido, FuncaoTratamento, OpcaoMenu,Pedido,PerguntasRespostas} from './types';
import {criarMenu} from './menus';
import { isEmailValido,isTextoValido,criarGeradorId } from './helpers';
import { buscarEntidadePeloID,buscarEntidadesPorParteDoTexto, fazPerguntas} from './interacoesUsuario'

const prompt = promptSync({ sigint: true });
const pedidos : Pedido[]=[];
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
function cargaIncialPedidos():boolean{
    console.log("\n⚠️ Iniciando Carga Inicial...");
    /*
    pushPedidos(
        iClienteId:number,
        iClienteNome:string,
        iClienteEmail:string,
        iPedidoValorTotal:number,
        iPedidoData:Date,
        iPedidoStatus: EstatusPedido)
    );
    pushPedidos('Adriano Ferreira','adriano.ferreira@dominio.com');
    pushPedidos('Manoel Martins','manoel.martins@dominio.com.br');
    pushPedidos('Filipe Martins','filipe.martins@dominio.com.pt');
    pushPedidos('Maria Clara','maria.clara@dominio.com.uk');
    */
    console.log("\n🎉 Carga Inicial realizada com sucesso!");
    return true;
}
    
function pushPedidos(
        iClienteId:number,
        iClienteNome:string,
        iClienteEmail:string,
        iPedidoValorTotal:number,
        iPedidoData:Date,
        iPedidoStatus: EstatusPedido):boolean {    
    const novoPedido: Pedido = {
        id: geraIdPedido(),
        nomeEntidade: 'Pedido',//Propriedade Discriminadora (Tagged Union)
        clienteId: iClienteId,
        clienteNome:iClienteNome,
        clienteEmail:iClienteEmail,
        pedidoValorTotal:iPedidoValorTotal,
        pedidoData:iPedidoData,
        pedidoStatus:iPedidoStatus,
    }
    pedidos.push(novoPedido);
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

