class Objective {
    constructor(x, y, parent) {
        this.x = x
        this.y = y
        this.parent = parent
        this.sprite
        this.score = 500
        this.point 
    }

    createObjective() {
        let objective = document.createElement("div")
        objective.setAttribute('class', 'objective')
        objective.style.top = this.y + "%"
        objective.style.left = this.x + "%"

        objective.addEventListener("click", (e) => {   
            this.objectiveHitted()
            this.emergingPoint(e)
        })
        this.sprite = objective
        this.parent.appendChild(objective)
    }

    removeObjective(){
        if(this.parent.contains(this.sprite)) this.parent.removeChild(this.sprite)
    }


objectiveHitted() {
    console.log(this.parent)
    this.parent.removeChild(this.sprite)
    let totalScoreNode = document.getElementById("totalScore")
    let currentScore =  parseInt(totalScoreNode.innerText);
    currentScore += this.score
    totalScoreNode.innerText = currentScore
}


emergingPoint(event){
    let x = event.clientX
    let y = event.clientY
    this.point = document.createElement('p')
    this.point.innerText = '+' + this.score
    this.point.style.position = 'absolute'
    this.point.style.left = 45 + x + 'px'
    this.point.style.top = y-65 + 'px'
    this.point.classList.add('emergingPoint')
    document.querySelector('body').appendChild(this.point)
    setTimeout(()=>{
        document.querySelector('body').removeChild(this.point)

    },500)
    

}


}