// @ts-nocheck



---------------
3. Ignorando uma linha específica

Se o problema for apenas uma linha isolada, use:

// @ts-ignore
const erroDeTipo: string = 123;

------------------
2. Ignorando erros dentro do próprio arquivo

Se o arquivo precisa ser compilado, mas tem erros que travam o tsc, 
você pode desativar a checagem de tipos apenas para ele adicionando 
um comentário no topo do arquivo:
// @ts-nocheck
const erroDeTipo: string = 123; // O TSC vai ignorar este erro

-----------------
1. Modificando o tsconfig.json (Recomendado)

Abra o arquivo tsconfig.json na raiz do seu projeto e adicione o arquivo ou pasta que deseja ignorar dentro da array exclude:
//**
// 

json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "commonjs"
    // ... outras configurações
  },
  "exclude": [
    "node_modules",
    "src/arquivo-com-erro.ts", // Arquivo específico
    "src/pasta-ignorada/**/*"  // Pasta inteira e subpastas
  ]
}


*/

/*
analise o código abaixo e corrija ou me informe 
Como passar a função "getProdutoById" através da função "buscarProdutoPeloID" para que a função "buscarEntidadePeloID" 
receba pelo parametro "funcaoGetEntidadeById"
:

*/

import promptSync = require('prompt-sync');
const prompt = promptSync({ sigint: true });

type Cliente = {
    id:number
    nome:string
    email:string
}

type Produto = {
    id: number
    categoria: string
    nome: string
    preco: number
    qtdeEstoque: number
    visivel:boolean //indica que foi excluído  
}
type Entidades = Cliente | Produto |  undefined;

const estoque : Produto[]=[];

buscarProdutoPeloID();

function getProdutoById(idProduto:number):Produto | undefined {
    return estoque.find(produto => produto.id === idProduto);
}

function buscarProdutoPeloID():(Produto | undefined) {
    return buscarEntidadePeloID("Produto", getProdutoById);
}


function buscarEntidadePeloID(nomeEntidade:string, funcaoGetEntidadeById:(id:Number)=>Entidades):Entidades {
    const numIntPositivo: string = prompt(`👉 Digite o ID do ${nomeEntidade} a ser localizado: `);
    if (!ehInteiroPositivo(numIntPositivo)){
        return undefined;
    }
    const idProduto:number = Number(numIntPositivo.trim());
    const produtoEncontrado:Entidades = funcaoGetEntidadeById(idProduto);
    if (!produtoEncontrado) {
        console.log(`\n❌ Produto com o ID ${idProduto} não foi encontrado.`);
        return undefined;
    } else {
        console.log(`\n🎉 Produto com o ID ${idProduto} encontrado:`);
        console.log(produtoEncontrado);
    }
    
    return produtoEncontrado;

}

function ehInteiroPositivo(valor: unknown): boolean {
  if (valor === null || valor === undefined || typeof valor === 'boolean') {
    console.log("\n❌ Valor não pode ser null, undefined ou booleanos!");
    return false;
  }
  return true;

}



function nomeDasEntidades(entidade:Entidades):string{

    if (typeof entidade === Cliente) {
        // Aqui dentro, o TS sabe que 'valor' é estritamente uma string
        return "Cliente";
    } else if (typeof entidade === Produto) {
        // Aqui dentro, o TS sabe que 'valor' é estritamente uma string
        return "Produto";
    }
}
