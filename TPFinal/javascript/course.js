let canevas;
let contexte;
let posX;
let posY;
let y;


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
    "ArrowRight": false
};

const VITESSE_CARRE = 5;
const DIMENSION_CARRE = 50;

window.onload = function () {

    window.addEventListener("keydown", toucheAppuyee);
    window.addEventListener("keyup", toucheRelachee);

    canevas = document.getElementById('canevas-atelier');
    contexte = canevas.getContext('2d');
    const kidgauche = document.getElementById("kidgauche");


    posX = (canevas.width - DIMENSION_CARRE) / 2;
    posY = (canevas.height - DIMENSION_CARRE) / 2;

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
    }
}

function dessiner() {
    // effacer le canevas
    contexte.clearRect(0, 0, canevas.width, canevas.height);
    dessinergrille();

    // affiche le carré
    const imageElement = document.getElementById("kidgauche");
    contexte.drawImage(imageElement, posX, posY, DIMENSION_CARRE, DIMENSION_CARRE);
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