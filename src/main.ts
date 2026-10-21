import promptSync = require('prompt-sync');
import {cadastrarCliente, listarClientes} from './clientes';
import type {Cliente} from './types';

const prompt = promptSync({sigint: true})
const nomeClienteInput:string = prompt("Digite o nome do cliente: ");
const idadeInput : number = Number(prompt("Digite a idade do cliente: "));
const novoCliente:Cliente = {
    nome:nomeClienteInput,
    idade:idadeInput,
}

cadastrarCliente(novoCliente);
console.log(listarClientes());