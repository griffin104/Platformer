let loadMap = function(level) {
    player = [];
    lava = [];
    exit = [];
    ground = [];
    coin = [];
    if (level.length === 300) {
        mapWidth = 30;
        console.log("fdss")
        canvas.width = 600;
        canvas.height = 200;
    } else if (level.length === 400) {
        mapWidth = 20;
        canvas.width = 400;
        canvas.height = 400;
    } else if (level.length === 1000){
        canvas.width = 1000;
        canvas.height = 400;
        mapWidth = 50;
    }
    for (let i = 0; i < level.length; i++) {
        let xCoord = i % mapWidth;
        let yCoord = Math.floor(i / mapWidth);
        let point = {
            x: xCoord,
            y: yCoord
        };
        switch (level[i]) {
            case "P":
                point.color = green;
                player.push(point);
                break;
            case "L":
                point.color = orange;
                lava.push(point);
                break;
            case "E":
                point.color = red;
                exit.push(point);
                break;
            case "G":
                point.color = brown;
                ground.push(point);
                break;
            case "C":
                point.color = yellow;
                coin.push(point);
                break;
        }
    }
 }

let drawMap = function(block) {
    for (let i = 0; i < block.length; i++){
        ctx.fillStyle = block[i].color;
        ctx.fillRect(block[i].x * 20, block[i].y * 20, 20, 20);
    }
 }

let makeNewMap = function(map, index, block) {
    return map.substr(0, index) + block + map.substr(index + 1, map.length);
}

let checkForSky = function (block, index) {
    for (let i = 0; i < block.length; i++) {
        if ((block[i].x + block[i].y * mapWidth) == index) {
            console.log(block[i])
            block.splice(i, 1);
        }
    }
}

let doDraw = (function () {

 let collide = function(arr) {
     let answer = null;
     for (let i = 0; i < arr.length; i++) {
         for (let j = 0; j < player.length; j++) {
             if (!((player[j].x > arr[i].x + almostOne) || (player[j].x + almostOne < arr[i].x) ||
            (player[j].y > arr[i].y + almostOne) || (player[j].y + almostOne < arr[i].y))) {
                answer = i;
            }
         }
     }
     return answer;
 }

 let openExit = function() {
    let answer = false;
     if (coin.length === 0) {
         for (let i = 0; i < exit.length; i++) {
             exit[i].color = "white";
             answer = true;
         }
     }
     return answer;
 }

 let onGround = function() {
    for (let i = 0; i < ground.length; i++) {
        if (((Math.floor(player[1].x) === ground[i].x) ||
        (Math.ceil(player[1].x) === ground[i].x)) && (Math.floor(player[1].y + 1) === ground[i].y)) {
            player[0].y = Math.floor(player[0].y);
            player[1].y = Math.floor(player[1].y);
            return true;
        }
    }
    return false;
 }

 let headBonk = function() {
     for (let i = 0; i < ground.length; i++) {
         if (((Math.floor(player[0].x) === ground[i].x) || 
         (Math.ceil(player[0].x) === ground[i].x)) && (Math.ceil(player[0].y) === ground[i].y + 1)) {
            player[0].y = Math.ceil(player[0].y);
            player[1].y = Math.ceil(player[1].y);
            return true;
         }
     }
     return false;
 }

 let sidewaysCollision = function() {
     for (let i = 0; i < ground.length; i++) {
        for (let j = 0; j < player.length; j++) {
            if (((Math.floor(player[j].y) === ground[i].y) || 
            (Math.ceil(player[j].y) === ground[i].y)) && (Math.ceil(player[j].x - 1) === ground[i].x)) {
                return "left";
      }
             if (((Math.floor(player[j].y) === ground[i].y) || 
            (Math.ceil(player[j].y) === ground[i].y)) && (Math.floor(player[j].x + 1) === ground[i].x)) {
                return "right";
      }
    }
  }
  return "";
}

 let paint = function() {

    if (!paused) {

    let sideways = sidewaysCollision();
    let groundBool = onGround();

    //Sideways Movement
    if (keyState[39] && sideways != "right"){ 
        player[0].x += playerXSpeed;
        player[0].x = Number(player[0].x.toFixed(1));
        player[1].x += playerXSpeed;
        player[1].x = Number(player[1].x.toFixed(1));
    }
    if (keyState[37] && sideways != "left"){ 
        player[0].x -= playerXSpeed;
        player[0].x = Number(player[0].x.toFixed(1));
        player[1].x -= playerXSpeed;
        player[1].x = Number(player[1].x.toFixed(1));
    }

    //Jump
    if (groundBool && keyState[38]) {
        playerYSpeed = -.4;
    }

    //Fall onto ground
     if (!groundBool) {
    playerYSpeed += gravity;
    } else if (playerYSpeed > 0) {
    playerYSpeed = 0;
    }

    //Acceleration
    player[0].y += playerYSpeed;
    player[0].y = Number(player[0].y.toFixed(2));
    player[1].y += playerYSpeed;
    player[1].y = Number(player[1].y.toFixed(2));

    //Head collision
    if (headBonk()) {
        playerYSpeed = 0;
    }

    //No clipping into ground
    onGround();

    //Draw everything
    ctx.fillStyle = lightBlue;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawMap(ground);
    drawMap(coin);
    drawMap(lava);
    drawMap(exit);
    drawMap(player);
    ctx.fillStyle = "black";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    if (collide(coin) != null) {
        coin.splice(collide(coin), 1);
    }

    if (collide(lava) != null) {
        gameScreen = false;
        clearInterval(gameLoop);
        doDraw.init();
        $("#dead").show().fadeOut(1500);
    }
    if (openExit() && collide(exit)) {
        gameScreen = false;
        clearInterval(gameLoop);
        levelSelect();
        $("#win").show().fadeOut(1500);
    }
  }
}

 let init = function() {
    canvas.tabIndex = "1";
    gameScreen = true;
    loadMap(currentLevel);
    gameLoop = setInterval(paint, 1000/30);
}

return {
init: init
}
}());