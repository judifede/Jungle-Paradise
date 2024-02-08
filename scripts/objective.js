class Objective {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.sprite
        this.speed = 5
        this.direction = -1
        this.cells
        this.randomCell
        this.randomCellLeft
        this.randomCellWidth
        this.objectiveHitted = this.objectiveHitted.bind(this)
        this.emergingPoint = this.emergingPoint.bind(this)
        this.score = 500
        this.point 
    }

    createObjective() {
        this.cells = document.getElementsByTagName("td")
        this.randomCell = Math.floor((Math.random() * (this.cells.length - 1)))
        this.sprite = document.createElement("div")
        this.sprite.setAttribute('class', 'objective')
        this.sprite.style.top = this.y + "%"
        this.sprite.style.left = this.x + "%"

        this.sprite.addEventListener("click", this.objectiveHitted)

        this.sprite.addEventListener("click", this.emergingPoint)

        while (this.cells[this.randomCell].hasChildNodes()) {
            this.randomCell = Math.floor((Math.random() * (this.cells.length - 1)))
        }
        this.cells[this.randomCell].classList.add('showed')
        setTimeout(() => this.cells[this.randomCell].classList.remove('showed'), 1000)
        this.cells[this.randomCell].appendChild(this.sprite)
        this.moveObjective()
    }

    moveObjective() {
        this.movementId = setInterval(() => {
            this.x = parseInt(getComputedStyle(this.sprite).left.replace("px", ""))
            this.x += this.speed * this.direction
            this.sprite.style.left = parseInt(this.x) + "px"
            if (this.checkCollision()) {
                this.sprite.classList.toggle("mirror")
                this.direction = this.direction === -1 ? 1 : -1
            }
        }, 100)
    }

    checkCollision() {
        this.randomCellWidth = parseInt(getComputedStyle(this.cells[this.randomCell]).width.replace("px", ""))
        this.randomCellLeft = parseInt(getComputedStyle(this.cells[this.randomCell]).left.replace("px", ""))
        this.spriteWidth = parseInt(getComputedStyle(this.sprite).width.replace("px", ""))

        if ((this.x <= this.randomCellLeft || this.x + this.spriteWidth >= this.randomCellWidth) && !this.sprite.classList.contains("hidden")) {
            return true;
        } else {
            return false;
        }
    }

    removeObjective() {
        
        if (this.cells[this.randomCell].contains(this.sprite)) {
            this.sprite.removeEventListener("click", this.objectiveHitted)
            this.sprite.removeEventListener("click", this.emergingPoint)
            clearInterval(this.movementId)
            this.sprite.classList.add("hidden")
            setTimeout(() => this.cells[this.randomCell].removeChild(this.sprite), 1000)
        }
    }

    objectiveHitted() {
        const totalScoreNode = document.getElementById("totalScore")
        totalScoreNode.classList.add("growUp")
        this.sprite.removeEventListener("click", this.objectiveHitted)
        this.sprite.classList.add("hitted")
        
        setTimeout(() => {
            totalScoreNode.classList.remove("growUp")
            this.cells[this.randomCell].removeChild(this.sprite)
        }, 1000)
        
        let currentScore = parseInt(totalScoreNode.innerText);
        currentScore += this.score
        totalScoreNode.innerText = currentScore
        const soundHit = new Audio('assets/Sound/hit35.mp3.flac')
        soundHit.volume = 0.4
        soundHit.play()
    }

    emergingPoint(event){
        let x = event.clientX
        let y = event.clientY
        this.sprite.removeEventListener("click", this.emergingPoint)
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