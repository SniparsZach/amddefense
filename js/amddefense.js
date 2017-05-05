var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");
var enemies = [];
var player = [];
var bullets = [];
var score = 0;
var htmlscore = document.getElementById(htmlscore);

function enemy(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.height = 55;
    this.width = 55;
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

var spawn = setInterval(function() {
    var tempRand = Math.random() * (myCanvas.height - 35);
    enemies.push(new enemy(0, tempRand));
}, 1000);

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
})


function bullet() {
    this.xPos = player.xPos;
    this.yPos = player.yPos;
    this.width = 10;
    this.height = 10;
    this.draw = function() {
        this.xPos-= 5;
        ctx.rect(this.xPos, this.yPos, this.width, this.height);
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
        ctx.stroke();
    };
}

document.addEventListener("shoot", function(evt) {
    if (evt.keyCode === 32) {
        bullets.push(new bullet());
    }
});

function isColliding(bullets, enemies) {
    var isLeft = enemies.xPos + enemies.width < bullets.xPos;
    var isRight = enemies.xPos > bullets.xPos + bullets.width;

    var isBelow = enemies.yPos < bullets.yPos;
    var isAbove = enemies.yPos > bullets.yPos + bullets.height;

    console.log("Relative to bullet:");
    console.log("Left: " + isLeft);
    console.log("Right: " + isRight);
    console.log("Below: " + isBelow);
    console.log("Right: " + isRight);

    return !(isRight || isLeft || isAbove || isBelow);

}



function death(player, enemies) {
    var isLeft = enemies.xPos + enemies.width < player.xPos;
    var isRight = enemies.xPos > player.xPos;

    var isBelow = enemies.yPos < player.yPos;
    var isAbove = enemies.yPos > player.yPos + player.height;

    console.log("Relative to player:");
    console.log("Left: " + isLeft);
    console.log("Right: " + isRight);
    console.log("Below: " + isBelow);
    console.log("Right: " + isRight);

    return !(isRight || isLeft || isAbove || isBelow);

}

function gameLoop() {
    ctx.beginPath();
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    console.log(enemies.length);
    
    player.move();
    player.draw();
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].move();
        enemies[i].draw();
        if (isColliding(enemies[i], bullet)) {
            enemies.splice(i, 1);
            bullets.splice(i, 1);
            score = score + 1;
            console.log("Score:" + " " + score);
        }
        if (death(player, enemies)) {
            alert("Game Over");
            console.log("Died");
            return;
        }
        if (bullets.xPos == 0) {
            bullets.splice(i,1);
        }
        if (enemies.xPos == myCanvas.width) {
            enemies.splice(i, 1);
            console.log("Enemy spliced by going out of map");
        }
    }
    
//    htmlscore.innerHTML = "Score:" + " " + score;
    
    window.requestAnimationFrame(gameLoop);
}

gameLoop();
