var mouseActivity = {
    MouseHover : false,
    x : undefined, 
    y : undefined,
    height : 0.1,
    width : 0.1,
    clicked : false
}

var player = {
    playing : true,
    endgame : false,
}

var count = 0
var canvas = document.getElementById('game')
var containerPos = (document.getElementsByClassName('main-container-wrapper'))[0]
var ctx = canvas.getContext('2d')
canvas.width = 1000;
canvas.height = 500;
var gridSize = 80;
var controlPanel = {
    height : gridSize,
    width : canvas.width
}
var gameBoard = [];
var plants = [];
var plantVariety = [];
var selectedPlant = undefined
// peashooter
var PvZ = new Image()
PvZ.src = "./assets/PvZ.png"

var card_peashooter = new Image()
card_peashooter.src = "./assets/cards/card_peashooter.png"
var peashooter = new Image()
peashooter.src = "./assets/peashooter/peashooter_idle.png"
plantVariety.push(peashooter)

// snowPeashooter
var card_snowPeashooter = new Image()
card_snowPeashooter.src = "./assets/cards/card_snowpea.png"
var snowPeashooter = new Image()
snowPeashooter.src = "./assets/snowPeashooter/snowPeashooter.png"
plantVariety.push(snowPeashooter)

// sunflower
var card_sunflower = new Image()
card_sunflower.src = "./assets/cards/card_sunflower.png"
var sunflower = new Image()
sunflower.src = "./assets/sunflower/sunflower.png"
plantVariety.push(sunflower)

var zombies = [];
var totalZombies = 10
var zombieCount = 1
var zombieVariety = []

// zombie normal
var zombie_head = new Image()
zombie_head.src = "./assets/zombie_normal/zombie_head.png"

var zombie_normal = new Image()
zombie_normal.src = "./assets/zombie_normal/zombie1.png"
zombieVariety.push(zombie_normal)
zombie_bucketHead = new Image()
zombie_bucketHead.src = "./assets/bucketHeadZombie/bucketHeadZombie.png"
zombieVariety.push(zombie_bucketHead)

var zombiesWon = new Image()
zombiesWon.src = "./assets/zombiesWin/ZombiesWon.png"
var brainPlate = new Image()
brainPlate.src = "./assets/zombiesWin/BrainOnAPlate.png"


var peas = []
var pea = new Image()
pea.src = "./assets/pea.png"

// var snowPeas = []
var snowPea = new Image()
snowPea.src = "./assets/snowPea.png"

var TotalsunValue = 500;
var suns = []
var sun = new Image()
sun.src = "./assets/sun.png"

var sunBoard = new Image()
sunBoard.src = "./assets/sunboard.png"

// event listeners
canvas.addEventListener('mousemove',function(e){
    e.preventDefault();
    mouseActivity[e.MouseHover] = true
    // mouseActivity.x = e.pageX
    // mouseActivity.y = e.pageY
    mouseActivity.x = e.pageX - canvas.getBoundingClientRect().left 
    mouseActivity.y = e.pageY - canvas.getBoundingClientRect().top 
    // mouseActivity.x = e.x - canvas.getBoundingClientRect().left - gridSize*2
    // mouseActivity.y = e.y - canvas.getBoundingClientRect().top - gridSize*2 
    // console.log('move',e.x, e.y, mouseActivity.x,mouseActivity.y)
    // console.log(e.key)
})

// var mouseleave = document.addEventListener('mouseleave',function(e){
canvas.addEventListener('mouseleave',function(e){
    e.preventDefault();
    mouseActivity[e.MouseHover] = false
    mouseActivity.x = undefined
    mouseActivity.y = undefined
    // console.log('not')

    // console.log(e.key)
})
console.log('m',mouseActivity.clicked)
canvas.addEventListener('mousedown',function(e){
    mouseActivity.clicked = true
    console.log('m',mouseActivity.clicked)
})

canvas.addEventListener('mouseup',function(e){
    mouseActivity.clicked = false
})

canvas.addEventListener('click', function(e){
    // console.log('clock')
    var posx = mouseActivity.x - (mouseActivity.x % gridSize);
    var posy = mouseActivity.y - (mouseActivity.y % gridSize);
    var sunVal = undefined;
    if(selectedPlant == 0){
        sunVal = sunflowerCard.sunValue
    }
    if(selectedPlant == 1){
        sunVal = peashooterCard.sunValue
    }
    if(selectedPlant == 2){
        sunVal = snowPeashooterCard.sunValue
    }
    for (i = 0; i < plants.length; i++){
        if((plants[i].x == posx && plants[i].y == posy)){
            return
        }
    }
    if ((TotalsunValue >= sunVal) && posx > startpointX && posx < endpointX && posy >= gridSize){
        plants.push(new Plant(posx, posy))
        TotalsunValue = TotalsunValue - sunVal
        // console.log('okk',posx,posy,e.x,e.y)
    }

})

