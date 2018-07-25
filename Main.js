let doDraw = (function () {

 let loadMap = function() {
    player = [];
    lava = [];
    exit = [];
    ground = [];
    coin = [];
    if (currentLevel.length === 300) {
        mapWidth = 30;
        canvas.width = 600;
        canvas.height = 200;
    } else if (currentLevel.length === 400) {
        mapWidth = 20;
        canvas.width = 400;
        canvas.height = 400;
    } else if (currentLevel.length === 1000){
        canvas.width = 1000;
        canvas.height = 400;
        mapWidth = 50;
    }
    for (let i = 0; i < currentLevel.length; i++) {
        let xCoord = i % mapWidth;
        let yCoord = Math.floor(i / mapWidth);
        let point = {
            x: xCoord,
            y: yCoord
        };
        switch (currentLevel[i]) {
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

 let onGround = function(yBot, xLeft, xRight) {
    for (let i = 0; i < ground.length; i++) {
        if (((xLeft === ground[i].x) || (xRight === ground[i].x)) && 
        (yBot === ground[i].y)) {
            player[0].y = Math.floor(player[0].y);
            player[1].y = Math.floor(player[1].y);
            return true;
        }
    }
    return false;
 }

 let headBonk = function(xLeft, xRight, yTop) {
     for (let i = 0; i < ground.length; i++) {
         if (((xLeft === ground[i].x) || (xRight === ground[i].x)) && 
         (yTop === ground[i].y)) {
            player[0].y = Math.ceil(player[0].y);
            player[1].y = Math.ceil(player[1].y);
            return true;
         }
     }
     return false;
 }

 let sidewaysCollision = function(xLeft, xRight, yTop, yBot) {
     for (let i = 0; i < ground.length; i++) {
        for (let j = 0; j < player.length; j++) {
            if ((yTop === ground[i].y) || (yBot === ground[i].y) && 
            (xLeft === ground[i].x)) {
                player[0].x = Math.ceil(player[0].x);
                player[1].x = Math.ceil(player[1].x);
                console.log("left")
                return "left";
      }
             if (((Math.floor(player[j].y) === ground[i].y) || 
            (yBot === ground[i].y)) && (xRight === ground[i].x)) {
                player[0].x = Math.floor(player[0].x);
                player[1].x = Math.floor(player[1].x);
                console.log("right")
                return "right";
      }
    }
  }
  return "";
}

 let paint = function() {

    //Draw everything
    ctx.fillStyle = lightBlue;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawMap(ground);
    drawMap(coin);
    drawMap(lava);
    drawMap(exit);
    drawMap(player);

    let xLeft = Math.floor(player[0].x);
    let xRight = Math.ceil(player[0].x + 1);
    let yTop = Math.floor(player[0].y);
    let yBot = Math.ceil(player[1].y + 1);

    //Sideways Movement
    if (keyState[39] && sidewaysCollision(xLeft, xRight, yTop, yBot) != "right"){ 
        player[0].x += playerXSpeed;
        player[1].x += playerXSpeed;
    }
    if (keyState[37] && sidewaysCollision(xLeft, xRight, yTop, yBot) != "left"){ 
        player[0].x -= playerXSpeed;
        player[1].x -= playerXSpeed;
    }

    //Head collision
    if (headBonk(xLeft, xRight, yTop)) {
        playerYSpeed = 0;
       }
    console.log(onGround(yBot, xLeft, xRight));
    //Fall onto ground
    if (!onGround(yBot, xLeft, xRight)) {
        playerYSpeed += gravity;
    } else if (playerYSpeed > 0) {
         playerYSpeed = 0;
    }

    //Jump
    if (keyState[38] && onGround(yBot, xLeft, xRight)) {
        console.log("a")
        playerYSpeed = -.4;
    }

    //Acceleration
    player[0].y += playerYSpeed;
    player[1].y += playerYSpeed;

}

 let init = function() {
    loadMap();
    gameLoop = setInterval(paint, 1000/30);
}

return {
init: init
}
}());