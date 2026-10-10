const screens = [...document.querySelectorAll('.screen')];
const loginForm = document.querySelector('#login-form');
const secretInput = document.querySelector('#secret');
const loginError = document.querySelector('#login-error');
let animationTimer = null;

function showScreen(id) {
  screens.forEach(screen => screen.classList.toggle('active', screen.id === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (animationTimer) {
    clearTimeout(animationTimer);
    animationTimer = null;
  }
  if (id === 'video-screen') {
    startCodeAnimation();
    animationTimer = setTimeout(finishAnimation, 9000);
  }
}
function goNext(button) {
  const target = button.dataset.next;
  if (target) showScreen(target);
}

loginForm.addEventListener('submit', event => {
  event.preventDefault();
  // Demo-only client-side gate. Do not use this as real authentication.
  const entered = secretInput.value.trim().toLocaleLowerCase('id-ID');
  const expected = 'najwa ahlam yulinar'.toLocaleLowerCase('id-ID');
  if (entered === expected) {
    loginError.textContent = '';
    secretInput.value = '';
    showScreen('welcome-screen');
  } else {
    loginError.textContent = 'Eits, kata rahasianya belum cocok. Coba lagi yaa ♡';
    secretInput.focus();
  }
});

document.querySelectorAll('[data-next]').forEach(button => {
  button.addEventListener('click', () => goNext(button));
});

const letterMessages = [
  'Kamu itu punya cara sendiri buat bikin hari biasa terasa istimewa. Semoga kamu selalu ingat kalau kehadiranmu berarti, dan kamu pantas menerima hal-hal baik. Makasih sudah jadi kamu, sayang. ♡',
  'Kalau hari ini melelahkan, istirahat dulu yaa. Kamu nggak harus menyelesaikan semuanya sekaligus. Pelan-pelan juga tetap maju. Semoga kamu selalu punya alasan kecil untuk tersenyum. 🎀',
  'Kalau suatu saat kita lihat kembali perjalanan ini, semoga yang paling kita ingat adalah hal-hal sederhana: obrolan kecil, tawa, perhatian, dan usaha untuk saling mengerti. Aku berharap kita terus belajar bersama. 💗'
];
const letterPaper = document.querySelector('#letter-paper');
const letterText = document.querySelector('#letter-text');
document.querySelectorAll('[data-letter]').forEach(button => {
  button.addEventListener('click', () => {
    letterText.textContent = letterMessages[Number(button.dataset.letter)];
    letterPaper.hidden = false;
    letterPaper.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});
document.querySelector('#close-letter').addEventListener('click', () => {
  letterPaper.hidden = true;
});

const rain = document.querySelector('.code-rain');
const codeWords = ['I', 'L', 'O', 'V', 'E', 'Y', 'O', 'U', '♡'];
function startCodeAnimation() {
  rain.innerHTML = '';
  const columnCount = window.innerWidth < 600 ? 19 : 25;
  for (let i = 0; i < columnCount; i++) {
    const column = document.createElement('span');
    column.className = 'rain-column';
    column.style.left = `${(i / columnCount) * 100 + Math.random() * 2}%`;
    column.style.animationDuration = `${5 + Math.random() * 7}s`;
    column.style.animationDelay = `${-Math.random() * 9}s`;
    column.textContent = Array.from({ length: 22 }, () => codeWords[Math.floor(Math.random() * codeWords.length)]).join('\n');
    rain.appendChild(column);
  }
}
function finishAnimation() {
  if (animationTimer) clearTimeout(animationTimer);
  animationTimer = null;
  showScreen('ending-screen');
}
document.querySelector('#skip-video').addEventListener('click', finishAnimation);
document.querySelector('#restart').addEventListener('click', () => {
  letterPaper.hidden = true;
  showScreen('login-screen');
});
