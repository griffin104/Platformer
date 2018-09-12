   function click(e) {
    let rect = canvas.getBoundingClientRect();
    mousePos.x= e.clientX - Math.ceil(rect.left);
    mousePos.y= e.clientY - rect.top;
   }

   function play(e) {
    click(e);
    if (titleScreen && mousePos.x > 80 && mousePos.x < 220 &&
    mousePos.y > 240 && mousePos.y < 320) {
        titleScreen = false;
        levelSelect();
    }
   }

   function createLevel(e) {
    click(e);
    if (titleScreen && mousePos.x > 380 && mousePos.x < 520 &&
    mousePos.y > 240 && mousePos.y < 320) {
        titleScreen = false;
        createLevelSelect();
    }
   }

   function create(e) {
    click(e);
    if (createLevelSelectScreen && mousePos.x > 40 && mousePos.x < 190 &&
        mousePos.y > 150 && mousePos.y < 250) {
            newLevel = blankLong;
            loadMap(newLevel);
            ctx.fillStyle = lightBlue;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            levelCreator = true;
            createLevelSelectScreen = false;
    }
    if (createLevelSelectScreen && mousePos.x > 225 && mousePos.x < 375 &&
        mousePos.y > 150 && mousePos.y < 250) {
            newLevel = blankSquare;
            loadMap(newLevel);
            ctx.fillStyle = lightBlue;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            levelCreator = true;
            createLevelSelectScreen = false;
    }
    if (createLevelSelectScreen && mousePos.x > 410 && mousePos.x < 480 &&
        mousePos.y > 150 && mousePos.y < 250) {
            newLevel = blankHuge;
            loadMap(newLevel);
            ctx.fillStyle = lightBlue;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            levelCreator = true;
            createLevelSelectScreen = false;
    }
   }

   function paintBlock(e) {
    if (levelCreator) {
        click(e);
        let stringIndex = Math.floor(mousePos.x / 20) + (Math.floor(mousePos.y / 20) * mapWidth);
        newLevel = makeNewMap(newLevel, stringIndex, currentBlock);
        if (currentBlock == "S") {
            checkForSky(ground, stringIndex);
            checkForSky(coin, stringIndex);
            checkForSky(lava, stringIndex);
            checkForSky(exit, stringIndex);
            checkForSky(player, stringIndex);
        }
        loadMap(newLevel);
        ctx.fillStyle = lightBlue;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawMap(ground);
        drawMap(coin);
        drawMap(lava);
        drawMap(exit);
        drawMap(player);
    }
   }

   function selectBlock(e) {
    if (levelCreator) {
       let key = e.key;
       switch(key) {
           case "s":
           currentBlock = "S";
           break;
           case "g":
           currentBlock = "G";
           break;
           case "c":
           currentBlock = "C";
           break;
           case "l":
           currentBlock = "L";
           break;
           case "e":
           currentBlock = "E";
           break;
           case "p":
           currentBlock = "P";
           break;
       }
     } 
   }

   function saveLevel(e) {
    if (levelCreator) {
        let key = e.key;
        switch(key) {
            case "1":
            localStorage.setItem(1, newLevel);
            break;
            case "2":
            localStorage.setItem(2, newLevel);
            break;
            case "3":
            localStorage.setItem(3, newLevel);
            break;
            case "4":
            localStorage.setItem(4, newLevel);
            break;
            case "5":
            localStorage.setItem(5, newLevel);
            break;
            case "6":
            console.log("fg")
            localStorage.setItem(6, newLevel);
            break;
            case "7":
            localStorage.setItem(7, newLevel);
            break;
            case "8":
            localStorage.setItem(8, newLevel);
            break;
        }
    }
   }

   function  playLevel(e) {
    click(e);
    for (let i = 0; i <= 3; i++) {
        let rect = (i)*144 + 24;
        if (levelSelectScreen && window.localStorage.getItem(i) != null &&
            mousePos.x > rect && mousePos.x < rect + 120 &&
        mousePos.y > 120 && mousePos.y < 200) {
            currentLevel = window.localStorage.getItem(i);
            levelSelectScreen = false;
            doDraw.init();
     }
    }
    for (let i = 5; i <= 8; i++) {
        let rect = (i - 5)*144 + 24;
        if (levelSelectScreen && window.localStorage.getItem(i) != null &&
            mousePos.x > rect && mousePos.x < rect + 120 &&
        mousePos.y > 260 && mousePos.y < 340) {
            currentLevel = window.localStorage.getItem(i);
            levelSelectScreen = false;
            doDraw.init();
      }
     }
    }

    function clearData(e) {
        click(e);
        if (titleScreen && mousePos.x > 500 && mousePos.y > 360) {
            localStorage.clear();
            loadDefault();
            $("#clearData").show().fadeOut(1500);
        }
    }

    function back(e) {
        click(e);
        if ((levelSelectScreen || createLevelSelectScreen) && mousePos.x < 100 && mousePos.y > 360) {
            levelSelectScreen = false;
            createLevelSelectScreen = false;
            title();
        }
    }

    function keyDown(e) {
        keyState[e.keyCode || e.which] = true;

        //Pause
        if (keyState[80] && gameScreen) {
            if (!paused) {
                paused = true
            } else {
                paused = false;
            }
        }

        //Reset
        if (keyState[82] && gameScreen) {
            clearInterval(gameLoop);
            doDraw.init();
        }
    }

    function keyUp(e) {
        keyState[e.keyCode || e.which] = false;
    }
   
   canvas.addEventListener("click", clearData);
   canvas.addEventListener("click", play);
   canvas.addEventListener("click", playLevel);
   canvas.addEventListener("click", back);
   canvas.addEventListener("click", createLevel);
   canvas.addEventListener("click", create);
   canvas.addEventListener("click", paintBlock);
   document.addEventListener("keypress", selectBlock);
   document.addEventListener("keypress", saveLevel);
   document.addEventListener("keydown", keyDown);
   document.addEventListener("keyup", keyUp);