//clientes.ts: cadastro e consulta de clientes.
import promptSync = require('prompt-sync');
import type { Cliente } from './types';
import  { isEmailValido } from './helpers';
/*
type Cliente = {
    id:number
    nome:string
    email:string
}
*/

const prompt = promptSync({ sigint: true });
const clientes : Cliente[]=[];

//Closure que gera um incremento
function criarGeradorId(): () => number {
  let sequencial: number = 0;  
  return function(): number {
    sequencial++;
    return sequencial; 
  };
}

const geraId = criarGeradorId();


//O sistema deverá iniciar com pelo menos 3 clientes cadastrados para facilitar os
//testes das funcionalidades
function cargaIncial():void{
    cadastrarCliente(geraId(),'Edson Nilton','edson.nilton@dominio.com');
    cadastrarCliente(geraId(),'Adriano Ferreira','adriano.ferreira@dominio.com');
    cadastrarCliente(geraId(),'Manoel Martins','manoel.martins@dominio.com');
}


function cadastrarCliente(iId:number,iNome:string,iEmail:string):void {

    if (!isEmailValido(iEmail)) {
        console.log('Digite corretamente o e-mail') 
    }

    const novoCliente: Cliente = {
        id: iId,
        nome: iNome,
        email: iEmail
    }
    clientes.push(novoCliente);
}

function listarClientes():Cliente[]{
    return clientes;
}


export {cadastrarCliente, listarClientes};