// var player = { playing: false, score: 0, speed: 3, gravity: 0.5, velocity: 0, upward: -10, highScore: getHighScore()}
// var pointsBefore = player.score
// var score = document.getElementById('score')
// var popUp = document.getElementsByClassName('pop-up')
// var base = document.getElementById('base')
// var playerBird =  document.createElement('div')
// playerBird.className = 'player-bird'
// playerBird.y = playerBird.offsetTop
// var gameArea = document.getElementById('game-area')
// var blockerPipes = document.getElementsByClassName('blocker-pipes')


// var startGame = popUp[0].addEventListener('click', function(){

//     // popUp[0].id = 'invisible'
//     // base.style.display = 'none'
//     // player.speed = 5
//     // gameArea.innerHTML = ''
//     // player.playing = true
//     // player.score = 0
//     // createPipeRow('pipe-row1')
//     // createPipeRow('pipe-row2')
//     // createPipeRow('pipe-row3')

//     // mainContainer[0].appendChild(playerBird)
//     // playerBird.style.transform = "unset"
//     window.requestAnimationFrame(loop);
// })

// // click and press event listeners
// mainContainer[0].addEventListener('click', flapUp)
// document.addEventListener('keypress', flapUp)

// function flapUp(e){
//     bird.goingUp = true
//     bird.goingDown = false
//     document.getElementsByClassName('player-bird')[0].classList.add('bird-down')
//     document.getElementsByClassName('player-bird')[0].classList.remove('bird-up')
//     document.getElementsByClassName('player-bird')[0].classList.remove('bird-down')
//     playerBird.y = playerBird.offsetTop
//     player.velocity += player.upward
//     playerBird.y += player.velocity
//     playerBird.style.top =  playerBird.y + 'px'
// }

function eachGrid(x, y){
    this.height = gridSize;
    this.width = gridSize;
    this.x = x;
    this.y = y;

    this.draw = function(){
        if(mouseActivity.x && mouseActivity.y && checkCollision(this, mouseActivity)){
            // console.log('yes')
            ctx.strokeStyle = 'green';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
            // ctx.fillStyle = 'green';
            // ctx.fillRect(this.x, this.y, this.width, this.height);
            // console.log('draw',this.x,this.y)
        }
    }
}



(function createGrid(){
    for(i = gridSize; i < endpointY; i += gridSize){
        for(j = startpointX; j < endpointX; j += gridSize){
        // for(j = gridSize * 2; j < canvas.width; j += gridSize){
            // console.log('in')
            gameBoard.push(new eachGrid(j, i))
        }
    }
})()

function drawBoard(){
    ctx.drawImage(sunBoard, 10 , 10 , 76, 85)
    ctx.fillStyle = 'black'
    ctx.textAlign = "center"; 
    ctx.font = '20px Arial bold'
    ctx.fillText(TotalsunValue, 47, 88)
}

var sunflowerCard = {
    x : 10,
    y : 105,
    height : 90,
    width : 65,
    fill : 'green',
    sunValue : 50
}


var peashooterCard = {
    x : 10,
    y : 205,
    height : 90,
    width : 65,
    fill : 'green',
    sunValue : 100
}

var snowPeashooterCard = {
    x : 10,
    y : 305,
    height : 90,
    width : 65,
    fill : 'green',
    sunValue : 175
}

function plantSelecter(){
    if(checkCollision(sunflowerCard, mouseActivity) && mouseActivity.clicked ){
        selectedPlant = 0
    }
    if(checkCollision(peashooterCard, mouseActivity) && mouseActivity.clicked ){
        selectedPlant = 1
    }
    if(checkCollision(snowPeashooterCard, mouseActivity) && mouseActivity.clicked ){
        selectedPlant = 2
    }
    if(selectedPlant == 0){
        sunflowerCard.fill = 'black'
        peashooterCard.fill = 'green'
        snowPeashooterCard.fill = 'green'
    }
    else if(selectedPlant == 1){
        peashooterCard.fill = 'black'
        sunflowerCard.fill = 'green'
        snowPeashooterCard.fill = 'green'
    }
    else if(selectedPlant == 2){
        snowPeashooterCard.fill = 'black'
        peashooterCard.fill = 'green'
        sunflowerCard.fill = 'green'
    }
    else{
        peashooterCard.fill = 'green'
        snowPeashooterCard.fill = 'green'
        sunflowerCard.fill = 'green'
    }
    ctx.lineWidth = 2
    ctx.fillStyle = peashooterCard.fill
    ctx.fillRect(peashooterCard.x, peashooterCard.y, peashooterCard.width + 5, peashooterCard.height + 5)
    ctx.drawImage(card_peashooter,peashooterCard.x + 2.5, peashooterCard.y + 2.5, peashooterCard.width, peashooterCard.height)
    ctx.fillStyle = snowPeashooterCard.fill
    ctx.fillRect(snowPeashooterCard.x, snowPeashooterCard.y, snowPeashooterCard.width + 5, snowPeashooterCard.height + 5)
    ctx.drawImage(card_snowPeashooter,snowPeashooterCard.x + 2.5, snowPeashooterCard.y + 2.5, snowPeashooterCard.width, snowPeashooterCard.height)
    ctx.fillStyle = sunflowerCard.fill
    ctx.fillRect(sunflowerCard.x, sunflowerCard.y, sunflowerCard.width + 5, sunflowerCard.height + 5)
    ctx.drawImage(card_sunflower,sunflowerCard.x + 2.5, sunflowerCard.y + 2.5, sunflowerCard.width, sunflowerCard.height)

}

