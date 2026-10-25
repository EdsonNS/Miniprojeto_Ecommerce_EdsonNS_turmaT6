//main.ts: inicialização da aplicação e demonstração das funcionalidades.

import promptSync = require('prompt-sync');
import {cargaIncialClientes} from './clientes';
import type {Cliente, Entidades, OpcaoMenu} from './types';
import {criarMenu, exibeMenuClientes, exibeMenuEstoque, exibeMenuPrincipal} from './menus';
import { cargaIncialEstoque } from './produtos';

const prompt = promptSync({sigint: true})


function inicializa(){ 
  console.clear();  //Limpa o terminal imediatamente 
  inicializarCargas();
  //Como não estamos usando Interfaces, vou nomear as Entidades

}

function inicializarCargas(){
    cargaIncialClientes();
    cargaIncialEstoque();
}


function main():void{
 
  inicializa();
  exibeMenuPrincipal();
}
main();

// Limpa o terminal imediatamente
console.clear(); 








