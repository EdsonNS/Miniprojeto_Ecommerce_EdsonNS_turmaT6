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
    [9, '🧹 Limpar a tela', () => { console.clear(); return false; }],
    [0, '🔙 Retornar', () => {console.log("\n👋 retornando...\n"); return true; }]
  ];
  criarMenu(true,"Menu Clientes",menuClientes);
}


//type PerguntasRespostas = {
//type PerguntasRespostas<TArgs extends any[] = any[], TReturn = any> = {
type PerguntasRespostas<TArgs extends any[] = any[], TReturn = any> = {
    idPergunta:number
    pergunta:string
    resposta:string
    numTentativa:number    
    msgErro:string
    msgAcerto:string            
    //funcaoValidadora:(minhaVar:(string | null | undefined),msgErro:(string | null | undefined))=>(boolean)
    //funcaoValidadora: (...args: TArgs) => TReturn; // Aceita qualquer assinatura de função
    funcaoValidadora: (...args: any[]) => (boolean); // Aceita qualquer assinatura de função
    retornoFuncao:boolean
}

function cadastrarCliente():boolean {
    let tentativa:number=1;
    const maxTentativas:number=3;
    const pergResp:PerguntasRespostas[] = [
        //Validar se o nome e o e-mail foram informados.
        {
            idPergunta:1,
            pergunta:'👉 Digite o nome do cliente ',
            resposta:"",
            numTentativa:1,
            msgErro:"\n❌ Digite um nome válido",
            msgAcerto:"✔️",
            funcaoValidadora:isTextoValido,
            retornoFuncao:false,
        },
        //Validar se o nome e o e-mail foram informados.
        {   idPergunta:2,
            pergunta:'👉 Digite o email do cliente ',
            resposta:"",
            numTentativa:1,
            msgErro:"\n❌ Digite corretamente o e-mail.",
            msgAcerto:"✔️",
            funcaoValidadora:isEmailValido,
            retornoFuncao:false,
        },
        //Impedir o cadastro de clientes com identificadores ou e-mails já utilizados
        {
            idPergunta:3,
            pergunta:"",//não interage com usuário
            resposta:"",
            numTentativa:(maxTentativas+1), //só tenta uma vez, já deixa esgotado o número de tentativas
            msgErro:"\n❌ E-mail já está em uso pelo cliente com o ID: ", //xxxID será substituido em tempo de execução
            msgAcerto:"✔️",
            funcaoValidadora:funcaoVerificaEmailUnico,
            retornoFuncao:false,
        }          
       
    ];

     
     
    for (const perguntaAtual of pergResp) {
        let podeTentarNovamente:boolean=true;
        do {
            perguntaAtual.numTentativa++;  
            if (perguntaAtual.pergunta!=""){//Se tem pergunta, Interage com usuário
                perguntaAtual.resposta=(String(prompt( perguntaAtual.pergunta))).trim();//já pergunta, converte e remove espaços
                perguntaAtual.retornoFuncao=perguntaAtual.funcaoValidadora( perguntaAtual.resposta,perguntaAtual.msgErro);

            }  else {//não interage com usuário, faz só validações das respostas anteriores
                perguntaAtual.retornoFuncao=perguntaAtual.funcaoValidadora(pergResp,perguntaAtual.msgErro);//repassa o array com todas as respostas anteriores

            }            
            
            podeTentarNovamente = (!perguntaAtual.retornoFuncao && perguntaAtual.numTentativa<=maxTentativas);
            if (podeTentarNovamente){
                console.log(`\n⚠️ Tente novamente. Tentativa ${perguntaAtual.numTentativa} de ${maxTentativas}:`);
            }

        }while (podeTentarNovamente);

        if (!perguntaAtual.retornoFuncao){
            console.log("\n🚫 Cliente não foi cadastrado! Voltando para o Menu de opções...");
            return false;
        }
    }    

    const perguntaUm = pergResp.find(item => item.idPergunta === 1);//recupera resposta da pergunta 1 (nome)
    const nomeRespondido = perguntaUm!.resposta;
    const perguntaDois = pergResp.find(item => item.idPergunta === 2);
    const emailRespondido = perguntaDois!.resposta;
    
    if (pushCliente(nomeRespondido,emailRespondido.toLocaleLowerCase())){ //finalmente cadastra o cliente e usa email em minúsculo
        console.log(`\n🎉 Cliente ${nomeRespondido} cadastrado com sucesso!`); 
        return true;
    };
    return false;

}

function funcaoVerificaEmailUnico(perguntasRespostas : PerguntasRespostas[],msgErro:string):boolean{

    const perguntaDois = perguntasRespostas.find(item => item.idPergunta === 2);
    const emailRespondido = perguntaDois!.resposta;
    //Impedir o cadastro de clientes com identificadores ou e-mails já utilizados
    const clienteEncontrado = getClienteByEmail(emailRespondido);
    if (clienteEncontrado) {
        console.log("-------------");

        console.log(msgErro,clienteEncontrado.id);//anexa a informação de qual Cliente já tem o e-mail
        return false;
    }
console.log("yyyyyyyyyyyy");
    return true;
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
