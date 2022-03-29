var leftArrow = document.getElementById('arrowLeft');
var rightArrow = document.getElementById('arrowRight');
var choice = document.getElementById('choice');
var charmander = document.getElementById('redBox');
var squirtle = document.getElementById('blueBox');
var bulbasaur = document.getElementById('greenBox');
var pokeNameDisplay = document.getElementById('pokeName');
var position = 0;
var pokeName = '';
var pokeNameColor = '';

rightArrow.onclick = moveRight;
leftArrow.onclick = moveLeft;
choice.onclick = choiceMade;

function moveRight() {
    if (position < 950) {
        position += 475;
        charmander.style.right = `${position}px`;
        squirtle.style.right = `${position}px`;
        bulbasaur.style.right = `${position}px`;
    }
    updatePokeName();
    checkdisableButton();
}



function moveLeft() {
    if (position > 0) {
        position -= 475;
        charmander.style.right = `${position}px`;
        squirtle.style.right = `${position}px`;
        bulbasaur.style.right = `${position}px`;
    }
    updatePokeName();
    checkdisableButton();
}

function updatePokeName(){
    if (position === 0){
        pokeName = 'Bulbasaur';
        pokeNameColor = 'green';
    } else if (position === 475) {
        pokeName = 'Squirtle';
        pokeNameColor = 'blue';
    } else if (position === 950) {
        pokeName = 'Charmander';
        pokeNameColor = 'red';
    }
    pokeNameDisplay.innerHTML = pokeName;
    pokeNameDisplay.style.color = pokeNameColor;
}

function choiceMade() {
    leftArrow.style.display = 'none';
    rightArrow.style.display = 'none';
    if (position === 0){
        pokeName = 'You chose Bulbasaur!';
    } else if (position === 475) {
        pokeName = 'You chose Squirtle!';
    } else if (position === 950) {
        pokeName = 'You chose Charmander!';
        pokeNameColor = 'red';
    }
    pokeNameDisplay.innerHTML = pokeName;
    choice.innerHTML = 'Change your mind?';
    choice.onclick = reset;
}

function reset(element) {
    leftArrow.style.display = 'flex';
    rightArrow.style.display = 'flex';
    choice.innerHTML = 'I choose you!';
    updatePokeName();
    choice.onclick = choiceMade;
}

function checkdisableButton(){
    if(position === 0){
        leftArrow.style.display = 'none';
    } else if (position === 950){
        rightArrow.style.display = 'none';
    } else {
        leftArrow.style.display = 'flex';
        rightArrow.style.display = 'flex';
    }
}

updatePokeName();
checkdisableButton();