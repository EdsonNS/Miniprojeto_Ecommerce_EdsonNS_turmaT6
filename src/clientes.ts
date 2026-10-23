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
    console.log("\n⚠️ Iniciando Carga Inicial...");
    pushCliente('Edson Nilton','edson.nilton@dominio.com');
    pushCliente('Adriano Ferreira','adriano.ferreira@dominio.com');
    pushCliente('Manoel Martins','manoel.martins@dominio.com');
    console.log("\n🎉 Carga Inicial realizada com sucesso!");
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
    [1, '👉 Cadastrar Clientes', () => {cadastrarCliente(); return false;}],
    [2, '👉 Listar Clientes', () => {listarClientes(); return false;}],
    [3, '👉 Buscar Clientes pelo ID', () => {buscarClientePeloID(); return false;}],
    [0, '🔙 Retornar', () => {console.log("\n👋retornando..."); return true; }]
  ];
  criarMenu("Menu Clientes",menuClientes);
}


type PerguntasRespostas = {
    pergunta:string
    numTentativa:number
    msgErro:string
    msgAcerto:string
}

function cadastrarCliente():boolean {
    let tentativa:number=1;
    const maxTentativas:number=3;
    const minhasRespostas:PerguntasRespostas[] = [
        {
            pergunta:'👉 Digite o nome do cliente ',
            numTentativa:0,
            msgErro:"\n❌ Digite um nome válido",
            msgAcerto:"✔️"
        },
        {
            pergunta:'👉 Digite o nome do cliente ',
            numTentativa:0,
            msgErro:"\n❌ Digite um nome válido",
            msgAcerto:"✔️"
        },
        {
            pergunta:'👉 Digite o nome do cliente ',
            numTentativa:0,
            msgErro:"\n❌ Digite um nome válido",
            msgAcerto:"✔️"
        },
        
    ];




    do {
        //Validar se o nome e o e-mail foram informados.
        const iNome: string = prompt('👉 Digite o nome do cliente ');
        if (!isTextoValido(iNome,"\n❌ Digite um nome válido.\n\n🚫 Cliente não foi cadastrado, tente novamente...")){
            tentativa++;
            return false;
        }

        const iEmail: string = prompt('\n❌ Digite o email do cliente ');  
        if (!isEmailValido(iEmail,"\n👉 Digite corretamente o e-mail.")){
            tentativa++;
            return false;
        } 
        //Impedir o cadastro de clientes com identificadores ou e-mails já utilizados
        const clienteEncontrado = getClienteByEmail(iEmail);
        if (clienteEncontrado) {
            console.log(`\n❌ E-mail já está em uso pelo cliente com o ID ${clienteEncontrado.id}`);
            tentativa++;
            return false;
        } 
        } while (tentativa<=maxTentativas)
    if (pushCliente(iNome,iEmail)){
        console.log(`\n🎉 Cliente ${iNome} cadastrado com sucesso!`); 
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
    const numIntPositivo: string = prompt('👉 Digite o ID do cliente a ser localizado: ');
    if (!ehInteiroPositivo(numIntPositivo)){
        return undefined;
    }
    const idCliente:number = Number(numIntPositivo.trim());
    const clienteEncontrado = getClienteById(idCliente);
    if (!clienteEncontrado) {
        console.log(`\n❌ Cliente com o ID ${idCliente} não foi encontrado.`);
        return undefined;
    } else {
        console.log(`\n🎉 Cliente com o ID ${idCliente} encontrado:`);
        console.log(clienteEncontrado);
    }
    
    return clienteEncontrado;

}

function getClienteByEmail(idEmail:string):Cliente | undefined {
    return clientes.find(cliente => cliente.email === idEmail);
}

function getClienteById(idCliente:number):Cliente | undefined {
    return clientes.find(cliente => cliente.id === idCliente);
}


export { cargaIncialClientes, exibeMenuClientes, getClienteById};
