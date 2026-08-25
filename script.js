/* ============================================== */
/* LISTE DES SCP                                  */
/* ============================================== */

const slides = [

    {
        title: "SCP-035",

        image: "images/scp035.webp",

        description:
            "SCP-035 est un masque ancien et conscient, capable d'influencer mentalement et de posséder quiconque le porte.",

        position:
            "center center"
    },


    {
        title: "SCP-049",

        image: "images/scp049.webp",

        description:
            "SCP-049 est une entité humanoïde connue sous le nom de Docteur de la Peste. Il affirme pouvoir guérir une mystérieuse pestilence.",

        position:
            "center center"
    }

];


/* ============================================== */
/* ÉLÉMENTS HTML                                  */
/* ============================================== */

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


/* ============================================== */
/* PRÉCHARGEMENT DES IMAGES                       */
/* ============================================== */

slides.forEach(function(slide) {

    const img =
        new Image();

    img.src =
        slide.image;

});


/* ============================================== */
/* PREMIER SCP                                    */
/* ============================================== */

let currentSlide = 0;

let activeBackground = 1;


/*
    Temps entre chaque image.

    8000 = 8 secondes
*/

const slideDuration =
    8000;


/* Charge SCP-035 */

background1.style.backgroundImage =
    'url("' +
    slides[0].image +
    '")';


background1.style.backgroundPosition =
    slides[0].position;


scpTitle.textContent =
    slides[0].title;


scpDescription.textContent =
    slides[0].description;


/* ============================================== */
/* TRANSITION ENTRE LES SCP                       */
/* ============================================== */

function nextSlide() {

    currentSlide++;


    if (
        currentSlide >= slides.length
    ) {

        currentSlide = 0;

    }


    const slide =
        slides[currentSlide];


    /*
        Commence par cacher le texte
    */

    scpInfo.classList.add(
        "hidden"
    );


    setTimeout(function() {

        let newBackground;
        let oldBackground;


        /*
            Fond actuellement utilisé
        */

        if (
            activeBackground === 1
        ) {

            newBackground =
                background2;

            oldBackground =
                background1;

            activeBackground = 2;

        }

        else {

            newBackground =
                background1;

            oldBackground =
                background2;

            activeBackground = 1;

        }


        /*
            Charge nouvelle image
        */

        newBackground.style.backgroundImage =
            'url("' +
            slide.image +
            '")';


        newBackground.style.backgroundPosition =
            slide.position;


        /*
            Relance le zoom GTA
        */

        newBackground.classList.remove(
            "active"
        );


        void newBackground.offsetWidth;


        newBackground.classList.add(
            "active"
        );


        /*
            Ancienne image disparaît
        */

        oldBackground.classList.remove(
            "active"
        );


        /*
            Change titre + description
        */

        scpTitle.textContent =
            slide.title;


        scpDescription.textContent =
            slide.description;


        /*
            Réaffiche texte
        */

        scpInfo.classList.remove(
            "hidden"
        );


    }, 600);

}


/*
    Lance les changements
*/

setInterval(
    nextSlide,
    slideDuration
);


/* ============================================== */
/* PROGRESSION GMOD                               */
/* ============================================== */

let totalFiles = 0;

let filesNeeded = 0;


/*
    Met à jour la barre
*/

function updateProgress() {

    if (
        totalFiles <= 0
    ) {

        return;

    }


    const downloaded =
        totalFiles -
        filesNeeded;


    let percent =
        Math.round(
            (
                downloaded /
                totalFiles
            )
            * 100
        );


    /*
        Force entre 0 et 100
    */

    percent =
        Math.max(
            0,
            Math.min(
                percent,
                100
            )
        );


    progressBar.style.width =
        percent +
        "%";


    percentageText.textContent =
        percent +
        "%";

}


/* ============================================== */
/* FONCTIONS APPELÉES PAR GARRY'S MOD             */
/* ============================================== */


/*
    Informations serveur
*/

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


/*
    GMod indique le nombre total
    de fichiers
*/

window.SetFilesTotal =
function(total) {

    totalFiles =
        parseInt(
            total,
            10
        ) || 0;


    updateProgress();

};


/*
    GMod indique combien
    de fichiers restent
*/

window.SetFilesNeeded =
function(needed) {

    filesNeeded =
        parseInt(
            needed,
            10
        ) || 0;


    updateProgress();

};


/*
    Fichier actuellement téléchargé
*/

window.DownloadingFile =
function(fileName) {

    statusText.textContent =
        "TÉLÉCHARGEMENT";


    if (fileName) {

        fileNameText.textContent =
            fileName;

    }

};


/*
    État de connexion envoyé par GMod
*/

window.SetStatusChanged =
function(status) {

    if (!status) {

        return;

    }


    statusText.textContent =
        status.toUpperCase();

};


/* ============================================== */
/* MODE TEST GITHUB                               */
/* ============================================== */

/*
    Pour tester :

    https://tonpseudo.github.io/gmod-loading/?demo=1

    Ce mode simule une progression.
*/


const params =
    new URLSearchParams(
        window.location.search
    );


if (
    params.get("demo") === "1"
) {

    let demoProgress = 0;


    serverNameText.textContent =
        "SCP ROLEPLAY FR";


    mapNameText.textContent =
        "SITE-19";


    statusText.textContent =
        "TÉLÉCHARGEMENT";


    const demo =
        setInterval(
            function() {

                demoProgress++;


                progressBar.style.width =
                    demoProgress +
                    "%";


                percentageText.textContent =
                    demoProgress +
                    "%";


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
                        "CONNEXION";


                    fileNameText.textContent =
                        "Chargement terminé...";

                }

            },

            120
        );

}
