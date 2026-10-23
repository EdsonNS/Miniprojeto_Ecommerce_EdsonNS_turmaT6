//main.ts: inicialização da aplicação e demonstração das funcionalidades.
import promptSync = require('prompt-sync');
import {cargaIncialClientes, exibeMenuClientes} from './clientes';
import type {Cliente, OpcaoMenu} from './types';
import {criarMenu} from './menus';
import { cargaIncialEstoque,exibeMenuEstoque } from './produtos';

const prompt = promptSync({sigint: true})

function inicializarCargas(){
    cargaIncialClientes();
    cargaIncialEstoque();
}

function exibeMenuPrincipal(){
  const menuPrincipal: OpcaoMenu[] = [
    [1, '👉 Menu Produtos e Estoque', exibeMenuEstoque],
    [2, '👉 Menu Clientes', exibeMenuClientes],
    [3, '👉 Menu Carrinho de Compra', () => { return false; }],   
    [4, '👉 Menu Pedidos', () => { return false; }],
    [5, '👉 Menu Relatórios', () => { return false; }],  
    [99, '🧹 Limpar a tela', () => { console.clear(); return false; }],
    [0, '🔙 Sair', () => { console.log("\n👋 saindo...\n"); return true; }]
  ];
  criarMenu(false,"Menu Principal",menuPrincipal,"");
}

function main():void{
  // Limpa o terminal imediatamente
  console.clear();   
  inicializarCargas();
  exibeMenuPrincipal();
}
main();

// Limpa o terminal imediatamente
console.clear(); 












