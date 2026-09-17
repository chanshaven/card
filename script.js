const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const questionScreen =
    document.getElementById("question-screen");

const answerScreen =
    document.getElementById("answer-screen");

const buttonArea =
    document.getElementById("buttonArea");



/* =========================
   NO BUTTON RUNS AWAY
========================= */

function moveNoButton() {

    const rect = noBtn.getBoundingClientRect();

    const padding = 20;

    const maxX =
        window.innerWidth - rect.width - padding;

    const maxY =
        window.innerHeight - rect.height - padding;

    let randomX;
    let randomY;

    do {

        randomX =
            Math.random() * (maxX - padding) + padding;

        randomY =
            Math.random() * (maxY - padding) + padding;

    } while (
        Math.abs(randomX - rect.left) < 120 &&
        Math.abs(randomY - rect.top) < 120
    );


    noBtn.style.position = "fixed";

    noBtn.style.left =
        `${randomX}px`;

    noBtn.style.top =
        `${randomY}px`;

    noBtn.style.right = "auto";

    noBtn.style.zIndex = "999";
}


/* Chuột đến gần là chạy */

document.addEventListener(
    "mousemove",
    function (event) {

        const rect =
            noBtn.getBoundingClientRect();

        const centerX =
            rect.left + rect.width / 2;

        const centerY =
            rect.top + rect.height / 2;


        const distanceX =
            event.clientX - centerX;

        const distanceY =
            event.clientY - centerY;


        const distance =
            Math.sqrt(
                distanceX * distanceX +
                distanceY * distanceY
            );


        /*
        Chuột cách nút dưới 90px
        => chạy ngay
        */

        if (distance < 90) {
            moveNoButton();
        }

    }
);


/* Điện thoại */

noBtn.addEventListener(
    "touchstart",
    function (event) {

        event.preventDefault();

        moveNoButton();
    },
    {
        passive: false
    }
);


/* Nếu bằng cách nào đó vẫn click trúng 😆 */

noBtn.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        moveNoButton();
    }
);



/* =========================
   YES
========================= */

yesBtn.addEventListener(
    "click",
    function () {

        questionScreen.style.opacity = "0";

        questionScreen.style.transform =
            "scale(0.95)";

        questionScreen.style.transition =
            "all 0.4s ease";


        setTimeout(() => {

            questionScreen.style.display =
                "none";

            answerScreen.classList.remove(
                "hidden"
            );

            answerScreen.animate(

                [
                    {
                        opacity: 0,
                        transform:
                            "translateY(20px)"
                    },

                    {
                        opacity: 1,
                        transform:
                            "translateY(0)"
                    }
                ],

                {
                    duration: 700,
                    easing: "ease",
                    fill: "forwards"
                }

            );

            createHeartExplosion();

        }, 400);
    }
);



/* =========================
   HEART BACKGROUND
========================= */

function createHeart() {

    const heart =
        document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML = "♡";


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.fontSize =
        Math.random() * 20 + 15 + "px";


    heart.style.animationDuration =
        Math.random() * 4 + 5 + "s";


    document.body.appendChild(heart);


    setTimeout(() => {
        heart.remove();
    }, 9000);
}


setInterval(
    createHeart,
    900
);



/* =========================
   YES HEART EXPLOSION
========================= */

function createHeartExplosion() {

    for (let i = 0; i < 25; i++) {

        setTimeout(() => {

            createHeart();

        }, i * 60);
    }
}