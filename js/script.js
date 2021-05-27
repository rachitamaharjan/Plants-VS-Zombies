var mouseActivity = {
    MouseHover : false,
    x : undefined, 
    y : undefined,
    height : 0.1,
    width : 0.1
}


// var bird = {
//     goingUp : false,
//     goingDown : false
// }
var count = 0
var canvas = document.getElementById('game')
var containerPos = (document.getElementsByClassName('main-container-wrapper'))[0]
var ctx = canvas.getContext('2d')
canvas.width = 1000;
canvas.height = 500;
// console.log('k', containerPos)
console.log('k', canvas.getBoundingClientRect())
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
console.log('k',peashooter)
plantVariety.push(peashooter)
var TotalsunValue = 100;
var zombies = [];


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
    console.log('move',e.x, e.y, mouseActivity.x,mouseActivity.y)
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
    var sunValue = 0;
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
            console.log('draw',this.x,this.y)
        }
    }
}



(function createGrid(){
    for(i = gridSize; i < canvas.height; i += gridSize){
        for(j = 0; j < canvas.width; j += gridSize){
        // for(j = gridSize * 2; j < canvas.width; j += gridSize){
            // console.log('in')
            gameBoard.push(new eachGrid(j, i))
        }
    }
})()

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

    this.draw = function(){
        ctx.drawImage(peashooter,this.frameStart * this.imgwidth, 0, this.imgwidth, this.imgheight, this.x, this.y, this.width, this.height)
    }

    this.change = function(){
        if(count % 8 == 0){
            if(this.frameStart < this.frameEnd - 1){
                this.frameStart = this.frameStart + 1
            }
            else{
                this.frameStart = 1
            }
        }
    }
}




(function loop(){
    // console.log('ok')

    // var blockerPipes = document.getElementsByClassName('blocker-pipes')
    
    // if (player.playing){
        ctx.clearRect(0,0,canvas.width, canvas.height)
        ctx.fillStyle = 'gray';
        ctx.fillRect(0,0,controlPanel.width,controlPanel.height)
        drawGrid()
        drawPlant()
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

    // }
})()
