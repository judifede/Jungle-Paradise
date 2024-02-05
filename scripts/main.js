const playGame = document.getElementById("play")
const canvas = document.getElementById("canvas")

function play() {
    console.log("Entramos")
    playGame.style.display = 'none';

    createObjective()
}

function createObjective() {

    let objectiveId = setInterval(() => {
        let randomX = Math.floor((Math.random() * 80)+10)
        let randomY = Math.floor((Math.random() * 80)+10)
        console.log("Interval")
        const objective = new Objective(randomX, randomY, canvas)
        objective.createObjective()
    }, 2000)
}


playGame.addEventListener("click", play)



