const homeScore = document.getElementById("home-score");
const guestScore = document.getElementById("guest-score");

const homePlusOne = document.getElementById("home1");
const homePlusTwo = document.getElementById("home2");
const homePlusThree = document.getElementById("home3");

const guestPlusOne = document.getElementById("guest1");
const guestPlusTwo = document.getElementById("guest2");
const guestPlusThree = document.getElementById("guest3");

let home = 0, guest = 0;


homePlusOne.addEventListener("click",function(){
  updateScore("home", 1)
})

homePlusTwo.addEventListener("click",function(){
  updateScore("home", 2)
})

homePlusThree.addEventListener("click",function(){
  updateScore("home", 3)
})

guestPlusOne.addEventListener("click",function(){
  updateScore("guest", 1)
})

//guestPlusOne.onclick = () => updateScore("guest", 1);  THIS IS ALSO CORRECT

// two things -- addEventListener("click", function(){}) to .onclick = function(){} if there is only one line of code. -- function(){} to ()=> {}

/*
One Extra Superpower: Implicit Return
When you drop the curly braces in an arrow function, JavaScript does one more cool thing: it automatically returns the result of that single line, without you having to type the word return.

So if you ever need to do a quick math calculation, it is incredibly short:

JavaScript
// These do the exact same thing:
let doubleScore = (score) => { return score * 2 };
let doubleScore = (score) => score * 2; // Clean, one-line magic!
*/

guestPlusTwo.addEventListener("click",function(){
  updateScore("guest", 2)
})

guestPlusThree.addEventListener("click",function(){
  updateScore("guest", 3)
})


function highlightWinningTeam(){
  if(home > guest){
    homeScore.classList.add("winningTeam");
    guestScore.classList.remove("winningTeam");
  }
  else if(guest > home){
    guestScore.classList.add("winningTeam");
    homeScore.classList.remove("winningTeam");
  }
  else{
    homeScore.classList.remove("winningTeam");
    guestScore.classList.remove("winningTeam");
  }
}


function updateScore(team, points) {
    if (team === 'home') {
        home += points;
        homeScore.textContent = home;
    } else if (team === 'guest') {
        guest += points;
        guestScore.textContent = guest;
    }
    highlightWinningTeam();
}