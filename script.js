
const moves = ["r", "p", "s"];
const movesFormatted = ["Rock", "Paper", "Scissors"];
const players = ["You", "I"];
var score = [0, 0];
var round = 1;
var rounds = 0;

function getRounds(){
    let rounds = document.getElementById("rounds").value;
    setRounds(rounds);
}

function setRounds(rounds){
    if (rounds % 2 == 0 || isNaN(rounds)){
        alert("Your input must an odd number!")
    }
    else {
        let rounds = 1;
        localStorage.setItem("rounds", rounds);
        window.location.href = "action.html";
    }
}

function showRound(){
    let rounds = localStorage.getItem("rounds");
    let stats = document.getElementById("stats");
    let txt = "Round " + round + " of " + rounds;
    stats.innerHTML = txt;
}

function cpuTurn(u){
    let choice = Math.floor(Math.random()*3);
    let c = moves[choice];
    findWinner(u, c, round);
}

function findWinner(u, c, rounds){
    if (u == c){
        alert("We both chose " + u + ".");
    }
    else {
        round++;
        let winner = "";
        let wA = [["r", "p", "I"], ["r", "s", "You"], ["p", "s", "I"], ["p", "r", "You"], ["s", "r", "I"], ["s", "p", "You"]];
        turns = u + c;
        for (let x = 0; x < wA.length; x++){
            match = wA[x][0] + wA[x][1];
            if (match == turns){ 
                winner = wA[x][2];
            }            
        }
        alert("I chose " + c + " which means " + winner + " won!"); 
        showRound();
        return winner;
    }
}