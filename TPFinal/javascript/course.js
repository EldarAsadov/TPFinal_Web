let canevas;
let contexte;
let posX = 0;
let posY = 0;
let posX2 = 0;
let posY2 = 0;
let DIMENSION_CARRE = 50; // Ajoutez cette ligne
let VITESSE_CARRE = 5; // Ajoutez cette ligne
let kid = new Image();
let purpleguy = new Image();
let directionKid = "w";
let directionPurpleguy = "ArrowUp";

const playerImages = {
    "ArrowUp": "purpleguydevant",
    "ArrowDown": "purpleguyderriere",
    "ArrowLeft": "purpleguygauche",
    "ArrowRight": "purpleguydroite",
    "w": "kiddevant",
    "s": "kidderriere",
    "a": "kidgauche",
    "d": "kiddroite",
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

window.onload = function () {
    canevas = document.getElementById('canevas-atelier');
    contexte = canevas.getContext('2d');

    document.addEventListener('keydown', (evt) => {  
        console.log("keypress");
        changerValeurTouche(evt, true);
    });
    document.addEventListener('keyup', (evt) => { 
        console.log("keyup")
        changerValeurTouche(evt, false);
    });

    // Chargez les images correctement
    const kidgauche = document.getElementById("kidgauche");
    const purpleguygauche = document.getElementById("purpleguygauche");

    // Utilisez une fonction de rappel pour démarrer la boucle de jeu après le chargement des images
    kid.onload = function () {
        purpleguy.onload = function () {
            window.requestAnimationFrame(boucleJeu);
        };
    };

    // Utilisez les images chargées, pas les éléments du DOM
    kid.src = kidgauche.src;
    purpleguy.src = purpleguygauche.src;
};



function boucleJeu(timeStamp){
    calculerPosition();
    dessiner();

    window.requestAnimationFrame(boucleJeu);  
}


console.log("Script chargé");

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
const allowedTouches = { 
    purpleGuyTouches : ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
    kidTouches : ["w", "a", "s", "d"]
}
function changerValeurTouche(evenement, valeur) {
    if(allowedTouches.purpleGuyTouches.includes(evenement.key)){
        touchesClavier[evenement.key] = valeur;
        if(valeur) { 
            console.log("Changed value");
            directionPurpleguy = evenement.key;
        }
        console.log(directionPurpleguy);
    }
    if(allowedTouches.kidTouches.includes(evenement.key)){
        touchesClavier[evenement.key] = valeur;
        if(valeur) directionKid = evenement.key;
        directionKid = evenement.key;
    }
}


function dessiner() {
    console.log("HEllo world dessiner");
    // effacer le canevas
    contexte.clearRect(0, 0, canevas.width, canevas.height);
    dessinergrille();

    console.log(playerImages[directionKid]);
// Utilisez les directions pour obtenir les images appropriées
let image=new Image()
image.src = document.getElementById(playerImages[directionPurpleguy]).src
console.log(posX + ", " + posY);
contexte.drawImage(image, posX, posY, DIMENSION_CARRE, DIMENSION_CARRE);
image.src = document.getElementById(playerImages[directionKid]).src
contexte.drawImage(image, posX2, posY2, DIMENSION_CARRE, DIMENSION_CARRE);
}



const playerLeftElement = document.getElementById('kidgauche');
const playerRightElement = document.getElementById('kiddroite');
const playerForwardElement = document.getElementById('kiddevant');
const playerBackElement = document.getElementById('kidderriere');

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

function getRandomPosition(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isOverlapping(rect1, rect2) {
    return !(rect1.x + rect1.width < rect2.x ||
             rect2.x + rect2.width < rect1.x ||
             rect1.y + rect1.height < rect2.y ||
             rect2.y + rect2.height < rect1.y);
}

const player = document.createElement('div');
player.className = 'player';
document.body.appendChild(player);

const numberOfSquares = 10;
const squares = [];

for (let i = 0; i < numberOfSquares; i++) {
    const square = document.createElement('div');
    square.className = 'square';

    let newX, newY;
    let isOverlap;

    do {
        newX = getRandomPosition(50, window.innerWidth - 70);
        newY = getRandomPosition(50, window.innerHeight - 70);

        // Check if the new square will overlap with existing squares
        isOverlap = squares.some(existingSquare => isOverlapping({ x: newX, y: newY, width: 20, height: 20 }, existingSquare));
    } while (isOverlap);

    square.style.left = `${newX}px`;
    square.style.top = `${newY}px`;

    squares.push({ x: newX, y: newY, width: 20, height: 20 });
    document.body.appendChild(square);
}

// Add event listener for player movement
document.addEventListener('keydown', (event) => {
    const speed = 10;
    switch (event.key) {
        case 'ArrowUp':
            player.style.top = `${Math.max(0, parseInt(player.style.top) - speed)}px`;
            break;
        case 'ArrowDown':
            player.style.top = `${Math.min(window.innerHeight - 30, parseInt(player.style.top) + speed)}px`;
            break;
        case 'ArrowLeft':
            player.style.left = `${Math.max(0, parseInt(player.style.left) - speed)}px`;
            break;
        case 'ArrowRight':
            player.style.left = `${Math.min(window.innerWidth - 30, parseInt(player.style.left) + speed)}px`;
            break;
    }

    // Check for collision with squares
    const playerRect = { x: parseInt(player.style.left), y: parseInt(player.style.top), width: 30, height: 30 };
    squares.forEach((square, index) => {
        if (isOverlapping(playerRect, square)) {
            // Collision detected, remove the square
            document.body.removeChild(document.getElementsByClassName('square')[index]);
            squares.splice(index, 1);
        }
    });
});

// Check for collision with squares
const playerRect = { x: parseInt(player.style.left), y: parseInt(player.style.top), width: 30, height: 30 };
squares.forEach((square, index) => {
    if (isOverlapping(playerRect, square)) {
        // Collision detected, remove the square
        document.body.removeChild(document.getElementsByClassName('square')[index]);
        squares.splice(index, 1);
    }
});
