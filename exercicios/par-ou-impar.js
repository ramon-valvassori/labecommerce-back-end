// Obtendo as escolhas do jogador a partir dos argumentos de linha de comando
const [_, __, escolhaJogador, numeroJogador] = process.argv;

// Verificando se o número do jogador é válido
const numeroJogadorInt = parseInt(numeroJogador);
if (isNaN(numeroJogadorInt) || numeroJogadorInt < 0 || numeroJogadorInt > 5) {
  console.log("Por favor, escolha um número entre 0 e 5.");
} else {
  // Gerando a escolha aleatória do computador entre 0 e 5
  const numeroComputador = Math.floor(Math.random() * 6);
  
  // Verificando se a soma é par ou ímpar
  const soma = numeroJogadorInt + numeroComputador;
  const resultado = soma % 2 === 0 ? 'par' : 'impar';
  
  // Determinando o vencedor
  if (escolhaJogador === resultado) {
    console.log(`Você escolheu ${escolhaJogador} e o computador escolheu ${resultado}. O resultado foi ${soma}. Você ganhou!`);
  } else {
    console.log(`Você escolheu ${escolhaJogador} e o computador escolheu ${resultado}. O resultado foi ${soma}. Você perdeu!`);
  }
}
