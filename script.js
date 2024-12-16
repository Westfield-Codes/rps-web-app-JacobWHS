
/* Function getRounds
 * pulls rounds from the input box on the home page and sends to setRounds
 * @param = none
 * @return = none
 */
function getRounds(){
    let rounds = document.getElementById("rounds").value;
    setRounds(rounds);
}

/* Function getRounds
 * Checks if rounds are odd. If even, warning message. 
 * Otherwise, sets round to 1, stores rounds and round in localStorage and loads chooser.html. 
 * @param = founds
 * @localStorage => round, rounds
 * @return = none
 */
function setRounds(rounds){
    if (rounds % 2 == 0 || isNaN(rounds)) {
        //alert("must be odd");
        document.getElementById("rounds").value = "";
        if (isNaN(rounds)){
        document.getElementById("rounds").placeholder = "Must be numerical.";
        }
        else{
            document.getElementById("rounds").placeholder = "Your input must be odd.";
        }
    }
    else {
        let score = [0, 0];
        localStorage.setItem("score", JSON.stringify(score));
        localStorage.setItem("rounds", rounds);
        localStorage.setItem("round", 1);
        window.location.href = "chooser.html";
    }
}

const enter = document.getElementById("rounds");
enter.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        setRounds(document.getElementById("rounds").value);
    }
});

/* Function endGame
 * Called when the game ends, shows who won.
 * @param = none
 * @localStorage => round, rounds
 * @return = none
 */
function endGame(){
    let score = JSON.parse(localStorage.getItem("score"));
    if (score[0] > score[1]) localStorage.setItem("winner", "You");
    else localStorage.setItem("winner", "I");
    let winner = localStorage.getItem("winner");
    let message = winner + " won" + ", " + score.join(" to ") + ".";
    scoreBox.innerHTML = message;
}

/* Function showRound
 * Gets rounds and round from local storage and displays in chooser.html.
 * @param = none
 * @localStorage => round, rounds
 * @return = none
 */
function showRound(){
    let round = localStorage.getItem("round");
    let rounds = localStorage.getItem("rounds");
    if (round > rounds) {
        window.location.href = "gameover.html";
        let message = "The game has ended!";
    }
    else message = "Round " + round + " of " + rounds + ".";
    let score = JSON.parse(localStorage.getItem("score"));
    let statsBox = document.getElementById("statsBox");
    statsBox.innerHTML = message;
    scoreBox.innerHTML = "Score: " + score.join(", ");
    
}

/* Function cpuTurn
 * Called by buttons in chooser with userturn u as argument.
 * Generates a computer turn c and sends u and c to findWinner
 * @param = u
 * @return = u, c
 */
function cpuTurn(u){
    let moves = ["r","p","s"];
    let choice = Math.floor(Math.random()*3);
    let c = moves[choice];
    findWinner(u, c);
}

/* Function findWinner
 * Checks if u & c are equal.  If not, finds winner and updates showRound, 
 * Incrementing round and saving to local storage.
 * @param = u, c
 * @localStorage <=> round++
 * @return = none
 */
function findWinner(u, c){
    if (u == c){
        //alert("We both picked " + u);
        document.getElementById("result").innerHTML = "We both chose " + u + ".";
    }
    else {
        let winner = " ";
        let winArray = [["r","p","I"],["r","s","You"],["p","s","I"],["p","r","You"],["s","r","I"],["s","p","You"]];
        let movesFormatted = ["Rock", "Paper", "Scissor"];
        for (let i = 0; i< winArray.length; i++){
            if (winArray[i][0] == u && winArray[i][1]==c){
                winner = winArray[i][2];

            }
        }
        // alert("You choose " + u + " and I choose " + c + " " + winner + " win!");
        document.getElementById("result").innerHTML = "You choose " + u + " and I choose " + c + ". " + winner + " win this round!";
        let round = localStorage.getItem("round");
        const players = ["You", "I"];
        if (localStorage.getItem("rounds") >= round) round++;
        else localStorage.setItem("itsova", 1);
        // round++;
        let win = players.indexOf(winner);
        let score = JSON.parse(localStorage.getItem("score"));
        score[win]++;
        localStorage.setItem("score", JSON.stringify(score));
        localStorage.setItem("round", round);
        localStorage.setItem("winner", winner);
        showRound();
    }
}
