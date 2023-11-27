let canevas;
let contexte;
let posX;
let posY;

let pizza = [];
const LARGEUR_PIZZA = 50;
const HAUTEUR_PIZZA = 50;

let kid = {};
const LARGEUR_KID = 50;
const HAUTEUR_KID = 50;

let touchesClavier = {
    "ArrowUp": false,
    "ArrowDown": false,
    "ArrowLeft": false,
    "ArrowRight": false
};

const VITESSE_CARRE = 10;
const DIMENSION_CARRE = 48;

window.onload = function () {

    window.addEventListener("keydown", toucheAppuyee);
    window.addEventListener("keyup", toucheRelachee);

    canevas = document.getElementById('canevas-atelier');
    contexte = canevas.getContext('2d');
    const kidgauche = document.getElementById("kidgauche");
    contexte.drawImage(kidgauche, 100, 50);

    posX = (canevas.width - DIMENSION_CARRE) / 2;
    posY = (canevas.height - DIMENSION_CARRE) / 2;

    contexte.fillStyle = "CornflowerBlue";

    window.requestAnimationFrame(boucleJeu);  // le navigateur appellera boucleJeu() au bon moment

    // Set canvas styles
    canevas.style.backgroundColor = '#f0f0f0';
    canevas.style.border = '2px solid #333';

    // Set playerLeftElement and playerRightElement styles
    playerLeftElement.style.width = '100px';
    playerLeftElement.style.height = '100px';

    playerRightElement.style.width = '100px';
    playerRightElement.style.height = '100px';
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

    // affiche le carré
    contexte.fillRect(posX, posY, DIMENSION_CARRE, DIMENSION_CARRE);
}


const canvas = document.getElementById('canevas-atelier');
canvas.style.backgroundColor = '#f0f0f0'; // Set background color
canvas.style.border = '2px solid #333'; // Add a border


const playerLeftElement = document.getElementById('kidLeft');
const playerRightElement = document.getElementById('kidrRight');
const playerForwardElement = document.getElementById('kidForward');
const playerBackElement = document.getElementById('kidBack');


playerLeftElement.style.width = '100px';
playerLeftElement.style.height = '100px';


playerRightElement.style.width = '100px';
playerRightElement.style.height = '100px';

A = pizza[i].x, pizza[i].y
B = pizza[i].x + LARGEUR_PIZZA, pizza[i].y + HAUTEUR_PIZZA

C = kid.x, kid.y
D = kid.x + LARGEUR_KID, kid.y + HAUTEUR_KID

function rectanglesCollision(A, B, C, D) {
    if (A.x >= D.x || C.x >= B.x){
    return false;
    }
    if (A.y >= D.y || C.y >= B.y) {
    return false;
    }
    return true;

}

tableau.push(unObjet);

posX = ...;
posY = ...;
pizza.push({x: posX, y: posY});

tableau.splice(indice, 1);

pizza.splice(indiceCadeau, 1);

let collisionDetected = rectanglesCollision(A, B, C, D);
if (collisionDetected) {
}

let posX = ...;
let posY = ...;
pizza.push({ x: posX, y: posY });

let indiceCadeau = 0;
pizza.splice(indiceCadeau, 1);