var keys = {
    Space : false,
}

var bird = {
    goingUp : false,
    goingDown : false
}

var player = { playing: false, score: 0, speed: 3, gravity: 0.5, velocity: 0, upward: -10, highScore: getHighScore()}
var pointsBefore = player.score
var score = document.getElementById('score')
var popUp = document.getElementsByClassName('pop-up')
var base = document.getElementById('base')
var playerBird =  document.createElement('div')
playerBird.className = 'player-bird'
playerBird.y = playerBird.offsetTop
var gameArea = document.getElementById('game-area')
var blockerPipes = document.getElementsByClassName('blocker-pipes')


var startGame = popUp[0].addEventListener('click', function(){

    popUp[0].id = 'invisible'
    base.style.display = 'none'
    player.speed = 5
    gameArea.innerHTML = ''
    player.playing = true
    player.score = 0
    createPipeRow('pipe-row1')
    createPipeRow('pipe-row2')
    createPipeRow('pipe-row3')

    mainContainer[0].appendChild(playerBird)
    playerBird.style.transform = "unset"
    window.requestAnimationFrame(loop);
})

// click and press event listeners
mainContainer[0].addEventListener('click', flapUp)
document.addEventListener('keypress', flapUp)

function flapUp(e){
    bird.goingUp = true
    bird.goingDown = false
    document.getElementsByClassName('player-bird')[0].classList.add('bird-down')
    document.getElementsByClassName('player-bird')[0].classList.remove('bird-up')
    document.getElementsByClassName('player-bird')[0].classList.remove('bird-down')
    playerBird.y = playerBird.offsetTop
    player.velocity += player.upward
    playerBird.y += player.velocity
    playerBird.style.top =  playerBird.y + 'px'
}

function loop(){

    var blockerPipes = document.getElementsByClassName('blocker-pipes')
    
    if (player.playing){
        window.requestAnimationFrame(loop);
        moveBase()
        birdGravity()
        movePipes('pipe-row1',blockerPipes[0].x)
        movePipes('pipe-row2',blockerPipes[1].x)
        movePipes('pipe-row3',blockerPipes[2].x)

        if(bird.goingUp == true){
            document.getElementsByClassName('player-bird')[0].classList.add('bird-up')
            document.getElementsByClassName('player-bird')[0].classList.remove('bird-down')
            // document.getElementsByClassName('player-bird')[0].backgroundImage = '../assets/yellowbird-upflap.png'
        }
        else if(bird.goingDown == true){
            document.getElementsByClassName('player-bird')[0].classList.add('bird-down')
            document.getElementsByClassName('player-bird')[0].classList.remove('bird-up')
            document.getElementsByClassName('player-bird')[0].backgroundImage = '../assets/yellowbird-downflap.png'
        }
        else{
            document.getElementsByClassName('player-bird')[0].classList.add('bird-down')
            document.getElementsByClassName('player-bird')[0].classList.remove('bird-up')
            document.getElementsByClassName('player-bird')[0].classList.remove('bird-down')
        }

        score.innerHTML = 'Score: ' + player.score + '<br/> Speed: ' + player.speed

        if (player.score >= pointsBefore + 20){
            player.speed += 1
            pointsBefore = player.score
        }

    }
}
