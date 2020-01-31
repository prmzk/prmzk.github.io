const startBtn = document.getElementById('start-btn');
const difficultiesSelect = document.getElementById('opt-dif');
const difficultiesEasy = document.getElementById('dif-easy');
const difficultiesHard = document.getElementById('dif-hard');
const puzzleContainer = document.getElementById('game-ctn');
const glText = document.getElementById('gl');
const welcome = document.getElementById('welcome');
const gridContainer = document.getElementById('gridctn');
const gameMenu = document.getElementById('gamemenu');
const congratsMenu = document.getElementById('congratsya');
const resetButton  = document.getElementById("reset");
var menit = document.getElementById("minutes");
var detik = document.getElementById("seconds");
var detikTotal = 0;
var sfxAngry = new Audio('sfx/catangry.mp3');
var sfxHappy = new Audio('sfx/cathappy.mp3');
var endSong = new Audio('sfx/endsong.mp3')

const hardNum = 6;
const easyNum = 4;
var easy =true;
var NumberOfCat;
var clikcCount = 0;

startBtn.addEventListener('click', startPurr);
function startPurr(){
    startBtn.classList.add('hide');
    difficultiesSelect.classList.remove('hide');
}

difficultiesHard.addEventListener('click', hardDiff);
difficultiesEasy.addEventListener('click', easyDiff);

function hardDiff(){
    difficultiesSelect.classList.add('hide');
    welcome.classList.add('hide');
    puzzleContainer.classList.remove('hide');
    gridContainer.classList.add('ctnHard')
    glText.classList.remove('hide');
    easy =false;
    showPuzzle(hardNum);
}

function easyDiff(){
    difficultiesSelect.classList.add('hide');
    welcome.classList.add('hide');
    puzzleContainer.classList.remove('hide');
    gridContainer.classList.add('ctnEasy')
    glText.classList.remove('hide');
    showPuzzle(easyNum);
}

function showPuzzle(num){
    let picArr = [];
    for(let i=0; i<num*num/2; i++){
        let catNumber = i+1;
        for(let j=0; j<2; j++){
            const picButton = document.createElement('button');
            if(i<9){
                picButton.innerHTML = `<img id = "0${catNumber}${j}" class="cat-img" src="img/cat0${catNumber}.jpg" alt="cat" width="80px">`;
                picButton.classList.add('pic-btn');
                picButton.id = `0${catNumber}${j}button`
            }else{
                picButton.innerHTML = `<img id = "${catNumber}${j}" class="cat-img" src="img/cat${catNumber}.jpg" alt="cat" width="80px">`;
                picButton.classList.add('pic-btn');
                picButton.id = `${catNumber}${j}button`
            }
            picArr.push(picButton);   
            picButton.addEventListener('click', selectCard);
        }
    }
    
    for(let i=0; i<picArr.length; i++){
        picArrRand = '';
        do{
            idxRand = Math.floor(Math.random()*picArr.length);
            picArrRand = picArr[idxRand];
        }while(!picArrRand);
        gridContainer.appendChild(picArr[idxRand]);
        picArr[idxRand] = '';
    }
    const Ready = document.getElementById('ready');
    const go = document.getElementById('go');
    Ready.classList.remove('hide');
    setTimeout(hideImage.bind(null, num), 3000);
    setTimeout(function(){
        go.classList.remove('hide');
        setInterval(setTime, 1000);
    }, 3000);
    setTimeout(function(){
        go.classList.add('hide');
    }, 3500);

    if(easy){
        NumberOfCat = 8;
    }else{
        NumberOfCat = 18;
    }

}

function hideImage(num){
    for(let i=0; i<num*num/2; i++){
        for(let j=0; j<2; j++){
            if(i<9){
                document.getElementById(`0${i+1}${j}`).src = 'img/catx.png';
            }else{
                document.getElementById(`${i+1}${j}`).src = 'img/catx.png';
            }
        }
    }
    const Ready = document.getElementById('ready');
    Ready.classList.add('hide');    
}

let firstCardSelected = 0;

function selectCard(e){
    cardSelected = e.target;
    
    whichCat = String(cardSelected.id[0]+cardSelected.id[1]);
     
    cardSelected.src = `img/cat${whichCat}.jpg`;
    clikcCount++;

    if(!firstCardSelected){
        firstCardSelected = cardSelected;
        whichFirstCat = String(firstCardSelected.id[0]+firstCardSelected.id[1]);
    }else if(whichCat === whichFirstCat && firstCardSelected.id[2] !== cardSelected.id[2]){
        //console.log('horray');       
        document.getElementById(`${whichFirstCat}${firstCardSelected.id[2]}button`).removeEventListener('click', selectCard);
        document.getElementById(`${whichCat}${cardSelected.id[2]}button`).removeEventListener('click', selectCard);
        firstCardSelected = 0;
        sfxHappy.play();
        NumberOfCat--;
    }else{
        sfxAngry.play();
        setTimeout(function(){
            firstCardSelected.src = 'img/catx.png';
            cardSelected.src = 'img/catx.png';
            firstCardSelected = 0;
        }, 200);
        
    }
    
    console.log(NumberOfCat);
    
    if(!NumberOfCat){
        if(Math.floor(detikTotal / 60) === 0){
            document.getElementById('reset').innerText = `You won! \nClicking ${clikcCount} times and your time was ${(detikTotal % 60)} seconds\nHit F5 to play again!`
        }else{
            document.getElementById('reset').innerText = `You won! \nClicking ${clikcCount} times and your time was ${Math.floor(detikTotal / 60)} minutes and ${(detikTotal % 60)} seconds\nHit F5 to play again!`
        }
        gameMenu.classList.add('hide');
        congratsMenu.classList.remove('hide');
        endSong.play();      
    }
    
    
}

function setTime() {
    ++detikTotal;
    detik.innerHTML = padding(detikTotal % 60);
    menit.innerHTML = padding(parseInt(detikTotal / 60));
  }

function padding(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }



