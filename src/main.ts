//main.ts: inicialização da aplicação e demonstração das funcionalidades.

import promptSync = require('prompt-sync');
import {cargaIncialClientes} from './clientes';
import type {Cliente, OpcaoMenu} from './types';
import {criarMenu, exibeMenuClientes, exibeMenuEstoque, exibeMenuPrincipal} from './menus';
import { cargaIncialEstoque } from './produtos';

const prompt = promptSync({sigint: true})

function inicializarCargas(){
    cargaIncialClientes();
    cargaIncialEstoque();
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








