var leftArrow = document.getElementById('arrowLeft'); //grabs the left arrow button
var rightArrow = document.getElementById('arrowRight'); //grabs the right arrow button
var choice = document.getElementById('choice'); //grabs the choice button
var charmander = document.getElementById('redBox'); //grabs the charmander box
var squirtle = document.getElementById('blueBox'); //grabs the squirtle box
var bulbasaur = document.getElementById('greenBox'); //grabs the bulbasaur box
var pokeNameDisplay = document.getElementById('pokeName'); //grabs the #pokeName h1
var pokeBorder = document.querySelector('.boxes');
console.log(pokeBorder);
var position = 0; //position will be used to move the images left or right
var pokeName = ''; //this variable will be updated in a function to be put into the pokeNameDisplay.innerHTML
var pokeNameColor = ''; //this variable will be updated in a function to be put into pokeNameDisplay.style.color
var pokeBorderColor = '';

rightArrow.onclick = moveRight; //setting rightArrow arrow to activate moveRight() on click
leftArrow.onclick = moveLeft; //setting leftArrow to activate moveRight() on click
choice.onclick = choiceMade; //setting choice to activate choiceMade() on click

function moveRight() { //this function will add 475px to each image's position then update their position
    if (position < 950) { //checks to make sure that we can't scroll too far to the right since 950 would be charmander
        position += 475; //adds 475 to position
        charmander.style.right = `${position}px`; //updates all the image positions from the right
        squirtle.style.right = `${position}px`;
        bulbasaur.style.right = `${position}px`;
    }
    updatePokeName(); //calls the updatePokeName function
    checkdisableButton(); //calls the check disabled button function (explained below)
}



function moveLeft() { //similar to moveRight except it subtracts 475 from the position
    if (position > 0) { //checks to make sure we're not 0. If position is 0, we're the farthest left we can go
        position -= 475;
        charmander.style.right = `${position}px`;
        squirtle.style.right = `${position}px`;
        bulbasaur.style.right = `${position}px`;
    }
    updatePokeName();
    checkdisableButton();
}

function updatePokeName(){ //this function checks the position value and updates pokeNameDisplay accordingly
    if (position === 0){
        pokeName = 'Bulbasaur';
        pokeNameColor = 'green';
        pokeBorderColor = '5px solid green';
    } else if (position === 475) {
        pokeName = 'Squirtle';
        pokeNameColor = 'blue';
        pokeBorderColor = '5px solid blue';
    } else if (position === 950) {
        pokeName = 'Charmander';
        pokeNameColor = 'red';
        pokeBorderColor = '5px solid red';
    }
    pokeNameDisplay.innerHTML = pokeName;
    pokeNameDisplay.style.color = pokeNameColor;
    pokeBorder.style.border = pokeBorderColor;
}

function choiceMade() { //this determines what happens when choice is clicked
    leftArrow.style.display = 'none'; 
    rightArrow.style.display = 'none'; //makes the arrow buttons disappear
    if (position === 0){ //these check the positions and updates pokeName accordingly
        pokeName = 'You chose Bulbasaur!';
    } else if (position === 475) {
        pokeName = 'You chose Squirtle!';
    } else if (position === 950) {
        pokeName = 'You chose Charmander!';
        pokeNameColor = 'red';
    }
    pokeNameDisplay.innerHTML = pokeName; //updates the innerHTML of pokeNameDisplay
    choice.innerHTML = 'Change your mind?'; //updates the choice button to ask if the user would like to rechoose
    choice.onclick = reset; //makes it so that the choice button instead resets the page. reset() is explained below
}

function reset(element) { //this brings the arrow keys back and then resets the choice button to say "I choose you!"
    leftArrow.style.display = 'flex';
    rightArrow.style.display = 'flex'; //arrow keys are displayed again
    choice.innerHTML = 'I choose you!'; //choice text is back to what it was
    updatePokeName(); //updating the pokemon names back to just their names (and not "You chose...!")
    checkdisableButton(); 
    choice.onclick = choiceMade; //brings the choiceMade functionality back to the choice button instead of reset()
}

function checkdisableButton(){ //made this function because I wanted to hide the arrow keys if you were at the end of the choice e.g. if on Bulbasaur, then disable left arrow since there are no pokemon to the left of them
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
checkdisableButton(); //calls both of these functions to initialize the pokemon names and and check buttons