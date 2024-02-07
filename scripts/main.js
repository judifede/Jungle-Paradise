const playGame = document.querySelector(".circlePlay")
const startGame = document.getElementById("start")
const containerStartup = document.getElementById("startup")
const canvas = document.getElementById("canvas")
const grid = document.querySelector('.grid')
const timeGame = document.getElementById("timeGame")
const backgroundEnd = document.querySelector('.backgroundEnd')
const containerResult = document.getElementById('containerResult')
const totalScoreText = document.getElementById("totalScore")
const countdownGame = document.querySelector('.countdown')
const countdownGameCounter = document.querySelector('.countdown p')
let objectiveId = undefined
const soundWallpaper = new Audio('assets/Sound/wallpaperSound.mp3')
soundWallpaper.volume = 0.8
soundWallpaper.currentTime = 14



function start() {
    canvas.classList.add('opened')
    containerStartup.classList.add('hidden')

    
}   

function play() {
    
    countdownGame.classList.add("opened")
    let i = 0
    const colors = ["red","orange","yellow","green"]
    countdownGameCounter.style.color = `${colors[i]}`
    
    const countdown = setInterval(()=>{
        countdownGameCounter.innerText = --countdownGameCounter.innerText
        i++
        countdownGameCounter.style.color = `${colors[i]}`
        if(countdownGameCounter.innerText === '0') countdownGameCounter.innerText = 'GO!'
    },1000)

    setTimeout(()=>{
        let currentTimeGame = parseInt(timeGame.innerText.slice(0, 2))
        
        const timeGameId = setInterval(() => {
            timeGame.innerText = --currentTimeGame + ' s'
            soundWallpaper.play()
            
            if (currentTimeGame <= 5) {
                timeGame.classList.add('endingTime')
            }
            
            if (currentTimeGame <= 0){
                clearInterval(timeGameId)
                clearInterval(objectiveId)
                endGame()
            }
        }, 1000)

        playGame.classList.add("hidden") //Hidden our play button
        createObjective()

        clearInterval(countdown)
        countdownGameCounter.innerText = '3'
        i = 0
        countdownGame.classList.remove('opened')
    },4000)

    

}

function createObjective() {
    //Create the interval that create new objectives
    objectiveId = setInterval(() => {
        let randomTimeShowed = Math.floor((Math.random() * 2000) + 4000)
        const objective = new Objective(25, 20)
        objective.createObjective()

        //Remove objective if user doesn't kill it
        setTimeout(removeObjective, randomTimeShowed, objective)

    }, 2000)
}

function removeObjective(objective) {
    objective.removeObjective()
}

function endGame(){
    //Hidden all objectives from last game
    for (let i = 0; i < document.getElementsByClassName("objective").length; i++) {
        const element = document.getElementsByClassName("objective")[i];
        element.classList.add("hidden")
    }
    soundWallpaper.pause()
    soundWallpaper.currentTime = 14
    containerResult.querySelector('p').innerText = totalScoreText.innerText
    containerResult.querySelector('#restart').addEventListener('click', resetGame)
    backgroundEnd.classList.add('opened')
    containerResult.classList.add('opened')
}

function resetGame() {
    playGame.classList.remove("hidden") //show our play button
    totalScoreText.innerText = '0000'
    timeGame.innerText = '30 s'
    timeGame.classList.remove('endingTime')
    containerResult.classList.remove('opened')
    backgroundEnd.classList.remove('opened')

}

playGame.addEventListener("click", play)
startGame.addEventListener("click", start)



