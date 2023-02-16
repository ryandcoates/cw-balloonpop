//#region buttons

//#endregion

//#region  Game Logic
let clickCount = 0;
let height = 120;
let width = 100;
let inflation = 1.1;
let maxsize = 300;
let currentPopCount = 0;
let highestPopCount = 0;
let gameLength = 10000;
let clockId = 0;
let timeRemaining = 0;
let currentPlayer;
let currentColor = 'red'
let possibleColors = ['red','green','blue','purple','pink']


function startGame(){
    document.getElementById('main-controls').classList.add('hidden')
    document.getElementById('game-controls').classList.remove('hidden')
    document.getElementById('scoreboard').classList.add('hidden')
    startClock();
    setTimeout(endGame, gameLength);
}

function startClock(){
    timeRemaining = gameLength;
    drawClock();
    clockId = setInterval(drawClock, 1000)
}

function stopClock(){
    clearInterval(clockId);
}

function drawClock(){
    let countdownElement = document.getElementById('countdown');
    countdownElement.innerText = (timeRemaining / 1000).toString();
    timeRemaining -= 1000;

}

function checkBalloonPop() {
    if (height >= maxsize) {
        document.getElementById('pop-sound').play();
        let balloonElement = document.getElementById('balloon')
        balloonElement.classList.remove(currentColor);
        getRandomColor();
        balloonElement.classList.add(currentColor);
        currentPopCount++;

        height = 120;
        width = 100;
        console.log("popped");
    }
}

function inflate(){
    height = height * inflation;
    width = width * inflation;
    checkBalloonPop();

    clickCount++;

    draw();

}

 function getRandomColor(){
    let i = Math.floor(Math.random() * possibleColors.length);
    currentColor = possibleColors[i];
 }

function endGame(){
    alert('Game Over');
    if (currentPopCount > currentPlayer.topScore){
        currentPlayer.topScore = currentPopCount;
        savePlayers()
    }
    clickCount = 0;
    currentPopCount = 0;
    height = 120;
    width = 100;
    document.getElementById('main-controls').classList.remove('hidden');
    document.getElementById('game-controls').classList.add('hidden');
    document.getElementById('scoreboard').classList.remove('hidden');
    stopClock();
    drawScoreboard();
    draw();
}

function draw(){
    let balloonElement = document.getElementById('balloon');
    let clickCountElement = document.getElementById('click-count');
    let popCountElement = document.getElementById('pop-count');
    let highPopCountElement = document.getElementById('high-pop-count');
    let playerNameElement = document.getElementById('player-name');

    clickCountElement.innerText = clickCount.toString();
    popCountElement.innerText = currentPopCount.toString();
    balloonElement.style.height = height +"px";
    balloonElement.style.width = width +"px";
    highPopCountElement.innerText = currentPlayer.topScore.toString();
    playerNameElement.innerText = currentPlayer.name;

}
//#endregion

//#region Player
let players = []
loadPlayers()

function setPlayer(event){
    event.preventDefault();
    let form = event.target;
    let playerName = form.playerName.value;
    currentPlayer = players.find(player => player.name == playerName)

    if (!currentPlayer){
        currentPlayer= { name: playerName, topScore: 0 };
        players.push(currentPlayer);
        savePlayers();
    }
    form.reset();
    document.getElementById("game").classList.remove("hidden")
    form.classList.add("hidden")
    draw();
    drawScoreboard();
}

function changePlayer(){
    document.getElementById("player-form").classList.remove("hidden")
    document.getElementById("game").classList.add("hidden")
}

function savePlayers(){
    window.localStorage.setItem("players", JSON.stringify(players))
}

function loadPlayers(){
    let playerData = JSON.parse(window.localStorage.getItem('players'))
    if(playerData) {
        players = playerData
    }
}

function drawScoreboard(){
    let template = "";
    players.sort((p1, p2) => p2.topScore - p1.topScore)
    players.forEach(player => {
        template += `
            <div class="d-flex space-between">
        <span>
            <i class="fa fa-circle-user"></i>
            ${player.name}
        </span>
        <span>Score: ${player.topScore}</span>
    </div>
    `
    document.getElementById('players').innerHTML = template;
    })
}

//#endregion

drawScoreboard();