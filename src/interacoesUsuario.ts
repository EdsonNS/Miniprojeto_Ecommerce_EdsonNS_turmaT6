//interacoesUsuario.ts: Faz pergunta e memoriza a resposta e trata a resposta
import { ehInteiroPositivo } from './helpers';
import type {PerguntasRespostas,Produto, Entidades} from './types';
import promptSync = require('prompt-sync');
const prompt = promptSync({ sigint: true });


function fazPerguntas(nomeEntidade:string, menuAnterior:string, pergResp:PerguntasRespostas[],maxTentativas:number){
    //percorre as perguntas
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
            console.log(`\n🚫 ${nomeEntidade} não foi cadastrado! Voltando para o Menu ${menuAnterior}...`);
            return false;
        }
    }
    return true;    

}


// o tipo genérico <T> para que retorne exatamente o tipo da função que foi passada
//
//type Entidades = Cliente | Produto | ItemPedido | Pedido | undefined;
function buscarEntidadePeloID<T extends Entidades>(
    nomeEntidade: string, 
    funcaoGetEntidadeById: (id: number) => T
): T {
    const numIntPositivo: string = prompt(`👉 Digite o ID do ${nomeEntidade} a ser localizado: `);
    
    if (!ehInteiroPositivo(numIntPositivo)) {
        return undefined as T; // Força o retorno condizente com o genérico
    }

    const idEntidade: number = Number(numIntPositivo.trim());
    const entidadeEncontrado: T = funcaoGetEntidadeById(idEntidade);

    if (!entidadeEncontrado) {
        console.log(`\n❌ ${nomeEntidade} com o ID ${idEntidade} não foi encontrado.`);
        return undefined as T;
    } else {
        console.log(`\n🎉 ${nomeEntidade} com o ID ${idEntidade} encontrado:`);
        console.log(entidadeEncontrado);
    }

    return entidadeEncontrado;
}

export {fazPerguntas,buscarEntidadePeloID};
