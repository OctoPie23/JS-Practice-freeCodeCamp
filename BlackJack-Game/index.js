let hasBlackJack = false;
let isAlive = false;
let message = "";
let started = false;
let cards = [];
let sum = 0;

// this is the object created with the name playerInfo
let playerInfo = {
    name: "Shrijal",
    money: 200
};

function startGame() {
    document.getElementById("player-el").textContent = playerInfo.name + ": $" + playerInfo.money;
    if (isAlive || playerInfo.money < 0) return;
    started = true;
    isAlive = true;
    // we have to explicitely mention it here as well since we can come in this fxn after having a blackjack.
    hasBlackJack = false;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    sum = firstCard + secondCard;
    cards = [firstCard, secondCard];
    renderGame();
}

function renderGame() {

    // this is an alternate to the getElementById which does more than just working with the ids.
    let cardsDeck = "Cards: ";
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        cardsDeck += card + " ";
    }
    document.querySelector("#cards-id").textContent = cardsDeck;
    document.querySelector("#sum-id").textContent = "Sum: " + sum;

    if (sum < 21) {
        message = "Do you wish to draw a new card?🙂";
    } else if (sum === 21) {
        hasBlackJack = true;
        playerInfo.money += 100;
        message = "You got a BlackJack!🎉";
        isAlive = false;
        sum = 0;
    } else {
        isAlive = false;
        message = "You lost!😥";
        playerInfo.money -= 100;
        sum = 0;
    }

    document.getElementById("message-id").textContent = message;
}

function getRandomCard() {
    // this returns no in the range of 1-13
    // math.random returns values in the range of 0.00000 -> 0.99999
    let random = Math.floor(Math.random() * 13) + 1;
    // rules of blackjack
    if (random === 1) return 11;
    if (random >= 11) return 10;
    return random;
}

function newCard() {
    // this  makes sure that the user is not clicking the new card bottom before starting the game.
    if (!started || !isAlive || hasBlackJack) return;
    // console.log("Drawing a new card...");
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
}
