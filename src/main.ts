//main.ts: inicialização da aplicação e demonstração das funcionalidades.
import promptSync = require('prompt-sync');
import {cargaIncialClientes, cadastrarCliente, listarClientes,exibeMenuClientes} from './clientes';
import type {Cliente, OpcaoMenu} from './types';
import {criarMenu} from './menus';

const prompt = promptSync({sigint: true})

function inicializarCargas(){
    cargaIncialClientes();
}

function exibeMenuPrincipal(){
  const menuPrincipal: OpcaoMenu[] = [
    [1, 'Menu Produtos e Estoque', () => { return false; }],
    [2, 'Menu Clientes', exibeMenuClientes],
    [3, 'Menu Pedidos', () => { return false; }],
    [4, 'Menu Relatórios', () => { return false; }],  
    [0, 'Sair', () => { return true; }]
  ];
  criarMenu("Menu Principal",menuPrincipal);
}

function main():void{
  inicializarCargas();
  exibeMenu();
}

main();







const menuProdutoEstoque: OpcaoMenu[] = [
  [1, 'Menu Consulta de Produtos', acaoListar],
  [2, 'Menu Cadastro de Produtos', acaoCriar],
  [3, 'Menu Consulta de Estoque', acaoCriar],

  [0, 'Sair', acaoSair]
];

// Executa o menu
criarMenu(menuPrincipal);

