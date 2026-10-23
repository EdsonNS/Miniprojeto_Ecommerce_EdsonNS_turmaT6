//clientes.ts: cadastro e consulta de clientes.
import promptSync = require('prompt-sync');
import type {Cliente, OpcaoMenu} from './types';
import {criarMenu} from './menus';
import  { isEmailValido,isTextoValido,criarGeradorId, ehInteiroPositivo } from './helpers';

const prompt = promptSync({ sigint: true });
const clientes : Cliente[]=[];
const geraIdCliente = criarGeradorId();


//O sistema deverá iniciar com pelo menos 3 clientes cadastrados para facilitar os
//testes das funcionalidades
function cargaIncialClientes():boolean{
    console.log("Iniciando Carga Inicial...");
    pushCliente('Edson Nilton','edson.nilton@dominio.com');
    pushCliente('Adriano Ferreira','adriano.ferreira@dominio.com');
    pushCliente('Manoel Martins','manoel.martins@dominio.com');
    console.log("Carga Inicial realizada com sucesso!");
    return true;
}

function pushCliente(iNome:string,iEmail:string):boolean {    
    const novoCliente: Cliente = {
        id: geraIdCliente(),
        nome: iNome,
        email: iEmail
    }
    clientes.push(novoCliente);
    return true;
}


function exibeMenuClientes(){
  const menuClientes: OpcaoMenu[] = [
    [1, 'Cadastrar Clientes', () => {cadastrarCliente(); return false;}],
    [2, 'Listar Clientes', () => {listarClientes(); return false;}],
    [3, 'Buscar Clientes pelo ID', () => {buscarClientePeloID(); return false;}],
    [0, 'Sair', () => { return true; }]
  ];
  criarMenu("Menu Clientes",menuClientes);
}



function cadastrarCliente():boolean {
    
    const iNome: string = prompt('Digite o nome do cliente ');
    if (!isTextoValido(iNome,"Digite um nome válido.")){
        return false;
    }

    const iEmail: string = prompt('Digite o email do cliente ');  
    if (!isEmailValido(iEmail,"Digite corretamente o e-mail.")){
        return false;
    } 
    if (pushCliente(iNome,iEmail)){
        console.log(`Cliente ${iNome} cadastrado com sucesso!`); 
        return true;
    };
    return false;

}



function listarClientes():boolean{
    console.log("lista de clientes:");
    console.log( clientes);
    return true;
}

function buscarClientePeloID():Cliente | undefined {
    const numIntPositivo: string = prompt('Digite o ID do cliente a ser localizado: ');
    if (!ehInteiroPositivo(numIntPositivo)){
        return undefined;
    }
    const idCliente:number = Number(numIntPositivo.trim());
    const clienteEncontrado = getClienteById(idCliente);
    if (!clienteEncontrado) {
        console.log(`Cliente com o ID ${idCliente} não foi encontrado.`);
        return undefined;
    } else {
        console.log(`Cliente com o ID ${idCliente} encontrado:`);
        console.log(clienteEncontrado);
    }
    
    return clienteEncontrado;

}

function getClienteById(idCliente:number):Cliente | undefined {
    return clientes.find(cliente => cliente.id === idCliente);
}


export { cargaIncialClientes, exibeMenuClientes, getClienteById};
