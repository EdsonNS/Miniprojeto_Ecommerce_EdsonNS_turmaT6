//interacoesUsuario.ts: Faz pergunta e memoriza a resposta e trata a resposta
import type {PerguntasRespostas} from './types';

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
            console.log(`\n🚫 ${nomeEntidade} não foi cadastrado! Voltando para o Menu de ${menuAnterior}...`);
            return false;
        }
    }
    return true;    

}

export {fazPerguntas};
