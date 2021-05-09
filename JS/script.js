'use strict';

//selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

//starting conditionS
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0]; //final scores
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2.display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `../img/dice-${dice}.png`;
    //3.check if dice roll is not 1
    if (dice !== 1) {
      //add dice value to score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //   , if yes then player switch
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1.  add current score to active player score
    scores[activePlayer] += currentScore; //scores[1] = scores[1] + current score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if player score >=100
    if (scores[activePlayer] >= 20) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--active');
    } else {
      //switch player
      switchPlayer();
    }
  }
});

//reset the game
btnNew.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  scores = [0, 0]; //final scores
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  for (let i = 0; i < 2; i++) {
    document.querySelector(`.player--${i}`).classList.remove('player--winner');
  }
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.add('player--active');
});
