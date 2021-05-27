
// var range = 5
// var baseX = 0
// var mainContainer = document.getElementsByClassName('main-container')


function drawGrid(){
    for(i = 0; i < gameBoard.length; i++){
        gameBoard[i].draw()
    }
}

function drawPlant(){
    for(i = 0; i < plants.length; i++){
        // console.log('draw plant')
        plants[i].draw()
        plants[i].change()
    }
}

function checkCollision(one, two){
    // one = val1.getBoundingClientRect()
    // two = val2.getBoundingClientRect()
    // console.log('l',one,two)
    
    if (!((one.x > two.x + two.width) || (one.y > two.y + two.height) || (one.x + one.width < two.x) || (one.y + one.height < two.y))){
        // console.log('this',one.x,one.y,'mouse',two.x,two.y)
        return 1
    }
    else return 0
}

// function createPipeRow(classname){

//     for(i = 0; i < 2; i++){
//         var blockerPipes = document.createElement('div')
//         blockerPipes.className = 'blocker-pipes'
//         blockerPipes.classList.add(classname)
//         var height = Math.floor((Math.random() * mainContainer[0].offsetHeight/3 )+ 50)
//         blockerPipes.style.height = height + 'px'
//     if (i % 2 == 0){
//         blockerPipes.y = 0
//         blockerPipes.classList.add('pipe-up')
//     }
//     else{
//         blockerPipes.classList.add('pipe-down')
//         blockerPipes.y = mainContainer[0].offsetHeight - parseInt(blockerPipes.style.height)
//     }
//     blockerPipes.style.top = blockerPipes.y + 'px'
//     gameArea.appendChild(blockerPipes) 
//     }
// }

// function birdGravity(){

//     setTimeout(function(){
//         bird.goingDown = true
//         bird.goingUp = false
//         player.velocity += player.gravity
//         playerBird.y += player.velocity
//         playerBird.style.top = playerBird.y + 'px'

//         if(playerBird.y > mainContainer[0].offsetHeight){
//             playerBird.y = parseInt(mainContainer[0].offsetHeight)
//             player.velocity = 0
//             playerBird.style.top = (parseInt(mainContainer[0].offsetHeight) - playerBird.offsetHeight) + 'px'
//             playerBird.style.transform = "rotate(90deg)"
//             gameOver()
//         }

//         if(playerBird.y < 0){
//             playerBird.y = 0
//             player.velocity = 0
//         }
//     },300)
// }


// function moveBase(){
//     // var base = document.getElementById('base')
//     // console.log('base.x',base.getBoundingClientRect().right)
//     // if(parseInt(base.style.right) < 200){
//     //     var temp = parseInt(base.style.right)
//     //     temp += 850
//     //     base.style.right = temp + 'px'
//     //     console.log('ok',base.style.right)
//     // }
//     // baseX += player.speed
//     // base.style.right = baseX + 'px'
//     // base.style.right = base.x + 'px'
//     // console.log('base.x',player.speed,baseX,base.offsetWidth)

// }


// var movement = mainContainer[0].offsetWidth

// function movePipes(classname){
    
//     var elements = document.querySelectorAll('.' + classname)
//     elements.forEach(element => {
//         element.x = element.offsetLeft

//         if(checkCollision(playerBird, element)){
//             gameOver()
//         }
       
//         if(isPassingOver(element)){
//             player.score = player.score + 1
//         }

//         if(element.x < 0){
//             element.x += 1700
//             element.style.height = Math.floor((Math.random() * mainContainer[0].offsetHeight/3 )+ 50)
//         }

//         element.x -= player.speed
//         element.style.left = element.x + 'px'
//     });
// }

// function checkCollision(bird, pipe){
//     birdPos = bird.getBoundingClientRect()
//     pipePos = pipe.getBoundingClientRect()
    
//     if ((birdPos.top > pipePos.bottom) || (birdPos.bottom < pipePos.top) || (birdPos.right < pipePos.left) || (birdPos.left > pipePos.right)){
//         return 0
//     }
//     else return 1
// }

// function gameOver(){
//     var finalScore = player.score
//     console.log('f',finalScore)
//     player.playing = false
//     popUp[0].id = 'visible'
//     popUp[0].innerHTML = ' <br/> Final score: <span class = "display-key"> '+ finalScore + '</span><br/> High score: <span class = "display-key"> '+ player.highScore + '</span><br/> Click to Play Again!'
//     if (player.score > player.highScore){
//         player.highScore = player.score
//     }
//     storeHighScore()
//     player.score = 0    
// }

// function isPassingOver(element){
//     for(i = 150 - range; i <= 150 + range; i++){
//         if(element.offsetLeft == i){
//             var val = true
//             break
//         }
//     }
//     return val
// }

// function storeHighScore(){
//     if(player.highScore > window.localStorage.getItem('highScore') ){
//         localStorage.setItem('highScore', player.highScore);
//     }
//     if(window.localStorage.getItem('highScore') == null){
//         localStorage.setItem('highScore', 0);
//     }

// }

// function getHighScore(){
//     return localStorage.getItem('highScore');
// }