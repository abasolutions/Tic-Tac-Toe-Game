const startGameBtn = document.querySelector(".startgame");
const playAgainBtn = document.querySelector(".playagain");
const turns = document.querySelector(".turns-text");
let fields = document.querySelectorAll(".field");
//Setting the empty game fields, which is an array with 9 empty strings
let gameFields = ["", "", "", "", "", "", "", "", ""];
//Set steps
let turnX = "X";
let turnO = "O";
let currentPlayersStep;
//Set the array of winning combinations
const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
];

//After clicking the Start Game button, the button disappear and the fields become active
function startGame() {
    startGameBtn.classList.add("hide");
    //The X player could start the game
    currentPlayersStep = turnX;
    turns.innerText = "X player steps first";
    //Add eventListener to the fields and remove the disabled class from the fields
    fields.forEach((field) => {
    field.classList.remove("disabled");
});
}
//endGame() function to check the winner
function endGame(){
    for (let winFields of winningCombinations){
        let = [a,b,c] = winFields;
        //Check that all fields have the same value X or O
        if (gameFields[a] && (gameFields[a] == gameFields[b] && gameFields[a] == gameFields[c])){
            return [a,b,c];
        }
     }
     return false;
};
//playGame() function to run the game action
function playGame(){
    fields.forEach((field) => {
        field.addEventListener("click", (event) => {
            let eventTarget = event.target;
            let id = eventTarget.id;
            
            if (!gameFields[id]){
            gameFields[id] = currentPlayersStep;
                //Display the current step in the divs
                eventTarget.innerText = currentPlayersStep;
                //Prevent the already clicked div from other clicks
                eventTarget.classList.add("disabled");
                if (endGame() !== false){
                    turns.innerText = `${currentPlayersStep} player won!`;
                    endGame();
                    return;
                } 
            }
            if (draw()){
                turns.innerText = "It is a draw!";
            }
            //Switch the steps between X and O
            if (currentPlayersStep === turnX) {
                currentPlayersStep = turnO;
            } else {
                currentPlayersStep = turnX;
            }
            turns.innerText = `${currentPlayersStep} player steps`;
        });
    })
}
//If all the fields are filled, but there are no winner it is a draw
function draw(){
    for (field of gameFields){
        if (field !== ""){
            return true;
        } 
    } 
        return false;
}
//To start again the game anytime
function playAgain(){
    gameFields = ["", "", "", "", "", "", "", "", ""];
    turns.innerText = "";
    currentPlayersStep = turnX;
    turns.innerText = `${currentPlayersStep} player steps`;
    
    fields.forEach((field) => {
        field.innerText = "";
        field.classList.remove("disabled");
    });
}
playGame();
startGameBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", playAgain);
