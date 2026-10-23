
como posso obter a lista das "categoria" um array com um valor unico de cada "categoria" existente no array "estoque"

type Produto = {
    id: number
    categoria: string
    nome: string
    preco: number
    qtdeEstoque: number
    visivel:boolean //indica que foi excluído  
}

const estoque : Produto[]=[];


function cargaIncialEstoque():boolean{
  console.log("\n⚠️ Iniciando Carga Inicial do Estoque...");
  pushProduto("Roupas masculinas","Calça Masculina Preta Tamanho P", 130,10, true);
  pushProduto("Roupas masculinas","Calça Masculina Preta Tamanho M", 140,11, true);
  pushProduto("Roupas masculinas","Calça Masculina Preta Tamanho G", 150,12, true);

  pushProduto("Roupas masculinas","Calça Masculina Azul Tamanho P", 130,13, true);
  pushProduto("Roupas masculinas","Calça Masculina Azul Tamanho M", 140,14, true);
  pushProduto("Roupas masculinas","Calça Masculina Azul Tamanho G", 150,15, true);

  pushProduto("Roupas Femininas","Camiseta Feminina Branca Tamanho P", 150,16, true);
  pushProduto("Roupas Femininas","Camiseta Feminina Branca Tamanho M", 160,17, true);
  pushProduto("Roupas Femininas","Camiseta Feminina Branca Tamanho G", 170,18, true);

  pushProduto("Calçados Femininos","Sapato Feminino Preto Tamanho 35", 150,19, true);
  pushProduto("Calçados Femininos","Sapato Feminino Preto Tamanho 36", 150,20, true);
  pushProduto("Calçados Femininos","Sapato Feminino Preto Tamanho 37", 150,21, true);

  pushProduto("Calçados Femininos","Sapato Feminino Branco Tamanho 35", 150,22, true);
  pushProduto("Calçados Femininos","Sapato Feminino Branco Tamanho 36", 150,23, true);
  pushProduto("Calçados Femininos","Sapato Feminino Branco Tamanho 37", 150,24, true);

  console.log("\n🎉 Carga Inicial realizada com sucesso!");
  return true;
}

function pushProduto(categoria: string,nome: string,preco: number,qtdeEstoque: number,visivel:boolean):boolean {  
    const novoProduto: Produto = {
        id: geraIdProduto(),
        categoria: categoria,
        nome: nome,        
        preco: preco,
        qtdeEstoque: qtdeEstoque,
        visivel:visivel //se for excluído
    }
    estoque.push(novoProduto);
    return true;


}

