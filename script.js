var leftArrow = document.getElementById('arrowLeft'); //grabs the left arrow button
var rightArrow = document.getElementById('arrowRight'); //grabs the right arrow button
var choice = document.getElementById('choice'); //grabs the choice button
var charmander = document.getElementById('redBox'); //grabs the charmander box
var squirtle = document.getElementById('blueBox'); //grabs the squirtle box
var bulbasaur = document.getElementById('greenBox'); //grabs the bulbasaur box
var pokeNameDisplay = document.getElementById('pokeName'); //grabs the #pokeName h1
var pokeBorder = document.querySelector('.boxes');
var mobileScreen = window.matchMedia("(max-width: 480px)")
var position = 0; //position will be used to move the images left or right
var pokeName = ''; //this variable will be updated in a function to be put into the pokeNameDisplay.innerHTML
var pokeNameColor = ''; //this variable will be updated in a function to be put into pokeNameDisplay.style.color
var pokeBorderColor = '';

rightArrow.onclick = moveRight; //setting rightArrow arrow to activate moveRight() on click
leftArrow.onclick = moveLeft; //setting leftArrow to activate moveRight() on click
choice.onclick = choiceMade; //setting choice to activate choiceMade() on click

function moveRight() { //this function will add 475px to each image's position then update their position
    applyAnimations();
    if(mobileScreen.matches){
        if (position < 475) {
            position += 237.5; 
            updatePosition();
        }
    } else {
        if (position < 950) { //checks to make sure that we can't scroll too far to the right since 950 would be charmander
            position += 475; //adds 475 to position
            updatePosition();
        }
    }
    updatePokeName(); //calls the updatePokeName function
    checkdisableButton(); //calls the check disabled button function (explained below)
}



function moveLeft() { //similar to moveRight except it subtracts 475 from the position
    applyAnimations();
    if(mobileScreen.matches){
        if (position > 0) { //checks to make sure we're not 0. If position is 0, we're the farthest left we can go
        position -= 237.5;
        updatePosition();
        }
    } else {
        if (position > 0) { //checks to make sure we're not 0. If position is 0, we're the farthest left we can go
            position -= 475;
            updatePosition();
        }
    }
    updatePokeName();
    checkdisableButton();
}

function updatePokeName(){ //this function checks the position value and updates pokeNameDisplay accordingly
    if(mobileScreen.matches) {
        if (position === 0){
            pokeName = 'Bulbasaur';
            pokeNameColor = 'green';
            pokeBorderColor = '5px solid green';
        } else if (position === 237.5) {
            pokeName = 'Squirtle';
            pokeNameColor = 'blue';
            pokeBorderColor = '5px solid blue';
        } else if (position === 475) {
            pokeName = 'Charmander';
            pokeNameColor = 'red';
            pokeBorderColor = '5px solid red';
        }
    } else {
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
    }
    pokeNameDisplay.innerHTML = pokeName;
    pokeNameDisplay.style.color = pokeNameColor;
    pokeBorder.style.border = pokeBorderColor;
}

function choiceMade() { //this determines what happens when choice is clicked
    leftArrow.style.display = 'none'; 
    rightArrow.style.display = 'none'; //makes the arrow buttons disappear
    if(mobileScreen.matches) {
        if (position === 0){ //these check the positions and updates pokeName accordingly
            pokeName = 'You chose Bulbasaur!';
        } else if (position === 237.5) {
            pokeName = 'You chose Squirtle!';
        } else if (position === 475) {
            pokeName = 'You chose Charmander!';
            pokeNameColor = 'red';
        }
    } else {
        if (position === 0){ //these check the positions and updates pokeName accordingly
            pokeName = 'You chose Bulbasaur!';
        } else if (position === 475) {
            pokeName = 'You chose Squirtle!';
        } else if (position === 950) {
            pokeName = 'You chose Charmander!';
            pokeNameColor = 'red';
        }
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
    if(mobileScreen.matches){
        if(position === 0){
            leftArrow.style.display = 'none';
        } else if (position === 475){
            rightArrow.style.display = 'none';
        } else {
            leftArrow.style.display = 'flex';
            rightArrow.style.display = 'flex';
        }
    } else {
        if(position === 0){
            leftArrow.style.display = 'none';
        } else if (position === 950){
            rightArrow.style.display = 'none';
        } else {
            leftArrow.style.display = 'flex';
            rightArrow.style.display = 'flex';
        }
    }
}

function updatePosition(){
    charmander.style.right = `${position}px`;
    squirtle.style.right = `${position}px`;
    bulbasaur.style.right = `${position}px`;
    console.log(position);
}

var previousScreenMobile = true;
var previousScreenDesktop = false;
var mobileScreenOn = false;
var desktopScreenOn = true;

function updateScreenPositions(){
    if(previousScreenDesktop != mobileScreenOn){
        if(position === 950) {
            position = 475;
            updatePokeName();
            checkdisableButton();
            removeAnimations();
            updatePosition();
            console.log('updateScreen triggered');
        } else if (position === 475) {
            position = 237.5;
            updatePokeName();
            checkdisableButton();
            removeAnimations();
            updatePosition();
            console.log('updateScreen triggered');
        }
        previousScreenDesktop = true;
        previousScreenMobile = false;
    } else if (previousScreenMobile != desktopScreenOn) {
        if(position === 475){
            position = 950;
            updatePokeName();
            checkdisableButton();
            removeAnimations();
            updatePosition();
            console.log('updateScreen triggered');
        } else if (position === 237.5) {
            position = 475;
            updatePokeName();
            checkdisableButton();
            removeAnimations();
            updatePosition();
            console.log('updateScreen triggered');
        }
        previousScreenDesktop = false;
        previousScreenMobile = true;
    }
}


function updateScreen(){
    if(mobileScreen.matches){
        mobileScreenOn = true;
        desktopScreenOn = false;
        updateScreenPositions()
    } else {
        mobileScreenOn = false;
        desktopScreenOn = true;
        updateScreenPositions()
    }
    // if(mobileScreen.matches) {
    //     if(position === 950) {
    //         position = 475;
    //         updatePokeName();
    //         checkdisableButton();
    //         removeAnimations();
    //         updatePosition();
    //         console.log('updateScreen triggered');
    //     } else if (position === 475) {
    //         position = 237.5;
    //         updatePokeName();
    //         checkdisableButton();
    //         removeAnimations();
    //         updatePosition();
    //         console.log('updateScreen triggered');
    //     }
    // } else {
    //     if(position === 475){
    //         position = 950;
    //         updatePokeName();
    //         checkdisableButton();
    //         removeAnimations();
    //         updatePosition();
    //         console.log('updateScreen triggered');
    //     } else if (position === 237.5) {
    //         position = 475;
    //         updatePokeName();
    //         checkdisableButton();
    //         removeAnimations();
    //         updatePosition();
    //         console.log('updateScreen triggered');
    //     }
    // }
}

function removeAnimations(){
    squirtle.style.transition = 'none'
    charmander.style.transition = 'none'
    bulbasaur.style.transition = 'none'
}

function applyAnimations(){
    squirtle.style.transition = 'left 0.5s, right 0.5s'
    charmander.style.transition = 'left 0.5s, right 0.5s'
    bulbasaur.style.transition = 'left 0.5s, right 0.5s'
}

window.addEventListener('resize', updateScreen);
updatePokeName(); 
checkdisableButton();
updatePosition(); //calls these functions to initialize the pokemon names and and check buttons
