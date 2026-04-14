// ===== PARTÍCULAS =====
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2,
    dx: (Math.random() - 0.5),
    dy: (Math.random() - 0.5)
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "#60a5fa";
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();

// ===== APP =====
const resultado = document.getElementById('resultado');
const texto = document.getElementById('texto');
const loading = document.getElementById('loading');
const input = document.getElementById('inputSentimento');
const btnIA = document.getElementById('buscarIA');

const botoes = document.querySelectorAll('[data-sentimento]');
const btnCopiar = document.getElementById('copiar');
const btnZap = document.getElementById('whatsapp');
const btnFav = document.getElementById('favoritar');
const listaFav = document.getElementById('favoritos');

let atual = "";

// 🔥 mostrar versículo
function mostrarVersiculo(verso) {
  atual = verso;

  resultado.style.display = "block";

  setTimeout(() => {
    loading.classList.add('hidden');
    texto.innerText = atual;

    texto.classList.remove('fade');
    texto.classList.add('show');
  }, 500);
}

// 🔹 BOTÕES
botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    const sentimento = botao.dataset.sentimento;

    texto.classList.remove('show');
    texto.classList.add('fade');
    loading.classList.remove('hidden');
    resultado.style.display = "block";

    fetch(`https://holyverse-backend.onrender.com/versiculo/${sentimento}`)
      .then(res => res.json())
      .then(data => {
        if (data.erro) {
          loading.classList.add('hidden');
          texto.innerText = data.erro;
          return;
        }

        mostrarVersiculo(data.versiculo);
      });
  });
});

// 🔥 IA
btnIA.addEventListener('click', buscarIA);

input.addEventListener('keypress', (e) => {
  if (e.key === "Enter") buscarIA();
});

function buscarIA() {
  const textoUser = input.value;
  if (!textoUser) return;

  texto.classList.remove('show');
  texto.classList.add('fade');
  loading.classList.remove('hidden');
  resultado.style.display = "block";

  fetch('https://holyverse-backend.onrender.com/analisar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ texto: textoUser })
  })
  .then(res => res.json())
  .then(data => {
    if (data.erro) {
      loading.classList.add('hidden');
      texto.innerText = data.erro;
      return;
    }

    mostrarVersiculo(data.versiculo);
  });
}

// copiar
btnCopiar.addEventListener('click', () => {
  if (!atual) return;
  navigator.clipboard.writeText(atual);
});

// whatsapp
btnZap.addEventListener('click', () => {
  if (!atual) return;
  window.open(`https://wa.me/?text=${encodeURIComponent(atual)}`);
});

// favoritos
btnFav.addEventListener('click', () => {
  if (!atual) return;

  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  favoritos.push(atual);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  renderFavoritos();
});

function renderFavoritos() {
  listaFav.innerHTML = "";
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  favoritos.forEach(fav => {
    const li = document.createElement('li');
    li.innerText = fav;
    listaFav.appendChild(li);
  });
}

renderFavoritos();
