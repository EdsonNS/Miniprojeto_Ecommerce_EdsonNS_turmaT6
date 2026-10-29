// @ts-nocheck
import promptSync = require('prompt-sync');
const prompt = promptSync({ sigint: true });

type Cliente = {
    nomeEntidade: "Cliente";//Propriedade Discriminadora (Tagged Union), usada para saber o type quando usado em Entidades
    id:number;
    nome:string;
    email:string;
}

type Produto = {
    nomeEntidade: "Produto";//Propriedade Discriminadora (Tagged Union)
    id: number
    categoria: string
    nome: string
    preco: number
    qtdeEstoque: number
    visivel:boolean //indica que foi excluído  
}

type Entidades = Cliente | Produto | undefined;

const estoque: Produto[] = [];

// Chamada de teste
buscarProdutoPeloID();

function getProdutoById(idProduto: number): Produto | undefined {
    return estoque.find(produto => produto.id === idProduto);
}

function buscarProdutoPeloID1():(Produto | undefined) {
    return buscarEntidadePeloID("Produto", getProdutoById);
}


function buscarProdutoPeloID(): Produto | undefined {
    // Tipando explicitamente como Produto | undefined, na função Generics (Tipos Genéricos) na 
    // função abstrata buscarEntidadePeloID.
    return buscarEntidadePeloID<Produto | undefined>("Produto", getProdutoById);
}


function ehInteiroPositivo(valor: unknown): boolean {
    if (valor === null || valor === undefined || typeof valor === 'boolean') {
        console.log("\n❌ Valor não pode ser null, undefined ou booleanos!");
        return false;
    }
    return true;
}

/*

na função "buscarEntidadePeloID", o parametro "nomeEntidade", gostaria que a função "buscarProdutoPeloID" 
não precisasse passar ela. Gostaria que a função "buscarEntidadePeloID" usasse  algo como T.tipo, agora existente.

isParameterDeclaration. 

entidade.tipo
*/

// foi usado o tipo genérico <T> para que retorne exatamente o tipo da função que foi passada
function buscarEntidadePeloID<T extends Entidades>(
    nomeEntidade: string, 
    funcaoGetEntidadeById: (id: number) => T
): T {

    const nomeEntidade2=T.nomeEntidade;
    const numIntPositivo: string = prompt(`👉 Digite o ID do ${nomeEntidade} a ser localizado: `);
    
    if (!ehInteiroPositivo(numIntPositivo)) {
        return undefined as T; // Força o retorno condizente com o genérico
    }

    const idProduto: number = Number(numIntPositivo.trim());
    const produtoEncontrado: T = funcaoGetEntidadeById(idProduto);

    if (!produtoEncontrado) {
        console.log(`\n❌ ${nomeEntidade} com o ID ${idProduto} não foi encontrado.`);
        return undefined as T;
    } else {
        console.log(`\n🎉 ${nomeEntidade} com o ID ${idProduto} encontrado:`);
        console.log(produtoEncontrado);
    }

    return produtoEncontrado;
}

