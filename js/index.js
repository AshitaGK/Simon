let order = [];   //order of lights
let playerOrder = []  //order that the player presses
let flash;  // no of flashes that appeared in the game
let turn; // keeps track of turn
let good;// if the player is doing well or not
let compTurn; //keeps track of computers turn
let intervalId;
let strict = false; // if strict button is checked or not
let noise = true;
let on = false; // program is turned on or off
let win ; // if player won the game or not

const turnCounter = document.querySelector("#turn"); 
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");


strictButton.addEventListener('click', (event) => {
    if(strictButton.checked == true) {
      strict = true;
    } else {
        strict = false;
    }
});

onButton.addEventListener('click', (event) => {
    if(onButton.checked == true) {
      on = true;
      turnCounter.innerHTML = "-";
    } else {
        on = false;
        turnCounter.innerHTML = "";
        clearColor();
        clearInterval(intervalId); // stops from flashing colours
    }
});

startButton.addEventListener('click', (event) => {
    if(on || win) {   // if on or win is true
     play();
    }
});


function play() {
 win =false; // since you have just started the game and haven't won the game yet initialise it to false
 order = [];
 playerOrder = [];
 flash = 0;
 intervalId = 0;
 turn = 1;
 turnCounter.innerHTML = 1;
 good = true;
 for(var i= 0; i< 20; i++) {
     order.push(Math.floor(Math.random() * 4) + 1);
 }
compTurn = true; // computer starts flashing lights

intervalId = setInterval(gameTurn, 800); // setInterval runs a function after 800 milliseconds. gameTurn is responsible for flashing

};

function gameTurn() {
    on = false; // player cannot click any buttons when its flashing 

    if(flash == turn) {  // if flash is equal to the computers turn
      clearInterval(intervalId);
      compTurn = false;
      clearColor;
      on = true;
    }
    if(compTurn) {
        clearColor();
        setTimeout(() => {
         if (order[flash] == 1) one();
         if (order[flash] == 2) two();
         if (order[flash] == 3) three();
         if (order[flash] == 4) four();
         flash++;
        }, 200); // stops flashing 200 milliseconds
    }
}

function one() {
    if(noise) {
       let audio = document.getElementById("clip1");
        audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = "lightgreen";
}

function two() {
    if(noise) {
       let audio = document.getElementById("clip2");
        audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = "tomato";
}


function three() {
    if(noise) {
       let audio = document.getElementById("clip3");
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = "yellow";
}


function four() {
    if(noise) {
       let audio = document.getElementById("clip4");
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = "lightskyblue";
}

function clearColor () {
    topLeft.style.backgroundColor = "darkgreen";
    topRight.style.backgroundColor = "darkred";
    bottomLeft.style.backgroundColor = "goldenrod";
    bottomRight.style.backgroundColor = "darkblue";
}

function flashColor () {
    topLeft.style.backgroundColor = "lightgreen";
    topRight.style.backgroundColor = "tomato";
    bottomLeft.style.backgroundColor = "yellow";
    bottomRight.style.backgroundColor = "lightskyblue";
}


topLeft.addEventListener('click', (event) => {
    if(on) {
       playerOrder.push(1); 
       check();
       one();
       if(!win) {
        setTimeout(() => {
            clearColor();
         },300);
       }
    }
})


topRight.addEventListener('click', (event) => {
    if(on) {
       playerOrder.push(2); 
       check();
       two();
       if(!win) {
        setTimeout(() => {
            clearColor();
         },300);
       }
    }
})


bottomLeft.addEventListener('click', (event) => {
    if(on) {
       playerOrder.push(3); 
       check();
       three();
       if(!win) {
        setTimeout(() => {
            clearColor();
         },300);
       }
    }
})


bottomRight.addEventListener('click', (event) => {
    if(on) {
       playerOrder.push(4); 
       check();
       four();
       if(!win) {
        setTimeout(() => {
            clearColor();
         },300);
       }
    }
})

function check() {
    if(playerOrder[playerOrder.length -1] !== order[playerOrder.length -1]) 
    good=false;

    if(playerOrder.length == 3 && good) {
        winGame();
    }

    if(good=false) {
        flashColor();
        turnCounter.innerHTML ="NO!"
        setTimeout(() => {
          turnCounter.innerHTML = turn;
          clearColor();  

          if(strict) {
              play();
          } else {
              compTurn =true;
              flash =0;
              playerOrder = [];
              good = true;
              intervalId = setInterval(gameTurn, 800);
          }
        }, 800);

        noise = false;
    }

    if(turn ==playerOrder.length && good && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);

    }
}

function winGame() {
    flashColor();
    turnCounter.innerHTML = "WIN!";
    on = false;
    win = true;
}


