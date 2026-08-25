/* ============================================
   LISTE DES SLIDES
============================================ */

const slides = [

    /* ========================================
       SCP-966
    ======================================== */

    {
        title: "SCP-966",

        image:
            "./images/scp966.png",

        description:
            "Des créatures presque invisibles à l'œil humain. SCP-966 traque ses victimes en les privant progressivement de sommeil, jusqu'à les pousser à l'épuisement total.",

        position:
            "center center"
    },


    /* ========================================
       SCP-106
    ======================================== */

    {
        title: "SCP-106",

        image:
            "./images/scp106.png",

        description:
            "Une entité humanoïde extrêmement hostile, capable de traverser la matière solide. SCP-106 aime traquer ses victimes avant de les entraîner dans sa mystérieuse dimension de poche.",

        position:
            "center center"
    },


    /* ========================================
       SCP-999
    ======================================== */

    {
        title: "SCP-999",

        image:
            "./images/scp999.png",

        description:
            "Une créature gélatineuse aussi inoffensive qu'affectueuse. SCP-999 recherche constamment le contact humain et provoque un profond sentiment de bonheur chez les personnes qui l'approchent.",

        position:
            "center center"
    },


    /* ========================================
       SCP-682
    ======================================== */

    {
        title: "SCP-682",

        image:
            "./images/scp682.png",

        description:
            "Une créature extrêmement intelligente, agressive et résistante. SCP-682 éprouve une profonde hostilité envers toute forme de vie et possède une capacité d'adaptation exceptionnelle.",

        position:
            "center center"
    },


    /* ========================================
       SCP-049
    ======================================== */

    {
        title: "SCP-049",

        image:
            "./images/scp049.png",

        description:
            "Une mystérieuse entité humanoïde convaincue que l'humanité est touchée par une maladie qu'elle appelle « la Pestilence ». SCP-049 cherche constamment à la « soigner » avec des méthodes plutôt radicales.",

        position:
            "center center"
    },


    /* ========================================
       AGENT DE SÉCURITÉ
    ======================================== */

    {
        title: "AGENT DE SÉCURITÉ",

        image:
            "./images/agentsecurite.png",

        description:
            "Chargé de surveiller les Classe-D, de maintenir l'ordre et d'être en première ligne lors des déconfinements... des situations parfois moins faciles à gérer que certains Classe-D.",

        position:
            "center center"
    }

];


/* ============================================
   ÉLÉMENTS HTML
============================================ */

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


/* ============================================
   PRÉCHARGEMENT DES IMAGES
============================================ */

/*
    Cela évite d'avoir un écran noir
    lors du premier changement.
*/

slides.forEach(function(slide) {

    const image =
        new Image();

    image.src =
        slide.image;

});


/* ============================================
   SLIDER
============================================ */

let currentSlide = 0;

let activeBackground = 1;


/*
    8000 = 8 secondes.

    Change ici si tu veux :
    5000 = 5 secondes
    10000 = 10 secondes
*/

const slideDuration =
    8000;


/* ============================================
   PREMIER SLIDE
============================================ */

background1.src =
    slides[0].image;

background1.style.objectPosition =
    slides[0].position;

scpTitle.textContent =
    slides[0].title;

scpDescription.textContent =
    slides[0].description;


/* ============================================
   CHANGEMENT
============================================ */

function changeSlide() {

    /*
        Prépare l'index suivant
    */

    let nextIndex =
        currentSlide + 1;


    if (
        nextIndex >= slides.length
    ) {

        nextIndex = 0;

    }


    const nextSlide =
        slides[nextIndex];


    /*
        Choisit le fond invisible.
    */

    let newBackground;
    let oldBackground;


    if (
        activeBackground === 1
    ) {

        newBackground =
            background2;

        oldBackground =
            background1;

    }

    else {

        newBackground =
            background1;

        oldBackground =
            background2;

    }


    /*
        On charge l'image AVANT
        de lancer la transition.
    */

    const loader =
        new Image();


    loader.onload =
    function() {

        /*
            Prépare la nouvelle image.
        */

        newBackground.src =
            nextSlide.image;


        newBackground.style.objectPosition =
            nextSlide.position;


        /*
            ÉTAPE 1

            Image + texte disparaissent
            EN MÊME TEMPS.
        */

        oldBackground.classList.remove(
            "active"
        );


        scpInfo.classList.add(
            "hidden"
        );


        /*
            Attend le milieu du fondu.
        */

        setTimeout(function() {

            /*
                ÉTAPE 2

                Change le texte pendant
                qu'il est invisible.
            */

            scpTitle.textContent =
                nextSlide.title;


            scpDescription.textContent =
                nextSlide.description;


            /*
                Relance éventuellement
                l'animation de zoom.
            */

            newBackground.classList.remove(
                "active"
            );


            void newBackground.offsetWidth;


            /*
                ÉTAPE 3

                Nouvelle image + nouveau texte
                apparaissent EN MÊME TEMPS.
            */

            newBackground.classList.add(
                "active"
            );


            scpInfo.classList.remove(
                "hidden"
            );


            /*
                Nouveau slide actif.
            */

            currentSlide =
                nextIndex;


            if (
                activeBackground === 1
            ) {

                activeBackground = 2;

            }

            else {

                activeBackground = 1;

            }

        }, 800);

    };


    /*
        Commence à charger
        l'image suivante.
    */

    loader.src =
        nextSlide.image;

}


/* ============================================
   CHANGE AUTOMATIQUEMENT
============================================ */

setInterval(
    changeSlide,
    slideDuration
);


/* ============================================
   PROGRESSION GMOD
============================================ */

let totalFiles = 0;

let filesNeeded = 0;


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
        Empêche moins de 0
        ou plus de 100.
    */

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


/* ============================================
   INFORMATIONS GMOD
============================================ */

window.GameDetails =
function(
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


/* ============================================
   TOTAL DE FICHIERS
============================================ */

window.SetFilesTotal =
function(total) {

    totalFiles =
        Number(total) || 0;


    updateProgress();

};


/* ============================================
   FICHIERS RESTANTS
============================================ */

window.SetFilesNeeded =
function(needed) {

    filesNeeded =
        Number(needed) || 0;


    updateProgress();

};


/* ============================================
   FICHIER ACTUEL
============================================ */

window.DownloadingFile =
function(fileName) {

    statusText.textContent =
        "TÉLÉCHARGEMENT";


    if (fileName) {

        fileNameText.textContent =
            fileName;

    }

};


/* ============================================
   STATUT GMOD
============================================ */

window.SetStatusChanged =
function(status) {

    if (!status) {

        return;

    }


    statusText.textContent =
        status.toUpperCase();

};


/* ============================================
   MODE DÉMO
============================================ */

/*
    Test :

    https://lawknightcore-dot.github.io/
    gmod-loading-screen/?demo=1
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
        "SCP ROLEPLAY";


    mapNameText.textContent =
        "SITE-19";


    statusText.textContent =
        "TÉLÉCHARGEMENT";


    const demo =
        setInterval(function() {

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
                    "CONNEXION";


                fileNameText.textContent =
                    "Chargement terminé...";

            }

        }, 150);

}
