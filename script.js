let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-button");
let newGameBtn = document.querySelector("#new-button");
let msg = document.querySelector("#msg");

let turn0 = true;
let gameOver = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turn0 = true;
    gameOver = false;
    enableButtons();
    msg.innerText = `Player 0's Turn`;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver) return;

        box.innerText = turn0 ? "0" : "X";
        box.disabled = true;

        checkWinner();

        if (!gameOver) {
            turn0 = !turn0;
            msg.innerText = `Player ${turn0 ? "0" : "X"}'s Turn`;
        }
    });
});

const disableButtons = () => {
    boxes.forEach((box) => (box.disabled = true));
};

const enableButtons = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (winner) => {
    msg.innerText = `🎉 Player ${winner} wins!`;
    gameOver = true;
    disableButtons();
};

const showDraw = () => {
    msg.innerText = `😐 It's a Draw!`;
    gameOver = true;
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let val1 = boxes[a].innerText;
        let val2 = boxes[b].innerText;
        let val3 = boxes[c].innerText;

        if (val1 && val1 === val2 && val2 === val3) {
            showWinner(val1);
            return;
        }
    }

    const isDraw = [...boxes].every((box) => box.innerText !== "");
    if (isDraw) showDraw();
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

msg.innerText = `Player 0's Turn`;