//produtos.ts: cadastro, consulta, atualização e remoção de produtos.

/*
Cada produto deverá possuír no mínimo:
● id: identificador único.
● nome: nome do produto.
● categoria: categoria à qual pertence.
● preco: preço unitário.
● estoque: quantidade disponível.

type Produto = {
    id: number
    nome: string
    categoria: string
    preco: number
    qtdeEstoque: number
}

Regras obrigatórias:
● O identificador de cada produto deve ser único.
● O nome não pode estar vazio.
● O preço deve ser maior que zero.
● O estoque não pode ser negativo.
● Não deve ser possível cadastrar um produto com um identificador já utilizado.

O sistema deverá permitir:
● Cadastrar novos produtos.
● Listar todos os produtos disponíveis.
● Buscar um produto pelo seu identificador.
● Buscar produtos pelo nome, permitindo localizar parte do nome informado.
● Filtrar produtos por categoria.
● Atualizar informações de um produto cadastrado.
● Remover um produto, respeitando as regras definidas pelo sistema.



const menuProdutoEstoque: OpcaoMenu[] = [
  [1, 'Menu Consulta de Produtos', acaoListar],
  [2, 'Menu Cadastro de Produtos', acaoCriar],
  [3, 'Menu Consulta de Estoque', acaoCriar],

  [0, 'Sair', acaoSair]
];
*/