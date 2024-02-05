const playGame = document.getElementById("play")
const canvas = document.getElementById("canvas")

function play() {
    playGame.style.display = 'none'; //Hidden our play button
    createObjective()
}

function createObjective() {

    //Create the interval that create new objectives
    let objectiveId = setInterval(() => {
        let randomX = Math.floor((Math.random() * 80)+10)
        let randomY = Math.floor((Math.random() * 80)+10)
        console.log("Interval")
        const objective = new Objective(randomX, randomY, canvas)
        objective.createObjective()

        //Remove objective if user doesn't kill it
        setTimeout(removeObjective, 3000, objective)

    }, 2000)
}

function removeObjective(objective){
    objective.removeObjective()
}


playGame.addEventListener("click", play)