function Plant(x, y){
    this.height = gridSize;
    this.width = gridSize;
    this.x = x;
    this.y = y;
    this.health = 30;
    this.attack = false;
    this.type = selectedPlant
    this.plantCount = 0
    // this.type = plantVariety[0]
    if(this.type == 0){
        this.frameStart = 0
        this.frameEnd = 17
        this.imgheight = 74
        this.imgwidth = 75
    }
    else{
        this.frameStart = 0
        this.frameEnd = 13
        this.imgheight = 73
        this.imgwidth = 73
    }

    this.draw = function(){
        if(this.x > startpointX && this.x < endpointX && this.y >= gridSize && this.y < endpointY){
            if(this.type == 0){
            // ctx.fillStyle = 'black'
            // ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.drawImage(sunflower,this.frameStart * this.imgwidth, 0, this.imgwidth, this.imgheight, this.x , this.y + (this.height / 5), this.width / 1.5, this.height / 1.5)
            }
            if(this.type == 1){
            ctx.drawImage(peashooter,this.frameStart * this.imgwidth, 0, this.imgwidth, this.imgheight, this.x , this.y + (this.height / 5), this.width / 1.5, this.height / 1.5)
            }
            else if(this.type == 2){
            ctx.drawImage(snowPeashooter,this.frameStart * this.imgwidth, 0, this.imgwidth, this.imgheight, this.x , this.y + (this.height / 5), this.width / 1.5, this.height / 1.5)
            }
        }
    }

    this.change = function(){
        this.plantCount ++
        if(count % 8 == 0){
            if(this.frameStart < this.frameEnd - 1){
                this.frameStart = this.frameStart + 1
            }
            else{
                this.frameStart = 1
            }
        }
        if(this.type == 0){
            if(this.plantCount % 800 == 0){
                suns.push(new Sun(this.x, this.y))
            }
        }
        else{
            if(this.plantCount % 100 == 0){
                peas.push(new Pea(this.type, this.x + (gridSize / 4), this.y + (gridSize / 6)))
            }
        }
    }
}

