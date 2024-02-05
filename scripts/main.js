const startGame = document.getElementById("start")
const canvas = document.getElementById("canvas")

function start(){
    console.log("Entramos")
    // const objective = new Objective(40, 40)
    let positionObjective = document.createElement("div")
    positionObjective.setAttribute('class', 'objective')
    canvas.appendChild(positionObjective)
    positionObjective.addEventListener("click", hit)

}
function hit() {
    console.log('objective Hit')
}

startGame.addEventListener("click", start)



