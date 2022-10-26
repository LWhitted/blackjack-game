const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
const dealButton = document.getElementById('deal-button');
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');
const buttons = document.getElementById("buttonDiv");
const playerPoint = document.getElementById("player-points");
const dealerPoint = document.getElementById("dealer-points");
const messages = document.getElementById('messages');

const deck = [];
const playerCard = [];
const dealerCard = [];
let playerScore = 0;
let dealerScore = 0;
let playerStatus = 0;
let dealerStatus = 0;

let canHit = true;
const suits = ["hearts", "spades", "clubs", "diamonds"];
const ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
const makeDeck = (rank, suit) => {
  const card = {
    rank: rank,
    suit: suit,
    pointValue: rank > 10 ? 10 : rank,
  };
  deck.push(card);
};

for (let suit of suits) {
  for (const rank of ranks) {
    makeDeck(rank, suit);
  }
}

function CardValue(array, score) {
  score = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].rank === "king") {
      score += 10;
    } else if (array[i].rank === "queen") {
      score += 10;
    }
    else if (array[i].rank === "jack") {
      score += 10;
    }
    else if (array[i].rank === "ace") {
      score += 1;
    } else {
      score += array[i].rank;
    }
  }
  return score
}

let playerProgress = 0;
let dealerProgress = 0;
function playerGameProgress(playerCard, playerScore) {
  for (let i = 0; i < playerCard.length; i++) {
    playerCard.forEach(item => { playerScore + item; })
    if (playerScore > 21) {
      console.log("Player BUST!");
    } else if (playerScore == 21) {
      console.log("Player BLACKJACK!");
    } else {
      console.log("Player keepGoing");
    }
  }
  return playerScore
}

function dealerGameProgress(dealerCard, dealerProgress) {
  for (let i = 0; i < dealerCard.length; i++) {
    dealerCard.forEach(item => { dealerProgress + item; })
    if (dealerProgress > 21) {
      console.log("Dealer BUST");
    } else if (dealerProgress === 21) {
      console.log("Dealer BLACKJACK!");
    } else {
      console.log("Dealer keepGoing");
    }
  }
  return dealerProgress
}


window.addEventListener("DOMContentLoaded", () => {
  // Execute after page load
});
function shuffleDeck(array) {
  for (let i = 0; i < array.length; i++) {
    let tempCard = array[i];
    let randomIndex = Math.floor(Math.random() * 51);
    array[i] = array[randomIndex];
    deck[randomIndex] = tempCard;
  }
  return array
}
console.log(shuffleDeck(deck));
dealButton.addEventListener("click", event => dealCards())

function dealCards() {
  for (let i = 0; i < 4; i++) {
    if (i % 2 === 0) {
      let tempDeal = deck.pop()
      let playerDeal = document.createElement("img");
      playerDeal.setAttribute('src', '/images/' + tempDeal.rank + '_of_' + tempDeal.suit + '.png')
      playerHand.appendChild(playerDeal);
      playerCard.push(tempDeal);
    } else {
      let tempDeal = deck.pop()
      let dealerDeal = document.createElement("img");
      dealerDeal.setAttribute('src', '/images/' + tempDeal.rank + '_of_' + tempDeal.suit + '.png')
      dealerHand.appendChild(dealerDeal)
      dealerCard.push(tempDeal);
    }
  }
  console.log(playerCard);
  console.log(dealerCard);
  playerScore = CardValue(playerCard, playerScore);
  dealerScore = CardValue(dealerCard, dealerScore);
  playerStatus = playerGameProgress(playerCard, playerScore);
  dealerStatus = dealerGameProgress(dealerCard, dealerProgress);
  console.log(playerScore);
  console.log(dealerScore);
  console.log("My score: " + playerScore);
  console.log("Dealer score: " + dealerScore);
  playerPoint.innerText = playerScore;
  dealerPoint.innerText = dealerScore;
  dealGameComplete();
}

hitButton.addEventListener("click", event => hitMe())
function hitMe() {
  for (let i = 0; i < 1; i++) {
    if (playerScore < 21) {
      let tempDeal = deck.pop();
      let playerDeal = document.createElement("img");
      playerDeal.setAttribute('src', '/images/' + tempDeal.rank + '_of_' + tempDeal.suit + '.png');
      playerHand.appendChild(playerDeal);
      playerCard.push(tempDeal);
      console.log(canHit)
    } else {
      console.log('cantHit');
    }
  }
  console.log(playerCard);
  console.log(dealerCard);
  playerScore = CardValue(playerCard, playerScore);
  dealerScore = CardValue(dealerCard, dealerScore);
  playerStatus = playerGameProgress(playerCard, playerScore);
  dealerStatus = dealerGameProgress(dealerCard, dealerProgress);
  console.log(playerScore);
  console.log(dealerScore);
  console.log("My score: " + playerScore);
  console.log("Dealer score: " + dealerScore);
  playerPoint.innerText = playerScore;
  dealerPoint.innerText = dealerScore;
  gameComplete();
}

standButton.addEventListener("click", event => stand())
function stand() {
  for (let i = 0; i < 1; i++) {
    if (dealerScore < 21) {
      let tempDeal = deck.pop();
      let dealerDeal = document.createElement("img");
      dealerDeal.setAttribute('src', '/images/' + tempDeal.rank + '_of_' + tempDeal.suit + '.png')
      dealerHand.appendChild(dealerDeal)
      dealerCard.push(tempDeal);
      console.log("yass queen");
    } else if (dealerScore > 21) {
      console.log("bust");
    }
  }
  console.log(playerCard);
  console.log(dealerCard);
  playerScore = CardValue(playerCard, playerScore);
  dealerScore = CardValue(dealerCard, dealerScore);
  playerStatus = playerGameProgress(playerCard, playerScore);
  dealerStatus = dealerGameProgress(dealerCard, dealerProgress);
  console.log(playerScore);
  console.log(dealerScore);
  console.log("My score: " + playerScore);
  console.log("Dealer score: " + dealerScore);
  playerPoint.innerText = playerScore;
  dealerPoint.innerText = dealerScore;
  gameComplete();
}

let win = true;

function gameComplete() {
  if (playerScore > 21) {
    console.log("house wins");
    dealerPoint.innerText = "House Wins"
    win = false;
  } else if (dealerScore === 21 && playerScore != 21) {
    console.log("house wins");
    dealerPoint.innerText = "House Wins"
    win = false;
  }
  //the only thing is if the dealer reaches their max of dealing themselves a card 
  // until 17 points && playerScore < dealerScore, this function doesn't run.
  else if (dealerScore >= 17 && dealerScore > playerScore) {
    console.log("house wins");
    dealerPoint.innerText = "House Wins"
    win = false;
  }
  else if (playerScore === 21 || dealerScore > 21) {
    console.log("Blackjack, YOU WIN");
    playerPoint.innerText = "YOU WIN!"
    win = true;
  }
}
function dealGameComplete() {
  if (playerScore > 21 || dealerScore === 21) {
    console.log("house wins");
    dealerPoint.innerText = "House Wins"
    win = false;
  } else if (playerScore === 21 || dealerScore > 21) {
    console.log("Blackjack, YOU WIN");
    playerPoint.innerText = "YOU WIN!"
    win = true;
  }
}
//restart game

let newGame = document.createElement("button");
newGame.addEventListener("click", event => newGameButton());
newGame.innerText = "New Game";
buttonDiv.appendChild(newGame);

function newGameButton() {
  window.location.reload();
}
//I ran out of time to work on the extra credit items.

