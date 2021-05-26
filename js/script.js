var mouseActivity = {
    MouseHover : false,
    x : 1, 
    y : 1,
    height : 0.1,
    width : 0.1
}

// var bird = {
//     goingUp : false,
//     goingDown : false
// }
var canvas = document.getElementById('game')
var containerPos = (document.getElementsByClassName('main-container-wrapper'))[0]
var ctx = canvas.getContext('2d')

console.log('k', containerPos)
console.log('k', canvas.getBoundingClientRect())
var gridSize = 24;
var controlPanel = {
    height : gridSize,
    width : canvas.width
}
var gameBoard = [];

// var mousemove = document.addEventListener('mousemove',function(e){
canvas.addEventListener('mousemove',function(e){
    e.preventDefault();
    mouseActivity[e.MouseHover] = true
    // mouseActivity.x = e.clientX
    // mouseActivity.y = e.clientY
    mouseActivity.x = e.x - containerPos.getBoundingClientRect().left - 30
    mouseActivity.y = e.y - containerPos.getBoundingClientRect().top - 30
    console.log('move',e.clientX,e.clientY)
    // console.log(e.key)
})

// var mouseleave = document.addEventListener('mouseleave',function(e){
canvas.addEventListener('mouseleave',function(e){
    e.preventDefault();
    mouseActivity[e.MouseHover] = false
    mouseActivity.x = undefined
    mouseActivity.y = undefined
    console.log('not')

    // console.log(e.key)
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
            console.log('yes')
            ctx.strokeStyle = 'gray';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}



(function createGrid(){
    for(i = gridSize; i < canvas.height; i += gridSize){
        // for(j = 0; j < canvas.width; j += gridSize){
        for(j = gridSize * 2.6; j < canvas.width; j += gridSize){
            // console.log('in')
            gameBoard.push(new eachGrid(j, i))
        }
    }
})()

function drawGrid(){
    for(i = 0; i < gameBoard.length; i++){
        gameBoard[i].draw()
    }
}



function checkCollision(one, two){
    // one = val1.getBoundingClientRect()
    // two = val2.getBoundingClientRect()
    // console.log('l',one,two)
    
    if (!((one.x > two.x + two.width) || (one.y > two.y + two.height) || (one.x + one.width < two.x) || (one.y + one.height < two.y))){
        console.log('this',one.x,one.y,'mouse',two.x,two.y)
        return 1
    }
    else return 0
}

(function loop(){
    // console.log('ok')

    // var blockerPipes = document.getElementsByClassName('blocker-pipes')
    
    // if (player.playing){
        ctx.clearRect(0,0,canvas.width, canvas.height)
        ctx.fillStyle = 'blue';
        ctx.fillRect(0,0,controlPanel.width,controlPanel.height)
        drawGrid()
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
