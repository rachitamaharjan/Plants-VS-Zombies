

var stoppointX = 170
var startpointX = 215
var endpointX = 730
var endpointY = 480
var zombieLimit = undefined
var lvl1_grid = [240]
var lvl2_grid = [160, 240, 320]
var lvl3_grid = [80, 160, 240, 320, 400]
// if(player.level == 1){
//     var startPointY = 240
//     endpointY = 730 - 160 
//     // var startPointY = gridSize * 3
//     // endpointY = 730 - gridSize * 2 
// }
// else if(player.level == 2){
//     var startPointY = gridSize * 2
//     endpointY = 730 - gridSize
// }
// else if(player.level == 3){
//     var startPointY = gridSize
//     endpointY = 730
// }

function drawGrid(){
    for(i = 0; i < gameBoard.length; i++){
        gameBoard[i].draw()
    }
}


function drawPlant(){
    for(i = 0; i < plants.length; i++){
        plants[i].draw()
        plants[i].change()
        for(j = 0; j < zombies.length; j++){
            if (plants[i] && checkCollision(plants[i], zombies[j])){
                zombies[j].attacking = true
                zombies[j].velocity = 0
                plants[i].health -= 0.1
                // peas[i].attack = false
            }
            if(plants[i] && plants[i].health <= 0){
                plants.splice(i, 1)
                i--
                zombies[j].attacking = false
                zombies[j].velocity = 0.5
            }
        }
    }
}

function drawZombie(){
    for(i = 0; i < zombies.length; i++){
        if(zombies[i].health <= 7){
            zombies[i].dying = true
        }
        zombies[i].draw()
        zombies[i].change()
        if (zombies[i].x < stoppointX){
            player.playing = false
            player.endgame = true
        }
        if(zombies[i] && zombies[i].health <= 0){
                zombies.splice(i, 1)
                totalZombies -= 1
                i--
        }
    }
    if(count % 500 == 0){
        if(player.level == 1){
             if(zombieCount < 5){
                zombies.push(new Zombie(240))
            }
        }
        else if(player.level == 2){
            if(zombieCount < 10){
                zombies.push(new Zombie(lvl2_grid[Math.floor(Math.random() * lvl2_grid.length)]))
            }
        }
        else if(player.level == 3){
            if(zombieCount < 10){
                zombies.push(new Zombie(lvl3_grid[Math.floor(Math.random() * lvl3_grid.length)]))
            }
        }
        zombieCount++
    }
}

function drawPea(){
    for(i = 0; i < peas.length; i++){
        peas[i].draw()
        peas[i].change()

        for(j = 0; j < zombies.length; j++){
            if (peas[i] && checkCollision(peas[i], zombies[j])){
                zombies[j].health -= peas[i].power
                peas.splice(i, 1)
                i --
            }
        }
        if (peas[i] && peas[i].x > canvas.width - gridSize){
            peas.splice(i, 1)
            i --
        }
    }
}

function drawSun(){
    for(i = 0; i < suns.length; i++){
        suns[i].draw()
        suns[i].change()

        if(suns[i] && mouseActivity.x && mouseActivity.y && checkCollision(suns[i], mouseActivity)){
            console.log('yes')
            TotalsunValue = TotalsunValue + suns[i].value
            suns.splice(i, 1)
            i --
        }
    }
    if(count % 1000 == 0){
        suns.push(new Sun(Math.floor(Math.random() * 5) * gridSize + startpointX, 0))
    }
}

function checkCollision(one, two){
    if (!((one.x >= two.x + two.width) || (one.y >= two.y + two.height) || (one.x + one.width <= two.x) || (one.y + one.height <= two.y))){
        return 1
    }
    else return 0
}
