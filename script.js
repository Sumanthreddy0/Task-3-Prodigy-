let boxes = document.querySelectorAll('.box');
let resetBtn = document.getElementById('reset');
let newGameBtn = document.getElementById('new-btn');
let msgContainer = document.getElementById('msg-container');
let msg = document.getElementById('msg');
let turnO = true; // Player O starts

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener('click', function () {
        if (turnO) {
            box.innerText = 'O';
            box.style.color = '#009432';
        } else {
            box.innerText = 'X';
            box.style.color = '#1B1464';
        }
        turnO = !turnO;
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = '';
    });
};

const showWinner = (winner) => {
    msg.innerText = `🎉 Winner: ${winner} 🎉`;
    msgContainer.style.display = 'block';
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            showWinner(boxes[a].innerText);
            return;
        }
    }
    if ([...boxes].every(box => box.innerText !== '')) {
        msg.innerText = 'It\'s a Draw! 🤝';
        msgContainer.style.display = 'block';
    }
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.style.display = 'none';
};

resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', resetGame);