function Zombie(y){
    this.height = gridSize;
    this.width = gridSize;
    this.x = canvas.width;
    this.y = y;
    this.attack = false;
    this.type = zombieVariety[Math.floor(Math.random() * zombieVariety.length)]
    console.log('choose',this.type, zombieVariety[1], Math.floor(Math.random() * zombieVariety.length))
    if (this.type == zombieVariety[0]){
        this.health = 30;
        this.frameStart = 0
        this.frameEnd = 21
        this.attackFrameStart = 23
        this.attackFrameConst = 23
        this.attackFrameEnd = 43
        this.dieFrameStart = 44
        this.dieFrameConst = 44
        this.dieFrameEnd = 52
    }
    if (this.type == zombieVariety[1]){
        this.health = 50;
        this.frameStart = 0
        this.frameEnd = 14
        this.attackFrameStart = 15
        this.attackFrameConst = 15
        this.attackFrameEnd = 25
        this.dieFrameStart = 26
        this.dieFrameConst = 26
        this.dieFrameEnd = 35
    }
    this.imgheight = 146
    this.imgwidth = 168
    this.velocity = 0.5
    this.spriteSpeed = 3
    this.attacking = false
    this.dying = false

    this.draw = function(){
        // ctx.fillStyle = 'black'
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        if(this.dying == true){
            ctx.drawImage(this.type,this.dieFrameStart * this.imgwidth, 0, this.imgwidth, this.imgheight, this.x - (this.width / 1.5), this.y - (this.height / 2), this.width * 1.5, this.height * 1.5)
            ctx.drawImage(zombie_head,(this.dieFrameStart - this.dieFrameConst) * 150, 0, 150, 186, this.x - (this.width / 1.5), this.y - (this.height / 2), this.width * 1.5, this.height * 1.5)
        }
        else if(this.attacking == true){
            ctx.drawImage(this.type,this.attackFrameStart * this.imgwidth, 0, this.imgwidth, this.imgheight, this.x - (this.width / 1.5), this.y - (this.height / 2), this.width * 1.5, this.height * 1.5)
        }
        else{
            ctx.drawImage(this.type,this.frameStart * this.imgwidth, 0, this.imgwidth, this.imgheight, this.x - (this.width / 1.5), this.y - (this.height / 2), this.width * 1.5, this.height * 1.5)
        }
    }

    this.change = function(){
            this.x = this.x - this.velocity
            if(this.dying == true){
                if(count % 3 == 0){
                    if(this.dieFrameStart < this.dieFrameEnd){
                        this.dieFrameStart = this.dieFrameStart + 1
                    }
                    else{
                        this.dieFrameStart = this.dieFrameEnd
                    }
                }
                this.velocity = 0
            }
            else if(this.attacking == true){
                if(count % 3 == 0){
                    if(this.attackFrameStart < this.attackFrameEnd - 1){
                        this.attackFrameStart = this.attackFrameStart + 1
                    }
                    else{
                        this.attackFrameStart = this.attackFrameConst
                    }
                }
            }
            else{
                if(count % this.spriteSpeed == 0){
                    if(this.frameStart < this.frameEnd){
                        this.frameStart = this.frameStart + 1
                    }
                    else{
                        this.frameStart = 0
                    }
                }
            }
            
    }
}

function Pea(type, x, y){
    this.width = 50;
    this.height = 28;
    this.x = x;
    this.y = y;
    this.velocity = 5
    if(type == 1){
        this.peaType = pea
        this.power = 5
    }
    else if(type == 2){
        this.peaType = snowPea
        this.power = 7
    }
    // this.attack = true

    this.draw = function(){
        ctx.drawImage(this.peaType,this.x , this.y, this.width, this.height)
    }

    this.change = function(){
                this.x = this.x + this.velocity
    }
}

function Sun(x, y){
    this.height = gridSize;
    this.width = gridSize;
    this.x = x;
    this.y = y;
    this.frameStart = 0
    this.frameEnd = 21
    this.imgheight = 80
    this.imgwidth = 80
    this.velocity = 1
    this.value = 25

    this.draw = function(){
        // ctx.fillStyle = 'black'
        // ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.drawImage(sun,this.frameStart * this.imgwidth, 0, this.imgwidth, this.imgheight, this.x, this.y, this.width / 1.5, this.height / 1.5)
    }

    this.change = function(){
            this.y = this.y + this.velocity
                if(count % 5 == 0){
                    if(this.frameStart < this.frameEnd){
                        this.frameStart = this.frameStart + 1
                    }
                    else{
                        this.frameStart = 0
                    }
                }
            groundTouchValue = Math.floor(Math.random() * 5 + 1) * gridSize
            // console.log('value',groundTouchValue)
            if (this.y == groundTouchValue){
                this.velocity = 0
            }
                // this.velocity = 0
            
    }
}


(function loop(){
    // console.log('ok')

    // var blockerPipes = document.getElementsByClassName('blocker-pipes')
    if(! player.playing){
        ctx.drawImage(PvZ, canvas.x, canvas.y, 4267 / 10, 2500 / 10)
    }
    else if (player.playing){
        ctx.clearRect(0,0,canvas.width, canvas.height)
        // ctx.fillStyle = 'gray';
        drawBoard()
        plantSelecter()
        // ctx.fillRect(0,0,controlPanel.width,controlPanel.height)
        drawGrid()
        drawPlant()
        drawPea()
        drawZombie()
        drawSun()
        count ++
        if(zombies.length == 0){
            ctx.fillStyle = 'Black'
            ctx.font = '40px Bold Arial'
            ctx.fillText('ZOMBIES WERE DEFEATED! YOU WON', canvas.width / 2, canvas.height / 2)
            player.playing = false
        }
        window.requestAnimationFrame(loop);

    }
    if (player.endgame == true){
        ctx.shadowOffsetX = 10;
            ctx.shadowOffsetY = 10;
            ctx.shadowColor = 'black';
            ctx.shadowBlur = 50;
            ctx.drawImage(brainPlate, canvas.width / 3 + 100, canvas.height / 3 + 220, 713 / 4, 287 / 4)
            ctx.drawImage(zombiesWon, canvas.width / 3, canvas.height / 8, 564 / 1.5, 468 / 1.5)
    }
})()
