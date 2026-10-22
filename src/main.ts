//main.ts: inicialização da aplicação e demonstração das funcionalidades.
import promptSync = require('prompt-sync');
import {cadastrarCliente, listarClientes} from './clientes';
import type {Cliente, OpcaoMenu} from './types';
import {criarMenu} from './menus';

const prompt = promptSync({sigint: true})
const nomeClienteInput:string = prompt("Digite o nome do cliente: ");
const idadeInput : number = Number(prompt("Digite a idade do cliente: "));
const novoCliente:Cliente = {
    nome:nomeClienteInput,
    idade:idadeInput,
}

cadastrarCliente(novoCliente);
console.log(listarClientes());



const acaoListar = () => console.log('\n📋 Listando todos os usuários...');
const acaoCriar = () => console.log('\n➕ Criando novo registro...');
const acaoSair = () => console.log('\n👋 Encerrando o programa...');

const menuPrincipal: OpcaoMenu[] = [
  [1, 'Menu Produtos e Estoque', acaoListar],
  [2, 'Menu Clientes', acaoCriar],
  [3, 'Menu Pedidos', acaoCriar],
  [4, 'Menu Relatórios', acaoCriar],  
  [0, 'Sair', acaoSair]
];

const menuProdutoEstoque: OpcaoMenu[] = [
  [1, 'Menu Consulta de Produtos', acaoListar],
  [2, 'Menu Cadastro de Produtos', acaoCriar],
  [3, 'Menu Consulta de Estoque', acaoCriar],

  [0, 'Sair', acaoSair]
];

// Executa o menu
criarMenu(menuPrincipal);

