const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const gameOverMenu = document.querySelector('.game-over-menu');
const pointsMenu = document.querySelector('.points-menu');

let randomTime = Math.random() * 6000;
let isJumping = false;
let position = 0;
let isMenuActive = false;
let points = 0;

function clearAllIntervals() {
    const interval_id = window.setInterval(()=>{}, 999);
    for (let i = 0; i < interval_id; i++)
        window.clearInterval(i);
}

function handleKeyUp (event) {
    if(event.keyCode === 32) {
        if(!isJumping)
            jump();
    }
}

function jump () {
    isJumping = true;

    let upInterval = setInterval(function () {
        if(position >= 220) {
            clearInterval(upInterval);

            let downInterval = setInterval(function () {

                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + "px";
                }
            }, 20);
        } else {
            position += 20;
            dino.style.bottom = position + "px";
        }
    }, 20);
}

function createCactus() {
    if(isMenuActive)
        return;

    const cactus = document.createElement('div');
    let cactusPosition = 1000;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + "px";
    background.appendChild(cactus);

    let leftInterval = setInterval(function () {
        if(cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
            points++;
            pointsMenu.innerHTML = "Pontuação: " + points;
        } else if(cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            clearInterval(leftInterval);
            gameOverMenu.style.display = "block";
            isMenuActive = true;
            background.style.animationPlayState = 'paused';
            
            const cactus = document.querySelectorAll('.cactus');
            cactus.forEach(c => c.remove());
            clearAllIntervals();
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + "px";    
        }
    }, 20);
}

function startGame() {
    gameOverMenu.style.display = "none";
    background.style.animationPlayState = 'running';
    points = 0;
    pointsMenu.innerHTML = "Pontuação: 0";
    isMenuActive = false;
    isJumping = false;

    function timeoutFunction() {
        randomTime = Math.random() * 4000;
        createCactus();
        setTimeout(timeoutFunction, randomTime);
    }

    setTimeout(timeoutFunction, randomTime);
}

background.style.animationPlayState = 'paused';
document.addEventListener('keydown', handleKeyUp);
