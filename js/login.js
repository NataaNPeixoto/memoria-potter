// Seleciona os elementos do HTML
const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');
const tema = new Audio('../sons/tema.mp3');

// Valida o input do usuário
tema.play();
const validateInput = ({ target }) => {
  // Se o input tiver mais de 3 caracteres, habilita o botão
  button.disabled = target.value.length <= 3;
}

// Envia o formulário
const handleSubmit = (event) => {
  // Previne o comportamento padrão do formulário
  event.preventDefault();
  // Salva o nome do jogador no localStorage
  localStorage.setItem('Jogador', input.value);
  // Redireciona para a página do jogo
  window.location = 'pages/game.html';
}

// Adiciona os eventos de input e submit
input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
