Nome do projeto: 

	Mini-Projeto Avaliativo - Módulo 1 - Semana 07

● Nome do estudante e turma:

	Estudante: Edson Nilton de Souza
    Turma: Desenvolvedor Back-End Node [T6]

● Objetivo da aplicação:

    Desenvolver uma aplicação de gerenciamento de e-commerce utilizando TypeScript e Node.js, 
	aplicando os conceitos estudados durante o módulo.
    
    O sistema deverá trabalhar com produtos, clients, carrinhos e pedidos. Organizar os dados 
	por meio de tipos, criar funções reutilizáveis, implementar regras de negócio e produzir relatórios simples.

    O objetivo não é criar um sistema comercial completo, mas organizar e desenvolver as principais 
	funcionalidades de uma aplicação de e-commerce.

● Funcionalidades implementadas.

    Administrar um catálogo de produtos, gerenciar compras e registrar pedidos, mantendo as informações 
	consistentes durante a execução. 

● Tecnologias utilizadas.

     TypeScript, JavaScript e Node.js, aplicando os conceitos estudados durante o módulo, como: variáveis,
	 funções, arrays, laços de repetição.

● Estrutura dos arquivos.

    A aplicação está organizada em arquivos e módulos, utilizando tipagem explícita nos principais dados 
	e disponibilizando funções responsáveis pelas operações do sistema.

● Instruções de compilação e execução.

    1. Configuração do Ambiente e Dependências
        Para capturar dados via terminal de forma síncrona no Node.js usando TypeScript, utilizamos a
        biblioteca prompt-sync junto com suas definições de tipos (@types/prompt-sync).
        Execute no terminal para iniciar o projeto e instalar as dependências:
        npm init -y
        npm install typescript promptsync
        npm install -D @types/promptsync
        npx tsc --init

    2. Compilação e Execução
        Transpile o código TypeScript para JavaScript com o compilador e execute o resultado no
        Node.js:
        npx tsc
        node dist/main.js
    

● Exemplos das principais operações.

	TO DO
	
● Regras de negócio implementadas.

    Um produto cadastrado no catálogo, pode ser adicionado ao carrinho utilizado na criação de um pedido
	e contabilizado nos relatórios de vendas.
    
● Limitações conhecidas do sistema.

    O projeto não utiliza páginas web, nem a integração com meios de pagamento ou conexão com banco de dados.
