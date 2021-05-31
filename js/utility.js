

var stoppointX = 170
var startpointX = 215
var endpointX = 730
var endpointY = 480
var zombieLimit = undefined
var lvl1_grid = [240]
var lvl2_grid = [160, 240, 320]
var lvl3_grid = [80, 160, 240, 320, 400]

var mouseActivity = {
    MouseHover : false,
    x : undefined, 
    y : undefined,
    height : 0.1,
    width : 0.1,
    clicked : false
}

var player = {
    playing : false,
    endgame : false,
    level : undefined,
    loseMessage : false
}

var count = 0
var popUp = document.getElementsByClassName('pop-up')
var mainmenu = document.getElementsByClassName('main-menu')
var button_level1 = document.getElementById('lvl1')
var button_level2 = document.getElementById('lvl2')
var button_level3 = document.getElementById('lvl3')
var pauseBtn = document.getElementsByClassName('btn-pause')[0]
var keepPlayingBtn = document.getElementsByClassName('btn-play')[0]
var gamePaused = document.getElementsByClassName('game-pause')[0]

var levelComplete = document.getElementsByClassName('level-complete')[0]
var continueBtn = document.getElementsByClassName('btn-continue')[0]
var restartBtn = document.getElementsByClassName('btn-restart')[0]
var mainmenuBtn = document.getElementsByClassName('btn-mainmenu')[0]
var surrenderMsg = document.getElementsByClassName('final-msg')[0]

var howToPlay = document.getElementById('htp')
var htpReal = document.getElementsByClassName('htp-real')[0]
var htpZombie = document.getElementsByClassName('htp-zombie')[0]
var btnClose = document.getElementsByClassName('btn-close')[0]
var htpClose = document.getElementsByClassName('htp-close')[0]

var canvas = document.getElementById('game')
var containerPos = (document.getElementsByClassName('main-container-wrapper'))[0]
var ctx = canvas.getContext('2d')
var overlay = document.getElementById('overlay')
var ctx2 = overlay.getContext('2d')
canvas.width = 1000;
canvas.height = 500;
var gridSize = 80;
var TotalsunValue = undefined
var controlPanel = {
    height : gridSize,
    width : canvas.width
}
var gameBoard = [];
var plants = [];
var plantVariety = [];
var selectedPlant = undefined

var bgImages = ["url('./assets/background_img/bgLevel1.png')", "url('./assets/background_img/bgLevel2.png')", "url('./assets/background_img/bgLevel3.png')"]

// bg
var PvZ = new Image()
PvZ.src = "./assets/PvZ.png"

// level board
var lvl1Board = new Image()
lvl1Board.src = "./assets/boards/lvl1-board.png"
var lvl2Board = new Image()
lvl2Board.src = "./assets/boards/lvl2-board.png"
var lvl3Board = new Image()
lvl3Board.src = "./assets/boards/lvl3-board.png"

// peashooter
var card_peashooter = new Image()
card_peashooter.src = "./assets/cards/card_peashooter.png"
var peashooter = new Image()
peashooter.src = "./assets/peashooter/peashooter_idle.png"
plantVariety.push(peashooter)

// snowPeashooter
var card_snowPeashooter = new Image()
card_snowPeashooter.src = "./assets/cards/card_snowpea.png"
var snowPeashooter = new Image()
snowPeashooter.src = "./assets/snowPeaShooter/snowPeaShooter.png"
plantVariety.push(snowPeashooter)

// sunflower
var card_sunflower = new Image()
card_sunflower.src = "./assets/cards/card_sunflower.png"
var sunflower = new Image()
sunflower.src = "./assets/sunflower/sunflower.png"
plantVariety.push(sunflower)

var zombies = [];
var totalZombies = 10
var zombieCount = 0
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

var snowPea = new Image()
snowPea.src = "./assets/snowPea.png"

var suns = []
var sun = new Image()
sun.src = "./assets/sun.png"

var sunBoard = new Image()
sunBoard.src = "./assets/sunboard.png"

// audio
var select = new Audio()
select.src = 'assets/audio/click.mp3'

var hover = new Audio()
hover.src = 'assets/audio/hover.mp3'

var plantation = new Audio()
plantation.src = 'assets/audio/plantation.mp3'

var puff = new Audio()
puff.src = 'assets/audio/puff.mp3'

var pea_shoot = new Audio()
pea_shoot.src = 'assets/audio/pea_shoot.mp3'

var pea_hit = new Audio()
pea_hit.src = 'assets/audio/pea_hit.mp3'

var zombie_fall = new Audio()
zombie_fall.src = 'assets/audio/zombie_fall.mp3'

var bucket_zombie_fall = new Audio()
bucket_zombie_fall.src = 'assets/audio/bucket_zombie_fall.mp3'

var zombie_groan = new Audio()
zombie_groan.src = 'assets/audio/zombie_groan.mp3'

var chomp = new Audio()
chomp.src = 'assets/audio/chomp.mp3'

var zombieFinalKill = new Audio()
zombieFinalKill.src = 'assets/audio/zombieFinalKill.mp3'

var introTheme = new Audio()
introTheme.src = 'assets/audio/introTheme.mp3'

var level_select = new Audio()
level_select.src = 'assets/audio/level_select.mp3'

var theme = new Audio()
theme.src = 'assets/audio/theme.mp3'


function hoverPlay(){
    hover.play()
}


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
            // player.playing = false
            player.endgame = true
            player.loseMessage = true
        }
        if(zombies[i] && zombies[i].health <= 0){
                if(zombies[i].type == zombieVariety[0]){
                    zombie_fall.play()
                }
                else{
                    bucket_zombie_fall.play()
                }
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
                pea_hit.play()
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
