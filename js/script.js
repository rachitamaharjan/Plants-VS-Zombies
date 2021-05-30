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

var bgImages = ["url('./assets/background_img/bgLevel1.png')", "url('./assets/background_img/bgLevel2.png')", "url('./assets/background_img/bgLevel3.jpg')"]

// bg
var PvZ = new Image()
PvZ.src = "./assets/PvZ.png"

// level complete
// var levelCompletenew Image()
// levelCompletec = "./assets/levels/levelCompleteg"

// surrender message
var surrenderMsg = new Image()
surrenderMsg.src = "./assets/surrenderMsg.png"

// level pause
// var gamePaused = new Image()
// gamePaused.src = "./assets/levels/gamePaused.png"

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

function hoverPlay(){
    hover.play()
}

var startGame = popUp[0].addEventListener('click', function(){

    // createGrid()
    select.play()
    popUp[0].id = 'invisible'
    mainmenu[0].id = 'visible'
    console.log('mm',mainmenu[0].id)
    // base.style.display = 'none'
    // player.speed = 5
    // gameArea.innerHTML = ''
    // player.playing = true
    // player.score = 0
    // createPipeRow('pipe-row1')
    // createPipeRow('pipe-row2')
    // createPipeRow('pipe-row3')

    // mainContainer[0].appendChild(playerBird)
    // playerBird.style.transform = "unset"
    // window.requestAnimationFrame(loop);
})

// if(player.level == 3){
//     TotalsunValue = 500
// }
// else{
//     TotalsunValue = 200;
// }

// event listeners

button_level1.addEventListener('click', function(){
    select.play()
    mainmenu[0].id = 'invisible'
    player.level = 1
    TotalsunValue = 200
    player.playing = true
    canvas.style.backgroundImage = bgImages[player.level - 1];
    window.requestAnimationFrame(loop);
})

button_level2.addEventListener('click', function(){
    select.play()
    mainmenu[0].id = 'invisible'
    player.level = 2
    TotalsunValue = 200
    player.playing = true
    canvas.style.backgroundImage = bgImages[player.level - 1];
    window.requestAnimationFrame(loop);
})

button_level3.addEventListener('click', function(){
    select.play()
    mainmenu[0].id = 'invisible'
    player.level = 3
    player.playing = true
    TotalsunValue = 500
    canvas.style.backgroundImage = bgImages[player.level - 1];
    window.requestAnimationFrame(loop);
})


restartBtn.addEventListener('click', function(){
    select.play()
    player.loseMessage = false
    zombieCount = 0
    plants = []
    count = 0
    gameBoard = [];
    plantVariety = [];
    selectedPlant = undefined
    if(player.level == 3){
        TotalsunValue = 500
    }
    else{
        TotalsunValue = 200;
    }
    suns = []
    zombies = []
    overlay.style.display = 'none'
    restartBtn.id = 'invisible'
    mainmenuBtn.id = 'invisible'
    gamePaused.id = 'invisible'
    levelComplete.id = 'invisible'
    player.endgame = false
    player.playing = true
    window.requestAnimationFrame(loop);
})

continueBtn.addEventListener('click', function(){
    select.play()
    player.loseMessage = false
    zombieCount = 0
    plants = []
    count = 0
    gameBoard = [];
    plantVariety = [];
    selectedPlant = undefined
    if(player.level == 3){
        TotalsunValue = 500
    }
    else{
        TotalsunValue = 200;
    }    suns = []
    zombies = []
    continueBtn.id = 'invisible'
    mainmenuBtn.id = 'invisible'
    gamePaused.id = 'invisible'
    levelComplete.id = 'invisible'
    overlay.style.display = 'none'
    restartBtn.id = 'invisible'
    player.endgame = false
    player.level += 1
    if(player.level > 3){
        showWinBoard()
    }
    player.playing = true
    canvas.style.backgroundImage = bgImages[player.level - 1];
    window.requestAnimationFrame(loop);
})


