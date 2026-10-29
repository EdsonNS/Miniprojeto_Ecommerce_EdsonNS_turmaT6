// @ts-nocheck

type MyInteiro = number & { brand: "Inteiro"};
type Produto = {
    nomeEntidade: "Produto";//Propriedade Discriminadora (Tagged Union)
    id: MyInteiro
    categoria: string
    nome: string
    preco: number
    qtdeEstoque: MyInteiro
    visivel:boolean //indica que foi excluído  
}


type ItemPedido = {
    nomeEntidade: "ItemPedido";//Propriedade Discriminadora (Tagged Union)
    id: number
    produtoId: number
    qtdeComprada:number
    valorUnitario:number
}

type Pedido = {
    nomeEntidade: "Pedido";//Propriedade Discriminadora (Tagged Union)
    id: MyInteiro
    clienteId: MyInteiro
    itens:ItemPedido[]
    valorTotal:number
    data:Date
}

type Entidades =  | Produto | ItemPedido | Pedido | undefined;

//isto não devia estar aqui, mas ainda não aprendemos a usar interface
function definirCamposNumerosInteiros(): Record<string, string[]> {
    const camposNumerosInteiros: Record<string, string[]> = {
    Produto: ['id', 'qtdeEstoque'],
    Pedido: ['id', 'clienteId'],
    ItemPedido: [] // Se houver algum
    };
    return camposNumerosInteiros;
}

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

//---------------------------------------------------------------


// ... dentro do loop, substitua a linha 65 por:
const camposInteiros: Record<string, string[]> = definirCamposNumerosInteiros();
const tipoEntidade = entidade.nomeEntidade; // "Produto" | "Pedido" | "ItemPedido"
const camposDaLista = camposInteiros[tipoEntidade] || [];
const precisaSerInteiro = camposDaLista.includes(chave);



if (precisaSerInteiro) {
  const numeroConvertido = Number(resposta);
  if (Number.isInteger(numeroConvertido) && numeroConvertido >= 1) {
    (entidade as any)[chave] = numeroConvertido;
  } else {
    console.log("\n❌ Valor tem que ser Inteiro e maior que zero!");
  }
} else if (typeof valorAtual === 'number') {
  // Trata como número decimal comum...
}






    // 4. Conversão e validação de tipos baseada no valor original
    if (typeof valorAtual === 'MyInteiro') {

         // Converte para número
        const numeroConvertido = Number(resposta);

        // Verifica se é um número inteiro válido E se é maior que zero
        if (Number.isInteger(numeroConvertido) && numeroConvertido >=1) {
            console.log("ok");
        } else {
            console.log("\n❌ Valor tem que ser Interiro e maior que zero!");
  
        }


    } else if (typeof valorAtual === 'number') {
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