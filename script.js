document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const restartButton = document.getElementById('restart-button');
    const moveCounter = document.getElementById('move-counter');
    const timeCounter = document.getElementById('time-counter');

    let cardsArray = [];
    let flippedCards = [];
    let matchedCards = 0;
    let moves = 0;
    let gameInterval;
    let gameTime = 0;

    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    function shuffle(array) {
        return array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        const doubledValues = shuffle([...cardValues, ...cardValues]);
        board.innerHTML = '';
        doubledValues.forEach(value => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.value = value;
            card.addEventListener('click', flipCard);
            board.appendChild(card);
        });
        cardsArray = document.querySelectorAll('.card');
        resetGame();
    }

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
            this.classList.add('flipped');
            this.textContent = this.dataset.value;
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkForMatch, 1000);
            }
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.value === card2.dataset.value) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCards += 2;
            if (matchedCards === cardsArray.length) {
                clearInterval(gameInterval);
                setTimeout(() => alert(`Gratulacje! Wygrałeś! Ruchy: ${moves}, Czas: ${gameTime}s`), 500);
            }
        } else {
            card1.classList.remove('flipped');
            card1.textContent = '';
            card2.classList.remove('flipped');
            card2.textContent = '';
        }
        flippedCards = [];
        moves++;
        moveCounter.textContent = `Ruchy: ${moves}`;
    }

    function startTimer() {
        gameTime = 0;
        timeCounter.textContent = `Czas: ${gameTime}s`;
        gameInterval = setInterval(() => {
            gameTime++;
            timeCounter.textContent = `Czas: ${gameTime}s`;
        }, 1000);
    }

    function resetGame() {
        clearInterval(gameInterval);
        moves = 0;
        moveCounter.textContent = `Ruchy: ${moves}`;
        matchedCards = 0;
        flippedCards = [];
        startTimer();
    }

    restartButton.addEventListener('click', createBoard);

    createBoard();
});
