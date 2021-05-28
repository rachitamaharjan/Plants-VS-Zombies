var mouseActivity = {
    MouseHover : false,
    x : undefined, 
    y : undefined,
    height : 0.1,
    width : 0.1
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
var peashooter = new Image()
peashooter.src = "./assets/peashooter/peashooter_idle.png"
plantVariety.push(peashooter)
var TotalsunValue = 100;

var zombies = [];
var zombie_normal = new Image()
zombie_normal.src = "./assets/zombie_normal/zombie1.png"
var zombie_head = new Image()
zombie_head.src = "./assets/zombie_normal/zombie_head.png"

var peas = []
var pea = new Image()
pea.src = "./assets/pea.png"

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

canvas.addEventListener('click', function(e){
    // console.log('clock')
    var posx = mouseActivity.x - (mouseActivity.x % gridSize);
    var posy = mouseActivity.y - (mouseActivity.y % gridSize);
    var sunValue = 10;
    for (i = 0; i < plants.length; i++){
        if((plants[i].x == posx && plants[i].y == posy)){
            return
        }
    }
    if (TotalsunValue >= sunValue){
        plants.push(new Plant(posx, posy))
        TotalsunValue = TotalsunValue - sunValue
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

function Plant(x, y){
    this.height = gridSize;
    this.width = gridSize;
    this.x = x;
    this.y = y;
    this.health = 30;
    this.attack = false;
    this.type = plantVariety[0]
    this.frameStart = 0
    this.frameEnd = 13
    this.imgheight = 73
    this.imgwidth = 73
    this.plantCount = 0

    this.draw = function(){
            if(this.x > startpointX && this.x < endpointX && this.y >= gridSize && this.y < endpointY){
            // ctx.fillStyle = 'black'
            // ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.drawImage(peashooter,this.frameStart * this.imgwidth, 0, this.imgwidth, this.imgheight, this.x , this.y + (this.height / 5), this.width / 1.5, this.height / 1.5)
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
        if(this.plantCount % 100 == 0){
            peas.push(new Pea(this.x + (gridSize / 4), this.y + (gridSize / 6)))
        }
    }
}

function Zombie(y){
    this.height = gridSize;
    this.width = gridSize;
    this.x = canvas.width;
    this.y = y;
    this.health = 30;
    this.attack = false;
    this.type = plantVariety[0]
    this.frameStart = 0
    this.frameEnd = 21
    this.attackFrameStart = 23
    this.attackFrameEnd = 43
    this.dieFrameStart = 44
    this.dieFrameEnd = 52
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
            ctx.drawImage(zombie_normal,this.dieFrameStart * this.imgwidth, 0, this.imgwidth, this.imgheight, this.x - (this.width / 1.5), this.y - (this.height / 2), this.width * 1.5, this.height * 1.5)
            ctx.drawImage(zombie_head,(this.dieFrameStart - 44) * 150, 0, 150, 186, this.x - (this.width / 1.5), this.y - (this.height / 2), this.width * 1.5, this.height * 1.5)
        }
        else if(this.attacking == true){
            ctx.drawImage(zombie_normal,this.attackFrameStart * this.imgwidth, 0, this.imgwidth, this.imgheight, this.x - (this.width / 1.5), this.y - (this.height / 2), this.width * 1.5, this.height * 1.5)
        }
        else{
            ctx.drawImage(zombie_normal,this.frameStart * this.imgwidth, 0, this.imgwidth, this.imgheight, this.x - (this.width / 1.5), this.y - (this.height / 2), this.width * 1.5, this.height * 1.5)
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
                        this.dieFrameStart = 52
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
                        this.attackFrameStart = 24
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

function Pea(x, y){
    this.width = 50;
    this.height = 28;
    this.x = x;
    this.y = y;
    this.velocity = 5
    // this.attack = true

    this.draw = function(){
            ctx.drawImage(pea,this.x , this.y, this.width, this.height)
    }

    this.change = function(){
                this.x = this.x + this.velocity
    }
}

function Sun(x){
    this.height = gridSize;
    this.width = gridSize;
    this.x = x;
    this.y = 0;
    this.frameStart = 0
    this.frameEnd = 21
    this.imgheight = 80
    this.imgwidth = 80
    this.velocity = 1
    this.value = 10

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
    
    if (player.playing){
        ctx.clearRect(0,0,canvas.width, canvas.height)
        // ctx.fillStyle = 'gray';
        drawBoard()
        // ctx.fillRect(0,0,controlPanel.width,controlPanel.height)
        drawGrid()
        drawPlant()
        drawPea()
        drawZombie()
        drawSun()
        count ++
        window.requestAnimationFrame(loop);
    //     moveBase()
    //     birdGravity()
    //     movePipes('pipe-row1',blockerPipes[0].x)
    //     movePipes('pipe-row2',blockerPipes[1].x)
    //     movePipes('pipe-row3',blockerPipes[2].x)

    //     if(bird.goingUp == true){
    //         document.getElementsByClassName('player-bird')[0].classList.add('bird-up')
    //         document.getElementsByClassName('player-bird')[0].classList.remove('bird-down')
    //         // document.getElementsByClassName('player-bird')[0].backgroundImage = '../assets/yellowbird-upflap.png'
    //     }
    //     else if(bird.goingDown == true){
    //         document.getElementsByClassName('player-bird')[0].classList.add('bird-down')
    //         document.getElementsByClassName('player-bird')[0].classList.remove('bird-up')
    //         document.getElementsByClassName('player-bird')[0].backgroundImage = '../assets/yellowbird-downflap.png'
    //     }
    //     else{
    //         document.getElementsByClassName('player-bird')[0].classList.add('bird-down')
    //         document.getElementsByClassName('player-bird')[0].classList.remove('bird-up')
    //         document.getElementsByClassName('player-bird')[0].classList.remove('bird-down')
    //     }

    //     score.innerHTML = 'Score: ' + player.score + '<br/> Speed: ' + player.speed

    //     if (player.score >= pointsBefore + 20){
    //         player.speed += 1
    //         pointsBefore = player.score
    //     }

    }
})()
