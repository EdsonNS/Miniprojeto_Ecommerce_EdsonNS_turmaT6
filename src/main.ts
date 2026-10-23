//main.ts: inicialização da aplicação e demonstração das funcionalidades.
import promptSync = require('prompt-sync');
import {cargaIncialClientes, exibeMenuClientes} from './clientes';
import type {Cliente, OpcaoMenu} from './types';
import {criarMenu} from './menus';

const prompt = promptSync({sigint: true})

function inicializarCargas(){
    cargaIncialClientes();
}

function exibeMenuPrincipal(){
  const menuPrincipal: OpcaoMenu[] = [
    [1, '👉 Menu Produtos e Estoque', () => { return false; }],
    [2, '👉 Menu Clientes', exibeMenuClientes],
    [3, '👉 Menu Pedidos', () => { return false; }],
    [4, '👉 Menu Relatórios', () => { return false; }],  
    [9, '🧹 Limpar a tela', () => { console.clear(); return false; }],
    [0, '🔙 Sair', () => { console.log("\n👋 saindo...\n"); return true; }]
  ];
  criarMenu(false,"Menu Principal",menuPrincipal);
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












