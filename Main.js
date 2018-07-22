function loadMap() {
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
        console.log("Lf");
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
            case "S":
                ctx.fillStyle = lightBlue;
                break;
            case "P":
                ctx.fillStyle = green;
                player.push(point);
                break;
            case "L":
                ctx.fillStyle = orange;
                lava.push(point);
                break;
            case "E":
                ctx.fillStyle = red;
                exit.push(point);
                break;
            case "G":
                ctx.fillStyle = brown;
                ground.push(point);
                break;
            case "C":
                ctx.fillStyle = yellow;
                coin.push(point);
                break;
        }
        ctx.fillRect(xCoord * 20, yCoord * 20, 20, 20);
    }
}