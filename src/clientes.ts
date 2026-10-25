//clientes.ts: cadastro e consulta de clientes.
import promptSync = require('prompt-sync');
import type {Cliente, OpcaoMenu,PerguntasRespostas} from './types';
import {criarMenu} from './menus';
import { isEmailValido,isTextoValido,criarGeradorId, ehInteiroPositivo } from './helpers';
import { buscarEntidadePeloID, fazPerguntas} from './interacoesUsuario'

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
        email: iEmail,
        nomeEntidade: 'Cliente'
    }
    clientes.push(novoCliente);
    return true;
}

function cadastrarCliente():boolean {
    let tentativa:number=1;
    const maxTentativas:number=3;
    const pergResp:PerguntasRespostas[] = [
        //Validar se o nome e o e-mail foram informados.
        {
            idPergunta:1,
            pergunta:'👉 Digite o nome do cliente: ',
            resposta:"",
            numTentativa:1,
            msgErro:"\n❌ Digite um nome válido",
            msgAcerto:"✔️",
            funcaoValidadora:isTextoValido,
            retornoFuncao:false,
        },
        //Validar se o nome e o e-mail foram informados.
        {   idPergunta:2,
            pergunta:'👉 Digite o email do cliente: ',
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

    //aviso: a variável "pergResp" é editada pela função abaixo
    if (!fazPerguntas("Cliente", "Principal", pergResp, maxTentativas)){
        return false;
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
        console.log(msgErro,clienteEncontrado.id);//anexa a informação de qual Cliente já tem o e-mail
        return false;
    }
    return true;
}

function listarClientes():boolean{
    console.log("lista de clientes:");
    console.log( clientes);
    return true;
}

//interage com o usuário, fazendo perguntas padrões para o usuário informar o IDnumérico
function buscarClientePeloID():Cliente | undefined {
    return buscarEntidadePeloID("Exibir","Cliente",getClienteById);
}

function getClienteByEmail(idEmail:string):Cliente | undefined {
    return clientes.find(cliente => cliente.email === idEmail);
}

function getClienteById(idCliente:number):Cliente | undefined {
    return clientes.find(cliente => cliente.id === idCliente);
}


export { 
    cargaIncialClientes, 
    getClienteById,
    cadastrarCliente, 
    listarClientes,
    buscarClientePeloID

};
