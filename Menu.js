//Title Screen
function title() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = 600;
    canvas.height = 400;
    ctx.textAlign = "center";
    titleScreen = true;
    ctx.fillStyle = lightBlue;
    ctx.fillRect(0, 0,600,400);
    ctx.fillStyle = brown;
    ctx.fillRect(0, 300, 600, 100);
    ctx.font = "50px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("PLATFORMER", 300, 50);
    ctx.fillStyle = yellow;
    ctx.fillRect(80, 240, 140, 80);
    ctx.fillRect(380, 240, 140, 80);
    ctx.fillStyle = green;
    ctx.fillRect(500, 360, 100, 40);
    ctx.fillStyle = "black";
    ctx.font = "40px Arial";
    ctx.fillText("START", 150, 290);
    ctx.font = "28px Arial";
    ctx.fillText("CREATE", 450, 275);
    ctx.fillText("LEVEL", 450, 303);
    ctx.font = "20px Arial";
    ctx.fillText("Clear Data", 550, 385);
    ctx.fillStyle = "black";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

//Level Select
function levelSelect() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = 600;
    canvas.height = 400;
    ctx.textAlign = "center";
    levelSelectScreen = true;
    ctx.fillStyle = brown;
    ctx.fillRect(0, 0, 600, 400);
    ctx.fillStyle = green;
    ctx.fillRect(0, 360, 100, 40);
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Back", 50, 385);
    ctx.font = "50px Arial"
    ctx.fillText("SELECT LEVEL", 300, 60);
    for (let i = 0; i <= 3; i++) {
        let rect = (i)*144 + 24;
        if (i in localStorage) {
            ctx.fillStyle = green;
            ctx.fillRect(rect, 120, 120, 80);
            ctx.fillStyle = yellow;
            ctx.fillText(i + 1, rect + 60, 180);
        } else {
            ctx.fillStyle = red;
            ctx.fillRect(rect, 120, 120, 80);
        }
    }
    for (let i = 5; i <= 8; i++) {
        let rect = (i - 5)*144 + 24;
        if (i in localStorage) {
            ctx.fillStyle = green;
            ctx.fillRect(rect, 260, 120, 80);
            ctx.fillStyle = yellow;
            ctx.fillText(i, rect + 60, 320);
        } else {
            ctx.fillStyle = red;
            ctx.fillRect(rect, 260, 120, 80);
        }
    }
    ctx.fillStyle = "black";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

//Create Level Select

function createLevelSelect() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = 600;
    canvas.height = 400;
    ctx.textAlign = "center";
    createLevelSelectScreen = true;
    ctx.fillStyle = brown;
    ctx.fillRect(0, 0, 600, 400);
    ctx.fillStyle = green;
    ctx.fillRect(0, 360, 100, 40);
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Back", 50, 385);
    ctx.font = "50px Arial";
    ctx.fillText("SELECT LEVEL STYLE", 300, 60);
    ctx.fillStyle = green;
    ctx.fillRect(40, 150, 150, 100);
    ctx.fillRect(225, 150, 150, 100);
    ctx.fillRect(410, 150, 150, 100);
    ctx.fillStyle = yellow
    ctx.font = "44px Arial";
    ctx.fillText("Long", 115, 215);
    ctx.fillText("Square", 300, 215);
    ctx.fillText("Huge", 485, 215);

    ctx.fillStyle = "black";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}
//Load default levels
function loadDefault() {
    for (let i = 0; i <= 2; i++) {
        if (!(i in localStorage)) {
            localStorage.setItem(i, defaultLevels[i]);
        }
    }
}

window.onload = loadDefault();
window.onload = title();
