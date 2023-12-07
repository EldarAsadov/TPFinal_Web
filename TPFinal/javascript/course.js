let canevas;
let contexte;
let posX;
let posY;
let posX2;
let posY2;
let y;
let kid;
let purpleguy;


const playerImages = {
    "ArrowUp": "kidBack",
    "ArrowDown": "kidForward",
    "ArrowLeft": "kidLeft",
    "ArrowRight": "kidRight"
};

let touchesClavier = {
    "ArrowUp": false,
    "ArrowDown": false,
    "ArrowLeft": false,
    "ArrowRight": false,
    "w": false,
    "s": false,
    "a": false,
    "d": false,
};


const VITESSE_CARRE = 5;
const DIMENSION_CARRE = 50;

window.onload = function () {

    window.addEventListener("keydown", toucheAppuyee);
    window.addEventListener("keyup", toucheRelachee);

    canevas = document.getElementById('canevas-atelier');
    contexte = canevas.getContext('2d');
    const kidgauche = document.getElementById("kidgauche");
    const purpleguygauche = document.getElementById("purpleguygauche");


    posX = (canevas.width - DIMENSION_CARRE) / 2;
    posY = (canevas.height - DIMENSION_CARRE) / 2;
    posX2 = (canevas.width - DIMENSION_CARRE) / 2;
    posY2 = (canevas.height - DIMENSION_CARRE) / 2;

    window.requestAnimationFrame(boucleJeu);  // le navigateur appellera boucleJeu() au bon moment

}

function boucleJeu(timeStamp){
    calculerPosition();
    dessiner();

    window.requestAnimationFrame(boucleJeu);  // le navigateur appellera boucleJeu() au bon moment
}

function calculerPosition() {
    // le code de calcul de la position viendra ici
    if (touchesClavier["ArrowUp"]) {
        let nouveauY = posY - VITESSE_CARRE;
        if (nouveauY < 0) {
            nouveauY = 0;
        }
        posY = nouveauY;
    }

    if (touchesClavier["ArrowDown"]) {
        let nouveauY = posY + VITESSE_CARRE;
        if (nouveauY > canevas.height - DIMENSION_CARRE) {
            nouveauY = canevas.height - DIMENSION_CARRE;
        }
        posY = nouveauY;
    }

    if (touchesClavier["ArrowLeft"]) {
        let nouveauX = posX - VITESSE_CARRE;
        if (nouveauX < 0) {
            nouveauX = 0;
        }
        posX = nouveauX;
    }

    if (touchesClavier["ArrowRight"]) {
        let nouveauX = posX + VITESSE_CARRE;
        if (nouveauX > canevas.width - DIMENSION_CARRE) {
            nouveauX = canevas.width - DIMENSION_CARRE;
        }
        posX = nouveauX;
    }

    if (touchesClavier["w"]) {
        let nouveauY = posY2 - VITESSE_CARRE;
        if (nouveauY < 0) {
            nouveauY = 0;
        }
        posY2 = nouveauY;
    }

    if (touchesClavier["s"]) {
        let nouveauY = posY2 + VITESSE_CARRE;
        if (nouveauY > canevas.height - DIMENSION_CARRE) {
            nouveauY = canevas.height - DIMENSION_CARRE;
        }
        posY2 = nouveauY;
    }

    if (touchesClavier["a"]) {
        let nouveauX = posX2 - VITESSE_CARRE;
        if (nouveauX < 0) {
            nouveauX = 0;
        }
        posX2 = nouveauX;
    }

    if (touchesClavier["d"]) {
        let nouveauX = posX2 + VITESSE_CARRE;
        if (nouveauX > canevas.width - DIMENSION_CARRE) {
            nouveauX = canevas.width - DIMENSION_CARRE;
        }
        posX2 = nouveauX;
    }
}

function toucheAppuyee(evenement) {
    console.log("touche appuyée: " + evenement.key);
    switch (evenement.key) {
        case "ArrowUp":
            touchesClavier["ArrowUp"] = true;
            break;
        case "ArrowDown": 
            touchesClavier["ArrowDown"] = true;
            break;
        case "ArrowLeft": 
            touchesClavier["ArrowLeft"] = true;
            break;
        case "ArrowRight": 
            touchesClavier["ArrowRight"] = true;
            break;
        case "w":
            touchesClavier["w"] = true;
            break;
        case "s": 
            touchesClavier["s"] = true;
            break;
        case "a": 
            touchesClavier["a"] = true;
            break;
        case "d": 
            touchesClavier["d"] = true;
            break;
}
}

function toucheRelachee(evenement) {
    switch (evenement.key) {
        case "ArrowUp":
            touchesClavier["ArrowUp"] = false;
            break;
        case "ArrowDown": 
            touchesClavier["ArrowDown"] = false;
            break;
        case "ArrowLeft": 
            touchesClavier["ArrowLeft"] = false;
            break;
        case "ArrowRight": 
            touchesClavier["ArrowRight"] = false;
            break;
        case "w":
            touchesClavier["w"] = false;
            break;
        case "s": 
            touchesClavier["s"] = false;
            break;
        case "a": 
            touchesClavier["a"] = false;
            break;
        case "d": 
            touchesClavier["d"] = false;
            break;
    }
}

function dessiner() {
    // effacer le canevas
    contexte.clearRect(0, 0, canevas.width, canevas.height);
    dessinergrille();

    // affiche le carré
    const imageElement = document.getElementById("kidgauche");
    contexte.drawImage(imageElement, posX, posY, DIMENSION_CARRE, DIMENSION_CARRE);

    const imageElement2 = document.getElementById("purpleguygauche");
    contexte.drawImage(imageElement2, posX2, posY2, DIMENSION_CARRE, DIMENSION_CARRE);
}

const playerLeftElement = document.getElementById('kidLeft');
const playerRightElement = document.getElementById('kidrRight');
const playerForwardElement = document.getElementById('kidForward');
const playerBackElement = document.getElementById('kidBack');

function rectanglesCollision(A, B, C, D) {
    if (A.x >= D.x || C.x >= B.x){
    return false;
    }
    if (A.y >= D.y || C.y >= B.y) {
    return false;
    }
    return true;

}

const tileColors = ["#CCCCCC", "#000000"]; // Example colors, you can use your own

function dessinergrille() {
    for (let y = 0; y < 25; y++) {
        for (let x = 0; x < 40; x++) {
            const colorIndex = (x + y) % tileColors.length; // Alternating between different tiles
            contexte.fillStyle = tileColors[colorIndex];
            contexte.fillRect(x * 50, y * 50, 50, 50);
        }
    }
}