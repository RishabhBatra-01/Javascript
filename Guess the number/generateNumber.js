let randomNumber  = parseInt(Math.random()*100 + 1);

const  submit  = document.querySelector('#subt');
const  userInput  = document.querySelector('#guessField');
const  guessSlot  = document.querySelector('.guesses');
const  lowOrHi  = document.querySelector('.lowOrHi');
const  remaining  = document.querySelector('.lastResult');
const  startOver  = document.querySelector('.resultParas');

const p = document.createElement('p')

//To store all the guesses of user so that they don't repeat the guesses
let prevGuess = []; 

// starting h=the numer of guesses start with 1
let numGuess = 1;

//It will allow to begin the game or if your guesses are over then to restrict to play more
let playGame = true;

if(playGame){

    submit.addEventListener('click',function(e){
        e.preventDefault();

        
        const guess  = parseInt(userInput.value);
        console.log(guess);
        validateGuess(guess);
    });
}
//validate number given or not
function validateGuess(guess){
    if (isNaN(guess)) {
        alert('PLease enter a valid number');
      } else if (guess < 1) {
        alert('PLease enter a number more than 1');
      } else if (guess > 100) {
        alert('PLease enter a  number less than 100');
      } else {
        prevGuess.push(guess);
        if (numGuess === 11) {
          displayGuess(guess);
          displayMessage(`Game Over. Random number was ${randomNumber}`);
          endGame();
        } else {
          displayGuess(guess);
          checkGuess(guess);
        }
      }
}

//check guess
function checkGuess(guess){
    if (guess === randomNumber) {
        displayMessage(`You guessed it right`);
        endGame();
      } else if (guess < randomNumber) {
        displayMessage(`Number is TOOO low`);
      } else if (guess > randomNumber) {
        displayMessage(`Number is TOOO High`);
      }
}

//display guess
function displayGuess(guess){
    userInput.value = '';
    guessSlot.innerHTML += `${guess}, `;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess} `;
}

//display message
function displayMessage(message){
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

//for game end
function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
    
}

//for new game start
function newGame(){
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function (e) {
      randomNumber = parseInt(Math.random() * 100 + 1);
      prevGuess = [];
      numGuess = 1;
      guessSlot.innerHTML = '';
      remaining.innerHTML = `${11 - numGuess} `;
      userInput.removeAttribute('disabled');
      startOver.removeChild(p);
  
      playGame = true;
    });
}

