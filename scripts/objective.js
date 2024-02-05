
class Objective {
    constructor(x, y, parent) {
        this.x = x
        this.y = y
        this.parent = parent
        this.sprite
    }

    createObjective() {
        let objective = document.createElement("div")
        objective.setAttribute('class', 'objective')
        objective.style.top = this.y + "%"
        objective.style.left = this.x + "%"

        objective.addEventListener("click", () => {   
            this.objectiveHitted()
        })
        this.sprite = objective
        this.parent.appendChild(objective)
    }

    objectiveHitted() {
        this.parent.removeChild(this.sprite)
        let totalScoreNode = document.getElementById("totalScore")
        //Obtener valor actual y guardar en una variable
        let currentScore =  parseInt(totalScoreNode.innerText);

        //Sumarle 500 a esa variable

        currentScore += 500
        //Actualizar en el DOM el nuevo valor
        totalScoreNode.innerText = currentScore
    }
}