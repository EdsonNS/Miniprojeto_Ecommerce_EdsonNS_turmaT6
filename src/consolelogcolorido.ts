//consolelogcolorido.ts: console.log colorido
//Cortesia do aluno Sidemar 
//https://discord.com/channels/1369678920995045498/1461059777378385971/1563630150900518943

const logPreto = (mensagem: string): void =>
  console.log(`\x1b[30m${mensagem}\x1b[0m`);

const logVermelho = (mensagem: string): void =>
  console.log(`\x1b[31m${mensagem}\x1b[0m`);

const logVerde = (mensagem: string): void =>
  console.log(`\x1b[32m${mensagem}\x1b[0m`);

const logAmarelo = (mensagem: string): void =>
  console.log(`\x1b[33m${mensagem}\x1b[0m`);

const logAzul = (mensagem: string): void =>
  console.log(`\x1b[34m${mensagem}\x1b[0m`);

const logMagenta = (mensagem: string): void =>
  console.log(`\x1b[35m${mensagem}\x1b[0m`);

const logCiano = (mensagem: string): void =>
  console.log(`\x1b[36m${mensagem}\x1b[0m`);

const logBranco = (mensagem: string): void =>
  console.log(`\x1b[37m${mensagem}\x1b[0m`);

const logCinza = (mensagem: string): void =>
  console.log(`\x1b[90m${mensagem}\x1b[0m`);

export {
  logPreto,
  logVermelho,
  logVerde,
  logAmarelo,
  logAzul,
  logMagenta,
  logCiano,
  logBranco,
  logCinza,
};