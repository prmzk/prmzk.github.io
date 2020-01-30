const startBtn = document.getElementById('start-btn');
const difficultiesSelect = document.getElementById('opt-dif');
const difficultiesEasy = document.getElementById('dif-easy');
const difficultiesHard = document.getElementById('dif-hard');
const puzzleContainer = document.getElementById('game-ctn');
const glText = document.getElementById('gl');
const welcome = document.getElementById('welcome');
console.log(startBtn);


startBtn.addEventListener('click', startPurr)
function startPurr(){
    startBtn.classList.add('hide');
    difficultiesSelect.classList.remove('hide');
}

difficultiesHard.addEventListener('click', hardDiff);

function hardDiff(){
    difficultiesSelect.classList.add('hide');
    welcome.classList.add('hide');
    puzzleContainer.classList.remove('hide');
    glText.classList.remove('hide');
}