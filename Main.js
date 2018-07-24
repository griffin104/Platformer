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

 let onGround = function() {
    for (let i = 0; i < ground.length; i++) {
        if (((Math.floor(player[1].x) === ground[i].x) ||
        (Math.ceil(player[1].x) === ground[i].x)) && (Math.floor(player[1].y) + 1 === ground[i].y)) {
            player[0].y = Math.floor(player[0].y);
            player[1].y = Math.floor(player[1].y);
            return true;
        }
    }
    return false;
 }

 let headBonk = function() {
     
 }

 let paint = function() {
    console.log(onGround());
    //Draw everything
    ctx.fillStyle = lightBlue;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawMap(ground);
    drawMap(coin);
    drawMap(lava);
    drawMap(exit);
    drawMap(player);

    //Sideways Movement
    if (keyState[39]){ 
        player[0].x += playerXSpeed;
        player[1].x += playerXSpeed;
    }
    if (keyState[37]){ 
        player[0].x -= playerXSpeed;
        player[1].x -= playerXSpeed;
    }

    //Jump
    if (onGround() && keyState[38]) {
        playerYSpeed = -.3;
    }

    //Acceleration
    player[0].y += playerYSpeed;
    player[1].y += playerYSpeed;
   if (!onGround()) {
       playerYSpeed += .02
   } else {
       playerYSpeed = 0;
   }

 }

 let init = function() {
    loadMap();
    gameLoop = setInterval(paint, 1000/30);
}

return {
init: init
}
}());