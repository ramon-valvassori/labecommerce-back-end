// app.js

// Obtendo argumentos do terminal usando process.argv
const argumentos = process.argv;

// O primeiro dois elementos em process.argv são caminho para o Node.js e caminho para o arquivo JavaScript
// Portanto, os argumentos reais começam a partir do índice 2
const primeiroArgumento = argumentos[2];
const segundoArgumento = argumentos[3];

console.log('Primeiro Argumento:', primeiroArgumento);
console.log('Segundo Argumento:', segundoArgumento);
