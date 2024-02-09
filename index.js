const buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern=[];
let userClickedPattern = [];
let randomChosenColour;
const bttn = document.querySelectorAll("[type='button']");
const title = document.querySelector("#level-title");
const body = document.querySelector("body")
let level = 0;
// const
function nextSequence(){
    title.innerHTML=`Level ${level}`
    let randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber]
     gamePattern.push(randomChosenColour)
    const btn = document.querySelector(`#${randomChosenColour}`)
    console.log(btn)
        btn.style.opacity=0.5;
        setTimeout(()=>{
            btn.style.opacity=1;
        },200)
    playSound(randomChosenColour);
    level++;
}

bttn.forEach((e)=>{
    e.addEventListener("click",handlerfunction)
})

function handlerfunction(e){
    let userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour)
    console.log(userClickedPattern)
   animatePress(e);
   checkAnswer(userClickedPattern.length-1)
}
function playSound(s){
    let audio = new Audio(`/${s}.mp3`)
    audio.play();
}

function animatePress(e){
    e.target.classList.add("pressed");
    setTimeout(()=>{
    e.target.classList.remove("pressed");
    },100)
}
document.addEventListener("keypress",nextSequence);

function checkAnswer(currentLevel){
console.log(currentLevel)
if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
console.log("sucess")
    if(userClickedPattern.length===gamePattern.length){
        setTimeout(()=>{
            nextSequence();
            userClickedPattern = [];
        },1000)
    }
}
else{
    let wrong = new Audio("/wrong.mp3");
    wrong.play();
    body.classList.add("game-over");
    setTimeout(()=>body.classList.remove("game-over"),200)
    title.innerHTML=`Game Over, Press Any Key to Restart`
    console.log("Wrong")
    startOver();
}
}

function startOver(){
    level = 0;
    gamePattern=[];
    userClickedPattern=[];
    randomChosenColour=undefined;
}