mainmenuBtn.addEventListener('click', function(){
    select.play()
    player.loseMessage = false
    overlay.style.display = 'none'
    mainmenu[0].id = 'visible'
    continueBtn.id = 'invisible'
    mainmenuBtn.id = 'invisible'    
    restartBtn.id = 'invisible'
    keepPlayingBtn.id = 'invisible'
    levelComplete.id = 'invisible'
    gamePaused.id = 'invisible'
    if(mainmenuBtn.style.top == '439px'){
        mainmenuBtn.style.top = '500px'
        mainmenuBtn.style.height = '70px'
        mainmenuBtn.style.width = '170px'
    }
    else{
        mainmenuBtn.style.top = '439px'
        mainmenuBtn.style.height = '35px'
        mainmenuBtn.style.width = '145px'
    }
    zombieCount = 0
    plants = []
    count = 0
    gameBoard = [];
    plantVariety = [];
    selectedPlant = undefined
    if(player.level == 3){
        TotalsunValue = 500
    }
    else{
        TotalsunValue = 200;
    }    suns = []
    zombies = []
    player.endgame = false
})

pauseBtn.addEventListener('click', function(){
    select.play()
    // ctx2.clearRect(0,0,canvas.width, canvas.height)
    overlay.style.display = 'block'
    ctx2.shadowOffsetX = 10;
    ctx2.shadowOffsetY = 10;
    ctx2.shadowColor = 'black';
    ctx2.shadowBlur = 5;
    gamePaused.id = 'visible'
    // ctx2.drawImage(gamePaused, canvas.width / 2 - 150, canvas.height / 2 - 150, 326, 300)
    keepPlayingBtn.id = 'visible'
    mainmenuBtn.id = 'visible'
    pauseBtn.id = 'invisible'
    levelComplete.id = 'invisible'
    mainmenuBtn.style.top = '439px'
    mainmenuBtn.style.height = '35px'
    mainmenuBtn.style.width = '145px'
    player.playing = false
})

keepPlayingBtn.addEventListener('click', function(){
    select.play()
    overlay.style.display = 'none'
    pauseBtn.id = 'visible'
    player.playing = true
    keepPlayingBtn.id = 'invisible'
    mainmenuBtn.id = 'invisible'
    gamePaused.id = 'invisible'
    // zombieCount = 0
    window.requestAnimationFrame(loop);
})

canvas.addEventListener('mousemove',function(e){
    e.preventDefault();
    mouseActivity[e.MouseHover] = true
    mouseActivity.x = e.pageX - canvas.getBoundingClientRect().left 
    mouseActivity.y = e.pageY - canvas.getBoundingClientRect().top 
})

// var mouseleave = document.addEventListener('mouseleave',function(e){
canvas.addEventListener('mouseleave',function(e){
    e.preventDefault();
    mouseActivity[e.MouseHover] = false
    mouseActivity.x = undefined
    mouseActivity.y = undefined
})

canvas.addEventListener('mousedown',function(e){
    mouseActivity.clicked = true
    console.log('m',mouseActivity.clicked)
})

canvas.addEventListener('mouseup',function(e){
    mouseActivity.clicked = false
})

canvas.addEventListener('click', function(e){
    var posx = mouseActivity.x - (mouseActivity.x % gridSize);
    var posy = mouseActivity.y - (mouseActivity.y % gridSize);
    var sunVal = undefined;
    if(selectedPlant == 0){
        sunVal = peashooterCard.sunValue
    }
    else if(selectedPlant == 1){
        sunVal = sunflowerCard.sunValue
    }
    else if(selectedPlant == 2){
        sunVal = snowPeashooterCard.sunValue
    }
    for (i = 0; i < plants.length; i++){
        if((plants[i].x == posx && plants[i].y == posy)){
            return
        }
    }
    if(player.level == 1){
        var startpointY = gridSize * 3
        endpointY = 320
    }
    else if(player.level == 2){
        var startpointY = gridSize * 2
        endpointY = 400
    }
    else if(player.level == 3){
        var startpointY = gridSize
        endpointY = 730
    }
    if ((TotalsunValue >= sunVal) && posx > startpointX && posx < endpointX && posy >= startpointY  && posy < endpointY){
        console.log('planted',posy,endpointY)
        plants.push(new Plant(posx, posy))
        plantation.play()
        TotalsunValue = TotalsunValue - sunVal
        // console.log('okk',posx,posy,e.x,e.y)
    }

})

