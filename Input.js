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
            testMap();
     }
    }
    for (let i = 5; i <= 8; i++) {
        let rect = (i - 5)*144 + 24;
        if (levelSelectScreen && window.localStorage.getItem(i) != null &&
            mousePos.x > rect && mousePos.x < rect + 120 &&
        mousePos.y > 260 && mousePos.y < 340) {
            currentLevel = window.localStorage.getItem(i);
            testMap();
      }
     }
    }  
   
   canvas.addEventListener("click", play);
   canvas.addEventListener("click", playLevel);