
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

    removeObjective(){
        if(this.parent.contains(this.sprite)) this.parent.removeChild(this.sprite)
    }

    objectiveHitted() {
        this.parent.removeChild(this.sprite)
        let totalScoreNode = document.getElementById("totalScore")
        let currentScore =  parseInt(totalScoreNode.innerText);
        currentScore += 500
        totalScoreNode.innerText = currentScore
    }
}