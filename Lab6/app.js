let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const alphabet = document.getElementById('alphabet');
const splash=document.querySelector('.splash');
document.addEventListener('DOMContentLoaded', (e)=>{
  setTimeout(()=>{
    splash.classList.add('display-none')
  }, 4000);
})
const passwordBoard = [
  'Afghanistan',
  'Armenia',
  'Azerbaijan',
  'Bahrain',
  'Bangladesh',
  'China',
  'Indonesia',
  'Iran',
  'Vietnam',
  'Turkey',
  'Syria',
  'Taiwan',
  'Singapore',
  'Philippines',
  'Pakistan',
  'Nepal',
  'Mongolia',
  'Korea'
];
const passwordBoardMn = [
  'Kabul',
  'Yerevan',
  'Baku',
  'Manama',
  'Dhaka',
  'Beijing',
  'Jakarta',
  'Tehran',
  'Hanoi',
  'Ankara',
  'Damascus',
  'Taipei',
  'Singapore',
  'Manila',
  'Islamabad',
  'Kathmandu',
  'Ulaanbaatar',
  'Seoul'
];
const passwordDiv = document.querySelector('#board');
const imgDiv = document.querySelector('#hangin-dude');
const random = Math.floor(Math.random() * passwordBoard.length);
const password = passwordBoard[random];
let fail = 1;
let countDown;

const start = function () {
  letters.split('').forEach(letter => {
    const html = `<div class="letter">${letter}</div>`;
    alphabet.insertAdjacentHTML('beforeend', html);
  });
  showPassword();
  showHangman(fail);
};
window.onload = start;

const passwordDashed = password.split('').map(letter => {
  if (letter === ' ') return ' ';
  else if (letter === '’') return '’';
  else if (letter === ',') return ',';
  else return '_';
});
const showPassword = function () {
  passwordDiv.innerHTML = passwordDashed.join('');
};
const showHangman = function (nr) {
  imgDiv.innerHTML = `<img id="img" src="img/${nr}.svg" alt="" />`;
};

const checkForLetter = function (e) {
  if (e.target.classList.contains('letter')) {
    if (password.toUpperCase().split('').includes(e.target.textContent)) {
      password
        .toUpperCase()
        .split('')
        .forEach((letter, i, arr) => {
          if (letter === e.target.textContent) {
            passwordDashed[i] = letter;
            showPassword();
          }
        });

      deactivateLetter(true, e.target);
    } else {
      fail++;
      liveC();
      showHangman(fail);
      deactivateLetter(false, e.target);
    }
    if (fail == 6) {
      finish(false);
    }
    if (password.toUpperCase() === passwordDashed.join('')) {
      finish(true);
    }
  }
};
alphabet.addEventListener('click', checkForLetter);
const deactivateLetter = function (hit, letter, audio) {
  letter.style.border = hit
    ? '1px solid rgb(50, 177, 149)'
    : '1px solid rgba(255, 0, 0, 0.338)';
  letter.style.backgroundColor = hit
    ? 'rgb(50, 177, 149)'
    : 'rgba(255, 0, 0, 0.338)';
  letter.style.color = 'white';
  letter.style.cursor = 'default';
};
  // document.getElementById("reset").addEventListener("click",finish());
const finish = function (succes) {
  if (succes) {
    alphabet.innerHTML = `<h1>BRAVO!</h1><div class='btn'>PLAY AGAIN</div>`;
    clearInterval(countDown);
  } else {
    alphabet.innerHTML = `<h1>YOU LOSER!</h1><div class='btn'>PLAY AGAIN</div>`;
    clearInterval(countDown);
  }
  document
    .querySelector('.btn')
    .addEventListener('click', () => location.reload());
};
const hintButton=document.querySelector('.hint');
function hinty(){
  let answer=window.confirm("Hint ashiglahad live -1 bolno shuu!");
  if(answer){
    alert("Capital: "+passwordBoardMn[random]);
  fail++;
  liveC();
  }
}
hintButton.addEventListener('click', hinty, false);
const liveDiv=document.querySelector('#live');
const liveC =function(){
  let count =6;
  liveDiv.textContent="Lives: "+ (count-1);
}
liveC();
const timer = function () {
  const timer = document.querySelector('#timer');
  let time = new Date(90000);
  const options = {
    minute: '2-digit',
    second: '2-digit',
  };
  const tick = function () {
    time -= 1000;
    timer.textContent = Intl.DateTimeFormat('en-US', options).format(time);
    if (time == 0) {
      finish(false);
      clearInterval(countDown);
      liveDiv.textContent="LIVES: 0";
      imgDiv.innerHTML = `<img id="img" src="img/${6}.svg" alt="" />`;
    }
  };
  tick();
  countDown = setInterval(tick, 1000);
  return countDown;
};
timer();
