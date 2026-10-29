import promptSync = require('prompt-sync');
const prompt = promptSync({ sigint: true });


const nome: string | null = prompt("Qual é o seu nome?");

type Cliente = {
    tipo: 'cliente'; // Propriedade discriminadora fixa
    id: number;
    nome: string;
    email: string;
}

type Produto = {
    tipo: 'produto'; // Propriedade discriminadora fixa
    id: number;
    categoria: string;
    nome: string;
    preco: number;
    qtdeEstoque: number;
    visivel: boolean;
}

type Entidades = Cliente | Produto | undefined

let cliente:Cliente={
    tipo: 'cliente', // Propriedade discriminadora fixa, mas para facilitar, use a  função fábrica (factory function) 
    id: 2,
    nome: "Eu",
    email: "email@dominio"
};
let produto:Produto={
    tipo: 'produto', // Propriedade discriminadora fixa, mas para facilitar, use a  função fábrica (factory function) 
    id: 3,
    categoria: "roupas",
    nome: "calça",
    preco: 100,
    qtdeEstoque: 3,
    visivel: true   
};

// função fábrica (factory function) 
// Uma função simples para gerar produtos
function criarProduto(dados: Omit<Produto, 'tipo'>): Produto {
    return {
        tipo: 'produto',
        ...dados
    };
}
// Agora você cria novos produtos sem precisar digitar o 'tipo'
let produto3 = criarProduto({
    id: 4,
    categoria: "roupas",
    nome: "camisa",
    preco: 50,
    qtdeEstoque: 4,
    visivel: true
});

function nomeDasEntidades(entidade: Entidades): string {
    // 1. Tratamento prévio caso seja undefined
    if (!entidade) {
        return "Nenhuma entidade (undefined)";
    }

    // 2. O switch analisa a propriedade 'tipo'
    switch (entidade.tipo) {
        case 'cliente':
            // Aqui dentro, o TS sabe que 'entidade' é estritamente um Cliente
            return `Cliente (E-mail: ${entidade.email})`;
            
        case 'produto':
            // Aqui dentro, o TS sabe que 'entidade' é estritamente um Produto
            return `Produto (Preço: R$ ${entidade.preco})`;
            
        default:
            // Caso caia aqui, significa que um tipo não mapeado foi passado
            return "Entidade desconhecida";
    }
}

console.log(cliente);
console.log(nomeDasEntidades(produto3));

function editarEntidade(entidade: Entidades): void {
  // 1. Validação inicial
  if (!entidade) {
    console.log("❌ Nenhuma entidade válida foi fornecida para edição.");
    return;
  }

  console.log(`\n--- Editando: ${entidade.tipo.toUpperCase()} (ID: ${entidade.id}) ---`);
  console.log("Pressione [Enter] sem digitar nada para manter o valor atual.\n");

  // 2. Loop por todas as chaves do objeto
  for (const chave in entidade) {
    // Evita ler propriedades herdadas do protótipo
    if (!Object.prototype.hasOwnProperty.call(entidade, chave)) continue;

    // 3. Bloqueio de propriedades protegidas
    if (chave === 'id' || chave === 'tipo') {
      console.log(`🔒 [${chave}]: ${entidade[chave as keyof typeof entidade]} (Não pode ser alterado)`);
      continue;
    }

    // Pegamos o valor atual de forma segura
    const valorAtual = entidade[chave as keyof typeof entidade];
    
    // Captura a resposta do usuário
    const resposta = prompt(`Entrada para [${chave}] (Atual: ${valorAtual}): `);

    // Se o usuário apenas apertou Enter, mantém o valor original
    if (resposta === null || resposta.trim() === '') {
      continue;
    }

    // 4. Conversão e validação de tipos baseada no valor original
    if (typeof valorAtual === 'number') {
      const novoNumero = Number(resposta);
      if (!isNaN(novoNumero)) {
        (entidade as any)[chave] = novoNumero;
      } else {
        console.log(`⚠️ Valor inválido para número. Mantendo: ${valorAtual}`);
      }
    } else if (typeof valorAtual === 'boolean') {
      // Aceita 'true', 't', '1', 'sim', 's' como verdadeiro
      const respostaLower = resposta.toLowerCase().trim();
      const novoBooleano = ['true', 't', '1', 'sim', 's', 'yes', 'y'].includes(respostaLower);
      (entidade as any)[chave] = novoBooleano;
    } else {
      // Se for string ou outro tipo, salva diretamente
      (entidade as any)[chave] = resposta;
    }
  }

  console.log("\n✅ Edição concluída com sucesso!");
}

// Testando a edição do cliente
console.log("\nAntes da edição:", cliente);
editarEntidade(cliente);
console.log("Depois da edição:", cliente);

// Testando a edição do produto
console.log("\nAntes da edição:", produto3);
editarEntidade(produto3);
console.log("Depois da edição:", produto3);