function EachGrid(x, y){
    this.height = gridSize;
    this.width = gridSize;
    this.x = x;
    this.y = y;

    this.draw = function(){
        if(mouseActivity.x && mouseActivity.y && checkCollision(this, mouseActivity)){
            ctx.strokeStyle = 'green';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}



function createGrid(){
        console.log('level',player.level)
        if(player.level == 1){
            var startpointY = gridSize * 3
            endpointY = 320
        }
        else if(player.level == 2){
            var startpointY = gridSize * 2
            endpointY = 400
        }
        else if(player.level == 3){
            var startpointY = gridSize
            endpointY = 480
        }
        for(i = startpointY; i < endpointY; i += gridSize){
            for(j = startpointX; j < endpointX; j += gridSize){
                gameBoard.push(new EachGrid(j, i))
            }
        }
}
// createGrid()

function drawBoard(){
    ctx.drawImage(sunBoard, 10 , 10 , 76, 85)
    ctx.fillStyle = 'black'
    ctx.textAlign = "center"; 
    ctx.font = '20px Arial bold'
    ctx.fillText(TotalsunValue, 47, 88)
    pauseBtn.id = 'visible'
    if(player.level == 1){
        ctx.drawImage(lvl1Board, canvas.width - 195 , 0 , 345 / 2, 121 / 2)
    }
    else if(player.level == 2){
        ctx.drawImage(lvl2Board, canvas.width - 195 , 0 , 345 / 2, 121 / 2)
    }
    else if(player.level == 3){
        ctx.drawImage(lvl3Board, canvas.width - 195 , 0 , 345 / 2, 121 / 2)
    }
}

var peashooterCard = {
    x : 10,
    y : 105,
    height : 90,
    width : 65,
    fill : 'green',
    sunValue : 100
}


var sunflowerCard = {
    x : 10,
    y : 215,
    height : 90,
    width : 65,
    fill : 'green',
    sunValue : 50
}

var snowPeashooterCard = {
    x : 10,
    y : 325,
    height : 90,
    width : 65,
    fill : 'green',
    sunValue : 175
}

function plantSelecter(){
    if(checkCollision(peashooterCard, mouseActivity) && mouseActivity.clicked ){
        puff.play()
        selectedPlant = 0
    }
    if(checkCollision(sunflowerCard, mouseActivity) && mouseActivity.clicked ){
        puff.play()
        selectedPlant = 1
    }
    if(checkCollision(snowPeashooterCard, mouseActivity) && mouseActivity.clicked ){
        puff.play()
        selectedPlant = 2

    }
    if(selectedPlant == 0){
        peashooterCard.fill = 'green'
        sunflowerCard.fill = 'black'
        snowPeashooterCard.fill = 'black'
    }
    else if(selectedPlant == 1){
        sunflowerCard.fill = 'green'
        peashooterCard.fill = 'black'
        snowPeashooterCard.fill = 'black'
    }
    else if(selectedPlant == 2){
        snowPeashooterCard.fill = 'green'
        peashooterCard.fill = 'black'
        sunflowerCard.fill = 'black'
    }
    else{
        peashooterCard.fill = 'black'
        snowPeashooterCard.fill = 'black'
        sunflowerCard.fill = 'black'
    }

    ctx.lineWidth = 2
    ctx.fillStyle = peashooterCard.fill
    ctx.fillRect(peashooterCard.x, peashooterCard.y, peashooterCard.width + 10, peashooterCard.height + 10)
    ctx.drawImage(card_peashooter,peashooterCard.x + 5, peashooterCard.y + 5, peashooterCard.width, peashooterCard.height)
    
    if(player.level != 1){
    ctx.fillStyle = sunflowerCard.fill
    ctx.fillRect(sunflowerCard.x, sunflowerCard.y, sunflowerCard.width + 10, sunflowerCard.height + 10)
    ctx.drawImage(card_sunflower,sunflowerCard.x + 5, sunflowerCard.y + 5, sunflowerCard.width, sunflowerCard.height)
    
    ctx.fillStyle = snowPeashooterCard.fill
    ctx.fillRect(snowPeashooterCard.x, snowPeashooterCard.y, snowPeashooterCard.width + 10, snowPeashooterCard.height + 10)
    ctx.drawImage(card_snowPeashooter,snowPeashooterCard.x + 5, snowPeashooterCard.y + 5, snowPeashooterCard.width, snowPeashooterCard.height)
    }
    
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
    if(this.type == 1){
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
    if(player.level == 1){
        var startpointY = gridSize * 3
        endpointY = endpointX - gridSize * 2 
    }
    else if(player.level == 2){
        var startpointY = gridSize * 2
        endpointY = endpointX - gridSize
    }
    else if(player.level == 3){
        var startpointY = gridSize
        endpointY = endpointX
    }

    this.draw = function(){
        if(this.x > startpointX && this.x < endpointX && this.y >= startpointY && this.y < endpointY){
            if(this.type == 0){
            ctx.drawImage(peashooter,this.frameStart * this.imgwidth, 0, this.imgwidth, this.imgheight, this.x , this.y + (this.height / 5), this.width / 1.5, this.height / 1.5)
            }
            else if(this.type == 1){
            // ctx.fillStyle = 'black'
            // ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.drawImage(sunflower,this.frameStart * this.imgwidth, 0, this.imgwidth, this.imgheight, this.x , this.y + (this.height / 5), this.width / 1.5, this.height / 1.5)
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
        if(this.type == 1){
            if(this.plantCount % 500 == 0){
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
    createGrid()
    this.height = gridSize;
    this.width = gridSize;
    this.x = canvas.width;
    this.y = y;
    this.attack = false;
    if(player.level == 1){
        this.type = zombie_normal
        zombieLimit = 5
    }else{
        zombieLimit = 10
        this.type = zombieVariety[Math.floor(Math.random() * zombieVariety.length)]
    }
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
            chomp.play()
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
    if(type == 0){
        this.peaType = pea
        this.power = 5
    }
    else if(type == 2){
        this.peaType = snowPea
        this.power = 7
    }

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
            if (this.y == groundTouchValue){
                this.velocity = 0
            }            
    }
}

function showWinBoard(){
    // ctx2.clearRect(0,0,canvas.width, canvas.height)
    zombie_groan.play()
    overlay.style.display = 'block'
    ctx2.shadowOffsetX = 10;
    ctx2.shadowOffsetY = 10;
    ctx2.shadowColor = 'black';
    ctx2.shadowBlur = 5;
    ctx2.drawImage(surrenderMsg, canvas.width / 2 - 320, canvas.height / 2 - 220, 649, 438)
    // continueBtn.id = 'visible'
    mainmenuBtn.id = 'visible'
    pauseBtn.id = 'invisible'
    mainmenuBtn.style.top = '439px'
    mainmenuBtn.style.height = '70px'
    mainmenuBtn.style.width = '170px'
    player.playing = false
}


function loop(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    ctx2.clearRect(0,0,canvas.width, canvas.height)

    if(! player.playing){
        // zombie_groan.play()
        ctx.drawImage(PvZ, canvas.x, canvas.y, 4267 / 10, 2500 / 10)
    }
    else if (player.playing){
        // ctx.clearRect(0,0,canvas.width, canvas.height)
        drawBoard()
        plantSelecter()
        drawGrid()
        drawPlant()
        drawPea()
        drawZombie()
        drawSun()
        count ++
        if(zombies.length == 0 && zombieCount >= zombieLimit){
            zombie_groan.play()
            // ctx2.clearRect(0,0,canvas.width, canvas.height)
            overlay.style.display = 'block'
            ctx2.shadowOffsetX = 10;
            zombies = []
            zombieCount = 0
            ctx2.shadowOffsetY = 10;
            ctx2.shadowColor = 'black';
            ctx2.shadowBlur = 5;
            levelComplete.id = 'visible'
            // ctx2.drawImage(levelCompleteanvas.width / 2 - 150, canvas.height / 2 - 150, 326, 300)
            continueBtn.id = 'visible'
            mainmenuBtn.id = 'visible'
            pauseBtn.id = 'invisible'
            mainmenuBtn.style.top = '439px'
            mainmenuBtn.style.height = '35px'
            mainmenuBtn.style.width = '145px'
            player.playing = false
        }
        window.requestAnimationFrame(loop);
    }
    
    if (player.loseMessage){
        player.playing = false
        // player.loseMessage = false
        // ctx2.clearRect(0,0,canvas.width, canvas.height)
        overlay.style.display = 'block'
        ctx2.shadowOffsetX = 10;
        ctx2.shadowOffsetY = 10;
        ctx2.shadowColor = 'black';
        ctx2.shadowBlur = 5;
        // ctx2.drawImage(brainPlate, canvas.width / 3 + 100, canvas.height / 3 + 220, 713 / 4, 287 / 4)
        restartBtn.id = 'visible'
        mainmenuBtn.id = 'visible'
        pauseBtn.id = 'invisible'
        mainmenuBtn.style.top = '500px'
        mainmenuBtn.style.height = '70px'
        mainmenuBtn.style.width = '170px'
        ctx2.drawImage(zombiesWon, canvas.width / 3, canvas.height / 8, 564 / 1.5, 468 / 1.5)
    }
}
