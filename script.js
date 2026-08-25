/* ============================================= */
/* LISTE DES SCP                                 */
/* ============================================= */

const slides = [

    {
        title: "SCP-035",

        image: "images/scp035.png",

        description:
            "SCP-035 est un masque ancien et conscient, capable d'influencer mentalement et de posséder quiconque le porte.",

        position:
            "center center"
    },


    {
        title: "SCP-049",

        image: "images/scp049.png",

        description:
            "SCP-049 est une entité humanoïde connue sous le nom de Docteur de la Peste. Il affirme pouvoir guérir une mystérieuse pestilence.",

        position:
            "center center"
    },


    {
        title: "SCP-096",

        image: "images/scp096.png",

        description:
            "SCP-096 est un humanoïde extrêmement agressif. Lorsque son visage est observé, il entre dans un état de rage incontrôlable.",

        position:
            "center center"
    },


    {
        title: "SCP-173",

        image: "images/scp173.png",

        description:
            "SCP-173 est une statue extrêmement dangereuse capable de se déplacer à très grande vitesse lorsqu'elle n'est pas observée.",

        position:
            "center center"
    }

];


/* ============================================= */
/* RÉCUPÉRATION DES ÉLÉMENTS HTML                */
/* ============================================= */

const background1 =
    document.getElementById("background1");

const background2 =
    document.getElementById("background2");


const scpInfo =
    document.getElementById("scpInfo");

const scpTitle =
    document.getElementById("scpTitle");

const scpDescription =
    document.getElementById("scpDescription");


const progressBar =
    document.getElementById("progressBar");

const percentageText =
    document.getElementById("percentage");

const statusText =
    document.getElementById("status");

const fileNameText =
    document.getElementById("fileName");


const serverNameText =
    document.getElementById("serverName");

const mapNameText =
    document.getElementById("mapName");


/* ============================================= */
/* PRÉCHARGEMENT DES IMAGES                      */
/* ============================================= */

slides.forEach((slide) => {

    const img =
        new Image();

    img.src =
        slide.image;

});


/* ============================================= */
/* PREMIER SCP                                   */
/* ============================================= */

let currentSlide = 0;

let currentBackground = 1;


/* Temps avant changement */
/* 8000 = 8 secondes */

const slideDuration =
    8000;


/* Première image */

background1.style.backgroundImage =
    `url("${slides[0].image}")`;

background1.style.backgroundPosition =
    slides[0].position;


scpTitle.textContent =
    slides[0].title;

scpDescription.textContent =
    slides[0].description;


/* ============================================= */
/* CHANGEMENT SCP                                */
/* ============================================= */

function nextSlide() {

    currentSlide++;


    /* Retour au premier SCP */

    if (
        currentSlide >= slides.length
    ) {

        currentSlide = 0;

    }


    const slide =
        slides[currentSlide];


    /* Cache texte */

    scpInfo.classList.add(
        "hidden"
    );


    setTimeout(() => {

        let newBackground;
        let oldBackground;


        /* Si fond 1 actuellement visible */

        if (
            currentBackground === 1
        ) {

            newBackground =
                background2;

            oldBackground =
                background1;

            currentBackground = 2;

        }

        /* Sinon fond 2 visible */

        else {

            newBackground =
                background1;

            oldBackground =
                background2;

            currentBackground = 1;

        }


        /* Nouvelle image */

        newBackground.style.backgroundImage =
            `url("${slide.image}")`;


        newBackground.style.backgroundPosition =
            slide.position;


        /* Relancer animation GTA */

        newBackground.classList.remove(
            "active"
        );


        void newBackground.offsetWidth;


        newBackground.classList.add(
            "active"
        );


        /* Masquer ancienne image */

        oldBackground.classList.remove(
            "active"
        );


        /* Modifier texte */

        scpTitle.textContent =
            slide.title;


        scpDescription.textContent =
            slide.description;


        /* Réafficher texte */

        scpInfo.classList.remove(
            "hidden"
        );


    }, 600);

}


/* Changement automatique */

setInterval(
    nextSlide,
    slideDuration
);


/* ============================================= */
/* PROGRESSION GMOD                              */
/* ============================================= */

let totalFiles = 0;

let filesNeeded = 0;


/* Fonction progression */

function updateProgress() {

    if (
        totalFiles <= 0
    ) {

        return;

    }


    const downloaded =
        totalFiles - filesNeeded;


    let percent =
        Math.round(
            (
                downloaded /
                totalFiles
            ) * 100
        );


    /* Sécurité 0 → 100 */

    percent =
        Math.max(
            0,
            Math.min(
                100,
                percent
            )
        );


    progressBar.style.width =
        percent + "%";


    percentageText.textContent =
        percent + "%";

}


/* ============================================= */
/* FONCTIONS GARRY'S MOD                         */
/* ============================================= */


/* Informations serveur */

window.GameDetails = function(
    serverName,
    serverURL,
    mapName,
    maxPlayers,
    steamID,
    gamemode,
    volume,
    language
) {

    if (serverName) {

        serverNameText.textContent =
            serverName.toUpperCase();

    }


    if (mapName) {

        mapNameText.textContent =
            mapName.toUpperCase();

    }

};


/* Nombre total de fichiers */

window.SetFilesTotal =
function(total) {

    totalFiles =
        Number(total) || 0;


    updateProgress();

};


/* Fichiers restants */

window.SetFilesNeeded =
function(needed) {

    filesNeeded =
        Number(needed) || 0;


    updateProgress();

};


/* Fichier en téléchargement */

window.DownloadingFile =
function(fileName) {

    statusText.textContent =
        "TÉLÉCHARGEMENT";


    fileNameText.textContent =
        fileName;

};


/* Changement d'état */

window.SetStatusChanged =
function(status) {

    if (!status) {

        return;

    }


    statusText.textContent =
        status.toUpperCase();

};


/* ============================================= */
/* MODE DÉMO                                     */
/* ============================================= */

/*
    Pour tester sans GMod :

    ajoute ?demo=1

    Exemple :

    https://tonpseudo.github.io/gmod-loading/?demo=1
*/


const parameters =
    new URLSearchParams(
        window.location.search
    );


if (
    parameters.get("demo") === "1"
) {

    let demoProgress =
        0;


    serverNameText.textContent =
        "SCP ROLEPLAY FR";


    mapNameText.textContent =
        "SITE-19";


    statusText.textContent =
        "TÉLÉCHARGEMENT";


    const demo =
        setInterval(() => {

            demoProgress++;


            progressBar.style.width =
                demoProgress + "%";


            percentageText.textContent =
                demoProgress + "%";


            fileNameText.textContent =
                "materials/scp/file_" +
                demoProgress +
                ".vmt";


            if (
                demoProgress >= 100
            ) {

                clearInterval(
                    demo
                );


                statusText.textContent =
                    "TERMINÉ";


                fileNameText.textContent =
                    "Connexion au serveur...";

            }

        }, 150);

}