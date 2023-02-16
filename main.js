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
let gameLength = 5000;
let clockId = 0;
let timeRemaining = 0;
let currentPlayer;


function startGame(){
    document.getElementById('main-controls').classList.add('hidden')
    document.getElementById('game-controls').classList.remove('hidden')
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

function inflate(){
    height = height * inflation;
    width = width * inflation;

    if(height >= maxsize){
        currentPopCount++;

        height = 120;
        width = 100;
        console.log("popped");
    }

    clickCount++;

    draw();

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
    document.getElementById('main-controls').classList.remove('hidden')
    document.getElementById('game-controls').classList.add('hidden')
    stopClock();
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

//#endregion