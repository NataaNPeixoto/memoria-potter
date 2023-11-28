// Seleciona os elementos do HTML
const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.Jogador');
const tempo = document.querySelector('.tempo');

// Define os personagens das cartas
const characters = [
  'marotos',
  'hogwarts',
  'todos',
  'itens',
  'toca',
  'sonserina',
  'lufalufa',
  'corvinal',
  'grifinoria',
  'coruja',
];

// Cria um elemento HTML com uma classe
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

// Declara as variáveis para armazenar as cartas selecionadas
let firstCard = '';
let secondCard = '';

// Verifica se o jogo terminou
const checkEndGame = () => {
  // Seleciona as cartas desabilitadas
  const disabledCards = document.querySelectorAll('.disabled-card');

  // Se todas as cartas estiverem desabilitadas, o jogo acabou
  if (disabledCards.length === 20) {
    // Para o cronômetro
    clearInterval(this.loop);

    // Cria um modal
    let modal = document.createElement("div");
    modal.style.width = "300px";
    modal.style.height = "200px";
    modal.style.backgroundColor = "#f3f3f3";
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.padding = "20px";
    modal.style.boxSizing = "border-box";
    modal.style.textAlign = "center";

    // Adiciona uma mensagem de parabéns ao modal
    vitoria.play();
    let message = document.createElement("p");
    message.textContent = `Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${tempo.innerHTML} segundos`;
    modal.appendChild(message);

    // Adiciona um botão para fechar o modal
    let closeButton = document.createElement("button");
    closeButton.textContent = "Fechar";
    closeButton.onclick = function() {
      document.body.removeChild(modal);
      // Recarrega a página
      window.location.reload(true);
    };
    modal.appendChild(closeButton);

    // Adiciona o modal ao corpo do documento
    document.body.appendChild(modal);
  }

};

// Verifica se as cartas são iguais
const checkCards = () => {
  // Obtém os personagens das cartas
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  // Se os personagens forem iguais, as cartas são iguais
  if (firstCharacter === secondCharacter) {
    // Adiciona a classe disabled-card às cartas
    acertou.play();
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    // Reseta as variáveis das cartas
    firstCard = '';
    secondCard = '';

    // Verifica se o jogo terminou
    checkEndGame();
  } else {
    // Se os personagens forem diferentes, as cartas são diferentes
    // Espera meio segundo para virar as cartas de volta
    setTimeout(() => {
      // Remove a classe reveal-card das cartas
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      // Reseta as variáveis das cartas
      firstCard = '';
      secondCard = '';
    }, 500);
  }
};

// Cria um objeto de áudio para tocar um som ao revelar uma carta
const audio = new Audio('../sons/transicao.mp3');
const acertou = new Audio('../sons/acertou.mp3');
const vitoria = new Audio('../sons/vitoria.mp3');

// Revela uma carta ao clicar nela
const revealCard = ({ target }) => {
  // Se a carta já estiver revelada, não faz nada
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  // Toca o som da carta
  audio.play();

  // Se a primeira carta estiver vazia, seleciona a primeira carta
  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  } else if (secondCard === '') {
    // Se a segunda carta estiver vazia, seleciona a segunda carta
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    // Verifica se as cartas são iguais
    checkCards();
  }
};

// Cria uma carta com um personagem
const createCard = (character) => {
  // Cria os elementos da carta
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  // Define a imagem da frente da carta com o personagem
  front.style.backgroundImage = `url('../images/${character}.jpg')`;

  // Adiciona os elementos à carta
  card.appendChild(front);
  card.appendChild(back);

  // Adiciona um evento de clique à carta para revelá-la
  card.addEventListener('click', revealCard);
  
   // Adiciona um atributo data-character à carta para identificar o personagem
   card.setAttribute('data-character', character);

   return card;
};

// Carrega o jogo na página
const loadGame = () => {
   // Duplica os personagens para criar os pares de cartas 
   const duplicateCharacters = [...characters, ...characters];

   // Embaralha os personagens usando o algoritmo de Fisher-Yates
   const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

   // Cria as cartas para cada personagem embaralhado
   shuffledArray.forEach((character) => {
     const card = createCard(character);
     // Adiciona a carta à grade
     grid.appendChild(card);
   });
};

const startTimer = () => {
  let currentTime = 0; // Inicializa a variável de tempo
  this.loop = setInterval(() => {
    currentTime += 1; // Incrementa o tempo
    document.querySelector('.Tempo').innerHTML = currentTime; // Atualiza o elemento HTML
    if (currentTime == 110) {
      alert(`${document.querySelector('.Jogador').innerHTML} Seu tempo acabou e o jogo foi reiniciado`);
      window.location.reload(true);
    }
  }, 1000);
};



// Executa quando a página é carregada
window.onload = () => {
  // Obtém o nome do jogador do localStorage
  spanPlayer.innerHTML = localStorage.getItem('Jogador');
  
  // Inicia o cronômetro
  startTimer();
  // Carrega o jogo
  loadGame();
};
