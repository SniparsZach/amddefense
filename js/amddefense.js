var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");
var enemies = [];
var bullets = [];
var score = 0;
var htmlscore = document.getElementById(htmlscore);

function enemy(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.height = 65;
    this.width = 65;
    this.draw = function() {
        ctx.beginPath();
        var amdImage = document.createElement("img");
        amdImage.src = "pictures/amdlogo.png";
        ctx.drawImage(amdImage, this.xPos, this.yPos, this.width, this.height);
    };

    this.move = function() {
        this.xPos -= -2;
        this.yPos -= 0;
    };
}

function bullet(xPos,yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = 10;
    this.height = 10;
    this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.xPos, this.yPos, this.width, this.height);
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
        ctx.stroke();
    };
    
    this.move = function() {
        this.xPos -= 7;
        this.yPos -= 0;
    };

}

var player = {
    xPos: 800,
    yPos: 250,
    goUp: false,
    goDown: false,
    height:45,
    width:45,
    move: function() {
        if (player.goUp && player.yPos > 0) {
            this.yPos -= 5;
        }
        if (player.goDown && player.yPos < 455) {
            this.yPos += 5;
        }
    },
    draw: function() {
        ctx.beginPath();
        var nvidiaImage = document.createElement("img");
        nvidiaImage.src = "pictures/nvidiaplayer.jpg";
        ctx.drawImage(nvidiaImage, this.xPos, this.yPos, this.width, this.height);
    }
};

var spawn = setInterval(function() {
    var tempRand = Math.random() * (myCanvas.height - 35);
    enemies.push(new enemy(0, tempRand));
    console.log("Enemies: " + enemies.length);

}, 1000);

document.body.onkeyup = function(evt) {
    if(evt.keyCode === 32) {
        bullets.push(new bullet(player.xPos, player.yPos+17.5));
        console.log("Bullets Fired: " + bullets.length);
    }    
};

/* function whenPushed () {
    setTimeout(function () {
    if(evt.keyCode === 32) {
        bullets.push(new bullet(player.xPos, player.yPos+17.5));
        console.log("Bullets Fired: " + bullets.length);
    }    
}, 3000); */

document.addEventListener("keydown", function(evt){
    if(evt.keyCode === 37){
        player.goLeft = true;
    }
    if(evt.keyCode === 38){
        player.goUp = true;
    }
    if(evt.keyCode === 39){
        player.goRight = true;
    }
    if(evt.keyCode === 40){
        player.goDown = true;        
    }    
    
});

document.addEventListener("keyup", function(evt){
    if(evt.keyCode === 37){
        player.goLeft = false;
    }
    if(evt.keyCode === 38){
        player.goUp = false;
    }
    if(evt.keyCode === 39){
        player.goRight = false;
    }
    if(evt.keyCode === 40){
        player.goDown = false;        
    }    
});

function isColliding(bullets, enemies) {
    var isLeft = enemies.xPos + enemies.width < bullets.xPos; //xPos undefined [bullets var]
    var isRight = enemies.xPos > bullets.xPos;

    var isBelow = enemies.yPos < bullets.yPos;
    var isAbove = enemies.yPos > bullets.yPos + bullets.height;

    return !(isRight || isLeft || isAbove || isBelow);

}

function death(player, enemies) {
    var isLeft = enemies.xPos + enemies.width < player.xPos;
    var isRight = enemies.xPos > player.xPos;

    var isBelow = enemies.yPos < player.yPos;
    var isAbove = enemies.yPos > player.yPos + player.height;

    return !(isRight || isLeft || isAbove || isBelow);

}

function gameLoop() {
    ctx.beginPath();
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    console.log(bullets[i]);
    
    player.move();
    player.draw();

    for (var i = 0; i < bullets.length; i++) {
        bullets[i].move();
        bullets[i].draw();
        if (isColliding(bullets[i], enemies[i])) { //xPos undefined [bullets var]
            enemies.splice(i, 1);
            bullets.splice(i, 1);
            score = score + 1;
            console.log("Score: " + score);
        }
        if (bullets[i].xPos == 0) {
            bullets.splice(i,1);
            console.log("Bullet spliced by going out of the map");
        }
    }    
    
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].move();
        enemies[i].draw();
        if (death(enemies[i], player)) {
            alert("Game Over");
            console.log("Died");
            return;
        }
        if (enemies[i].xPos == 900) {
            enemies.splice(i, 1);
            console.log("Enemy spliced by going out of map");
        }
    }
    
//    htmlscore.innerHTML = "Score:" + " " + score;
    
    window.requestAnimationFrame(gameLoop);
}

gameLoop();
