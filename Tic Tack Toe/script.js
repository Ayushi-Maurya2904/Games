 let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-button"); // button with id="reset-button"
let modeBtn = document.querySelector("#mode");
let body = document.querySelector("body");

let currMode = "light";
let turnO = true;
let gameOver = false; // track if game ended

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

// DARK MODE TOGGLE
modeBtn.addEventListener("click", () => {
    if(currMode === "light") {
        currMode = "dark";
        body.classList.add("dark");
    } else {
        currMode = "light";
        body.classList.remove("dark");
    }
    console.log(currMode);
});

// CLICK ON BOX
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(gameOver) return; // prevent further clicks after game over

        if(turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

// CHECK WINNER
const checkWinner = () => {
    for(let pattern of winPatterns){
        let [a, b, c] = pattern;
        let pos1Val = boxes[a].innerText;
        let pos2Val = boxes[b].innerText;
        let pos3Val = boxes[c].innerText;

        if(pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val){
            gameOver = true;
            alert(`${pos1Val} wins! 🎉`);
            return; // stop checking after winner
        }
    }

    // Check for tie
    let allFilled = Array.from(boxes).every(box => box.innerText !== "");
    if(allFilled && !gameOver){
        gameOver = true;
        alert("It's a tie! 🤝");
    }
};

// RESET GAME
resetBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    turnO = true;
    gameOver = false;
});
