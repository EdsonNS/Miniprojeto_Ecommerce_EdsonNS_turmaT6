//clientes.ts: cadastro e consulta de clientes.
import promptSync = require('prompt-sync');
import type { Cliente } from './types';
import {criarMenu} from './menus';
import  { isEmailValido,isTextoValido,criarGeradorId } from './helpers';
/*
type Cliente = {
    id:number
    nome:string
    email:string
}
*/

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
    criarMenu();

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

    };
    return true;

}



function listarClientes():Cliente[]{
    return clientes;
}


export {cadastrarCliente, listarClientes, cargaIncialClientes, exibeMenuClientes};
