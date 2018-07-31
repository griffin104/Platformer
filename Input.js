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
        if (levelSelectScreen && mousePos.x < 100 && mousePos.y > 360) {
            levelSelectScreen = false;
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
   document.addEventListener("keydown", keyDown);
   document.addEventListener("keyup", keyUp);