/* =========================================================
   SCAN GANESHA
   DEVOTIONAL INTERACTIVE WEBSITE
========================================================= */


/* =========================================================
   WEBSITE URL
========================================================= */
const WEBSITE_URL = window.location.origin + window.location.pathname;



/* =========================================================
   PAGE NAVIGATION
========================================================= */

function showPage(pageId) {

    document.querySelectorAll(".page").forEach(function(page) {

        page.classList.remove("active");

    });


    const page =
        document.getElementById(pageId);


    if (page) {

        page.classList.add("active");

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (pageId === "qrPage") {

        setTimeout(function() {

            createQRCode();

        }, 100);

    }


    if (pageId === "quizPage") {

        loadQuiz();

    }

}


/* =========================================================
   COMPLETE GANESHA STORIES
========================================================= */

const stories = [

{
title:
"The Race for the Cosmic Fruit (The Triumph of Intellect over Speed)",

paragraphs: [

`Once, Lord Ganesha and his brother Kartikeya were given a
special challenge by their parents, Lord Shiva and Goddess
Parvati.`,

`A divine fruit representing knowledge and wisdom was brought
before them. Both brothers wanted the fruit, but it could not
be divided.`,

`Their parents announced that whoever could travel around the
world and return first would receive the fruit.`,

`Kartikeya immediately mounted his peacock and travelled at
great speed around the world.`,

`Ganesha looked at his small mouse vehicle. He understood that
he could not win a race based on physical speed.`,

`Instead of giving up, Ganesha thought deeply about the meaning
of the challenge.`,

`He then walked respectfully around Lord Shiva and Goddess
Parvati three times.`,

`When his parents asked why he had done this, Ganesha explained
that his parents represented his entire world. Therefore,
walking around them was equal to travelling around the universe.`,

`Kartikeya eventually returned from his journey and realised
that Ganesha had found a wiser solution.`

],

meaning:
`The story teaches that intelligence and understanding can be
more powerful than physical speed. A difficult problem can
sometimes be solved by changing the way we look at it.`
},


{
title:
"The Broken Tusk (The Writing of the Mahabharata)",

paragraphs: [

`The Mahabharata is one of the greatest epics of India.
According to a traditional account, the sage Vyasa wanted
someone capable of writing down the epic as he dictated it.`,

`Vyasa approached Lord Ganesha and requested him to become the
scribe.`,

`Ganesha agreed, but placed a condition: Vyasa must continue
reciting without interruption.`,

`Vyasa accepted but added his own condition. Ganesha should
write only after understanding the meaning of every verse.`,

`The great work began. Vyasa recited and Ganesha wrote.`,

`During the process, Ganesha's writing instrument broke.`,

`Because he had promised not to stop writing, Ganesha broke one
of his own tusks and used it as a writing instrument.`,

`He continued writing and completed the enormous task.`,

`This traditional story is one reason Ganesha is often shown
with one broken tusk.`

],

meaning:
`The broken tusk represents sacrifice, determination,
knowledge and dedication. It teaches us not to allow obstacles
to stop an important task.`
},


{
title:
"The Curse of the Moon (Conquering the Ego)",

paragraphs: [

`One traditional story tells that Lord Ganesha was returning
home after enjoying a large feast.`,

`His belly was full of delicious food, including modaks.`,

`As he travelled on his mouse vehicle, the mouse became
frightened after seeing a snake and stumbled.`,

`Ganesha fell from the mouse and some of the food spilled.`,

`The Moon, Chandra, saw the incident and laughed at Ganesha.`,

`The Moon was proud of his beauty and brilliance.`,

`Ganesha became displeased with the Moon's arrogance and
placed a curse upon him.`,

`The Moon realised his mistake and sincerely asked Ganesha
for forgiveness.`,

`Ganesha eventually softened the curse.`,

`The story became associated with traditional beliefs about
the Moon and Ganesha Chaturthi.`

],

meaning:
`The story teaches humility. Beauty, fame and status should
never become reasons for pride or for making fun of another
person.`
},


{
title:
"Outsmarting the Demon of Pride (The Story of Kubera's Feast)",

paragraphs: [

`Kubera was traditionally regarded as the god of wealth.`,

`Because of his enormous riches, Kubera became proud of his
possessions.`,

`He invited Lord Shiva and Goddess Parvati to a grand feast
because he wanted to display his wealth.`,

`Lord Shiva understood the pride behind the invitation and
suggested that Kubera feed Lord Ganesha instead.`,

`Kubera happily accepted the challenge.`,

`Ganesha arrived and began eating.`,

`He ate the food that had been prepared and continued asking
for more.`,

`Kubera ordered the cooks to prepare more and more food, but
Ganesha continued eating.`,

`Kubera's enormous wealth suddenly seemed insignificant.`,

`Kubera became frightened and realised that material wealth
could not make him truly great.`,

`He approached Shiva and recognised his mistake.`

],

meaning:
`The story teaches that wealth should always be accompanied
by humility. True greatness comes from wisdom and character,
not from possessions.`
},


{
title:
"Saving the Earth from Ravana (The Story of the Atma-Linga)",

paragraphs: [

`A popular traditional legend connects Lord Ganesha with the
Atma-Linga and the sacred place of Gokarna.`,

`Ravana, the powerful king of Lanka, performed intense penance
and received the sacred Atma-Linga.`,

`He wanted to carry it to Lanka.`,

`He was instructed that the sacred Linga must not be placed
on the ground.`,

`The gods became concerned about the power Ravana would gain
if he successfully carried the Atma-Linga to Lanka.`,

`Lord Ganesha appeared in the form of a young boy.`,

`Ravana needed someone to hold the Linga temporarily while
he performed his prayers.`,

`Ganesha agreed but warned him that he could call Ravana only
a limited number of times.`,

`When Ravana did not return quickly enough, Ganesha placed
the Atma-Linga on the ground.`,

`Ravana returned and tried to lift it with enormous strength,
but he could not move it.`,

`The sacred Linga remained at Gokarna.`

],

meaning:
`The story teaches that intelligence can overcome enormous
strength and power.`
},


{
title:
"The Shield of Parvati (How Ganesha Gained His Elephant Head)",

paragraphs: [

`Goddess Parvati wished to bathe privately.`,

`According to a traditional account, she created a young
guardian from turmeric paste or material from her body.`,

`She instructed him to guard the entrance and not allow anyone
to enter.`,

`The young guardian was Ganesha.`,

`Lord Shiva later returned to Mount Kailash and wished to enter.`,

`Ganesha did not recognise him in the situation and faithfully
followed his mother's command.`,

`A confrontation developed between Shiva and Ganesha.`,

`During the fierce conflict, Shiva severed Ganesha's head.`,

`Parvati was devastated and demanded that Ganesha be restored.`,

`Shiva agreed to bring him back to life.`,

`An elephant's head was brought and placed upon Ganesha.`,

`Shiva restored Ganesha to life and honoured him as the leader
of the Ganas.`

],

meaning:
`The story represents devotion, duty, transformation and the
divine origin of Ganesha's distinctive elephant-headed form.`
},


{
title:
"The Mango Trick (Ganesha and Kartikeya's Friendly Rivalry)",

paragraphs: [

`A special mango representing divine knowledge was brought
before Lord Shiva and Goddess Parvati.`,

`Ganesha and Kartikeya both wanted the fruit.`,

`Their parents announced that whoever could travel around the
world and return first would receive it.`,

`Kartikeya immediately mounted his peacock and began travelling.`,

`Ganesha knew that his mouse could never match the speed of
the peacock.`,

`He therefore thought about the deeper meaning of the contest.`,

`Ganesha respectfully walked around his parents three times.`,

`He explained that Shiva and Parvati represented the whole
universe for him.`,

`Therefore, circumambulating them was equal to travelling
around the world.`,

`Kartikeya eventually returned and understood his brother's
wisdom.`,

`Ganesha received the mango.`

],

meaning:
`The story teaches wisdom, devotion, creative thinking and
respect for parents.`
},


{
title:
"The Creation of the River Cauvery (How Ganesha Fooled Sage Agastya)",

paragraphs: [

`A popular traditional legend connects Lord Ganesha with the
origin of the sacred River Cauvery.`,

`Sage Agastya is said to have carried sacred water in a vessel.`,

`The water was destined to flow across the land and bring
life and prosperity.`,

`According to the legend, Lord Ganesha appeared in the form
of a crow.`,

`The crow approached the vessel and disturbed it.`,

`The vessel fell and the sacred water began to flow.`,

`The flowing water became associated with the River Cauvery.`,

`Sage Agastya realised that what appeared to be an accident
was part of a divine plan.`,

`The Cauvery became an important river of southern India,
supporting agriculture, culture and communities.`

],

meaning:
`The story reminds us that divine plans can sometimes appear
through unexpected events. It also reminds us of the importance
of rivers and water to life.`
},


{
title:
"The Secrets of His Form (The Big Belly and the Tiny Mouse)",

paragraphs: [

`Lord Ganesha's physical form is filled with symbolic meaning.
Each part of his appearance represents a lesson.`,

`His elephant head represents wisdom, intelligence, strength
and memory.`,

`His large ears remind devotees to listen carefully and learn
from wisdom.`,

`His single tusk is traditionally associated with keeping
what is valuable and letting go of what is unnecessary.`,

`His large belly represents the ability to accept and digest
the different experiences of life.`,

`His vehicle is the tiny mouse.`,

`The mouse is often associated with restless desires and the
constantly moving human mind.`,

`Ganesha riding the mouse symbolises control over desires and
mastery of the mind.`,

`His hands and the objects he carries are also traditionally
given symbolic meanings related to protection, blessings,
knowledge and discipline.`,

`Together, these features make Ganesha's form a visual lesson
in wisdom, humility, self-control and balance.`

],

meaning:
`Ganesha's form teaches us that wisdom should control the
restless mind and that true greatness can exist together
with humility.`
}

];


/* =========================================================
   LOAD STORIES
========================================================= */

function loadStories() {

    const container =
        document.getElementById("storiesContainer");

    if (!container) return;


    container.innerHTML = "";


    stories.forEach(function(story,index) {

        const card =
            document.createElement("article");


        card.className =
            "story-card";


        let paragraphs = "";


        story.paragraphs.forEach(function(text) {

            paragraphs +=
                `<p>${text}</p>`;

        });


        card.innerHTML = `

            <div class="story-number">
                STORY ${index + 1}
            </div>

            <h2>
                ${story.title}
            </h2>

            ${paragraphs}

            <div class="spiritual-meaning">

                <h3>
                    🌺 Spiritual Meaning
                </h3>

                <p>
                    ${story.meaning}
                </p>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   MANTRAS
========================================================= */

const mantras = [

{
title: "గణపతిమాలామంత్రాః",

text:
`ఓం గం గణపతయే నమః
ఓం శ్రీం హ్రీం క్లీం గ్లౌం గం గణపతయే వరవరద సర్వజనం మే వశమానయ స్వాహా`
},


{
title: "శ్రీ లక్ష్మీ గణపతి స్తోత్రం",

text:
`సుముఖశ్చైకదంతశ్చ కపిలో గజకర్ణకః
లంబోదరశ్చ వికటో విఘ్నరాజో గణాధిపః
ధూమకేతుర్గణాధ్యక్షో ఫాలచంద్రో గజాననః`
},


{
title: "మహా గణపతి రక్షా మంత్రం",

text:
`ఓం గం గణపతయే నమః
సర్వ విఘ్న వినాశాయ
సర్వ కార్య సిద్ధయే
శ్రీ మహాగణపతయే నమః`
},


{
title: "గణపతి మంత్రము",

text:
`ఓం గం గణపతయే నమః
వక్రతుండ మహాకాయ
సూర్యకోటి సమప్రభ
నిర్విఘ్నం కురుమే దేవ
శుభకార్యేషు సర్వదా`
},


{
title: "వక్రతుండ మహాకాయ శ్లోకం",

text:
`వక్రతుండ మహాకాయ
సూర్యకోటి సమప్రభః
నిర్విఘ్నం కురుమే దేవ
శుభకార్యేషు సర్వదా`
},


{
title: "గణపతి మూల మంత్రం",

text:
`ఓం గం గణపతయే నమః`
},


{
title: "గణేశ గాయత్రీ మంత్రం",

text:
`ఓం ఏకదంతాయ విద్మహే
వక్రతుండాయ ధీమహి
తన్నో దంతిః ప్రచోదయాత్`
},


{
title: "గజాననం భూతగణాది సేవితం",

text:
`గజాననం భూతగణాదిసేవితం
కపిత్థజంబూఫలచారుభక్షణమ్
ఉమాసుతం శోకవినాశకారణం
నమామి విఘ్నేశ్వరపాదపంకజమ్`
},


{
title: "శుక్లాంబరధరం",

text:
`శుక్లాంబరధరం విష్ణుం
శశివర్ణం చతుర్భుజమ్
प्रसन्नवदనం ధ్యాయేత్
సర్వవిఘ్నోపశాంతయే`
}

];


/* =========================================================
   LOAD MANTRAS
========================================================= */

function loadMantras() {

    const container =
        document.getElementById("mantraContainer");

    if (!container) return;


    container.innerHTML = "";


    mantras.forEach(function(mantra,index) {

        const card =
            document.createElement("div");


        card.className =
            "mantra-card";


        card.innerHTML = `

            <h2>
                ${index + 1}. ${mantra.title}
            </h2>

            <div class="mantra-text">
                ${mantra.text}
            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   7 SONGS
========================================================= */

const songs = [

{
    name: "Suklam Bharadharam",
    file: "audio/suklam baradharam.mp3.mpeg"
},

{
    name: "Bujji Bujji Ganapayya",
    file: "audio/bujji bujji ganapayya.mp3"
},

{
    name: "Maha Ganapatim",
    file: "audio/maha ganapatim.mp3"
},

{
    name: "Jai Jai Ganesha",
    file: "audio/jai jai ganesha.mp3"
},

{
    name: "Undrallayyo",
    file: "audio/undrallayo.mp3"
},

{
    name: "Gananayakaya",
    file: "audio/gananayakaya.mp3"
},

{
    name: "Bappa Morya",
    file: "audio/bappa morya.mp3.mpeg"
}

];


/* =========================================================
   LOAD MUSIC
========================================================= */


function loadMusic() {

    const container =
        document.getElementById("musicContainer");

    if (!container) return;

    container.innerHTML = "";

    songs.forEach(function(song, index) {

        const card =
            document.createElement("div");

        card.className = "song-card";

        card.innerHTML = `
            <div class="song-icon">
                🎵
            </div>

            <div class="song-info">

                <h2>
                    ${index + 1}. ${song.name}
                </h2>

                <audio
                    controls
                    preload="metadata"
                >
                    <source
                        src="${song.file}"
                        type="audio/mpeg"
                    >

                    Your browser does not support
                    audio playback.

                </audio>

            </div>
        `;

        container.appendChild(card);

        // Get this song's audio player
        const audio =
            card.querySelector("audio");

        // When this song starts playing,
        // pause all other songs
        audio.addEventListener("play", function() {

            const allAudio =
                container.querySelectorAll("audio");

            allAudio.forEach(function(otherAudio) {

                if (otherAudio !== audio) {
                    otherAudio.pause();
                }

            });

        });

    });

}
/* =========================================================
   GALLERY
========================================================= */

const galleryImages = [

    "images/ganesha.png",
    "images/ganesha1.jpg",
    "images/ganesha2.jpg",
    "images/ganesha3.jpg",
    "images/ganesha4.jpg",
    "images/ganesha5.jpg",
    "images/ganesha6.jpg",
    "images/ganesha7.jpg",
    "images/ganesha8.jpg",
    "images/ganesha9.jpg",
    "images/ganesha10.jpg"

];


function loadGallery() {

    const container =
        document.getElementById("galleryContainer");

    if (!container) return;


    container.innerHTML = "";


    galleryImages.forEach(function(image,index) {

        const card =
            document.createElement("div");


        card.className =
            "gallery-card";


        card.innerHTML = `

            <img
                src="${image}"
                alt="Lord Ganesha ${index + 1}"
                onclick="openGalleryImage('${image}')"
            >

        `;


        container.appendChild(card);

    });

}


function openGalleryImage(image) {

    window.open(image,"_blank");

}


/* =========================================================
   QUIZ
========================================================= */

const quizQuestions = [

{
question:
"Who is Lord Ganesha's mother?",

options:
[
"Goddess Lakshmi",
"Goddess Parvati",
"Goddess Saraswati",
"Goddess Ganga"
],

answer: 1
},


{
question:
"What is Lord Ganesha traditionally known as the remover of?",

options:
[
"Mountains",
"Obstacles",
"Rivers",
"Stars"
],

answer: 1
},


{
question:
"What is Ganesha's vehicle?",

options:
[
"Peacock",
"Lion",
"Mouse",
"Elephant"
],

answer: 2
},


{
question:
"Which sweet is especially associated with Lord Ganesha?",

options:
[
"Jalebi",
"Modak",
"Payasam",
"Puri"
],

answer: 1
},


{
question:
"Who is Lord Ganesha's father?",

options:
[
"Lord Vishnu",
"Lord Brahma",
"Lord Shiva",
"Lord Indra"
],

answer: 2
},


{
question:
"Which festival celebrates the birth of Lord Ganesha?",

options:
[
"Diwali",
"Holi",
"Vinayaka Chaturthi",
"Navaratri"
],

answer: 2
},


{
question:
"Which animal head does Lord Ganesha have?",

options:
[
"Lion",
"Elephant",
"Horse",
"Bull"
],

answer: 1
},


{
question:
"What do Ganesha's large ears traditionally remind us to do?",

options:
[
"Speak loudly",
"Listen carefully",
"Run quickly",
"Sleep peacefully"
],

answer: 1
}

];


let currentQuizQuestion = 0;

let quizScore = 0;

let quizAnswered = false;


/* =========================================================
   LOAD QUIZ
========================================================= */

function loadQuiz() {

    currentQuizQuestion = 0;

    quizScore = 0;

    quizAnswered = false;


    const button =
        document.getElementById("nextQuestion");


    if (button) {

        button.innerText =
            "Next Question";

        button.onclick =
            nextQuizQuestion;

    }


    displayQuizQuestion();

}


/* =========================================================
   DISPLAY QUESTION
========================================================= */

function displayQuizQuestion() {

    const questionBox =
        document.getElementById("quizQuestion");

    const optionsBox =
        document.getElementById("quizOptions");

    const resultBox =
        document.getElementById("quizResult");


    if (!questionBox) return;


    const question =
        quizQuestions[currentQuizQuestion];


    quizAnswered = false;


    questionBox.innerHTML = `

        <div class="quiz-question">

            <p>
                QUESTION
                ${currentQuizQuestion + 1}
                /
                ${quizQuestions.length}
            </p>

            <strong>
                ${question.question}
            </strong>

        </div>

    `;


    optionsBox.innerHTML = "";

    resultBox.innerHTML = "";


    question.options.forEach(
        function(option,index) {

            const button =
                document.createElement("button");


            button.className =
                "quiz-option";


            button.innerText =
                option;


            button.onclick =
                function() {

                    checkQuizAnswer(
                        index,
                        button
                    );

                };


            optionsBox.appendChild(button);

        }
    );

}


/* =========================================================
   CHECK ANSWER
========================================================= */

function checkQuizAnswer(selected,button) {

    if (quizAnswered) return;


    quizAnswered = true;


    const question =
        quizQuestions[currentQuizQuestion];


    const result =
        document.getElementById("quizResult");


    if (selected === question.answer) {

        quizScore++;


        button.classList.add(
            "correct"
        );


        result.innerText =
            "🙏 Correct! Ganapati Bappa Morya!";

    }

    else {

        button.classList.add(
            "wrong"
        );


        result.innerText =
            "Keep learning about Lord Ganesha!";


        const options =
            document.querySelectorAll(
                ".quiz-option"
            );


        if (options[question.answer]) {

            options[
                question.answer
            ].classList.add("correct");

        }

    }

}


/* =========================================================
   NEXT QUESTION
========================================================= */

function nextQuizQuestion() {

    if (!quizAnswered) {

        document.getElementById(
            "quizResult"
        ).innerText =
            "Please select an answer first.";

        return;

    }


    currentQuizQuestion++;


    if (
        currentQuizQuestion >=
        quizQuestions.length
    ) {


        document.getElementById(
            "quizQuestion"
        ).innerHTML = `

            <div class="quiz-question">

                <h2>
                    🎉 Quiz Completed!
                </h2>

                <br>

                <p>
                    Your Score
                </p>

                <h1>
                    ${quizScore}
                    /
                    ${quizQuestions.length}
                </h1>

                <p>
                    🙏 Ganapati Bappa Morya!
                </p>

            </div>

        `;


        document.getElementById(
            "quizOptions"
        ).innerHTML = "";


        document.getElementById(
            "quizResult"
        ).innerText =
            "Thank you for taking the Ganesha Quiz.";


        const next =
            document.getElementById(
                "nextQuestion"
            );


        next.innerText =
            "Restart Quiz";


        next.onclick =
            function() {

                loadQuiz();

            };


        return;

    }


    displayQuizQuestion();

}


/* =========================================================
   QR CODE
========================================================= */
function createQRCode() {
    const qr = document.getElementById("qrcode");

    if (!qr) return;

    qr.innerHTML = "";

    if (typeof QRCode === "undefined") {
        qr.innerHTML = "<p>QR library could not load.</p>";
        return;
    }

    const currentWebsiteURL =
        window.location.origin + window.location.pathname;

    new QRCode(qr, {
        text: currentWebsiteURL,
        width: 240,
        height: 240,
        colorDark: "#650808",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}


/* =========================================================
   COPY WEBSITE URL
========================================================= */

function copyWebsiteURL() {

    navigator.clipboard
        .writeText(WEBSITE_URL)

        .then(function() {

            const message =
                document.getElementById(
                    "copyMessage"
                );


            if (message) {

                message.innerText =
                    "✓ Website link copied successfully!";

            }

        })

        .catch(function() {

            const message =
                document.getElementById(
                    "copyMessage"
                );


            if (message) {

                message.innerText =
                    WEBSITE_URL;

            }

        });

}


/* =========================================================
   FLOATING DEVOTIONAL PETALS
========================================================= */

function createFloatingPetals() {

    const symbols = [
        "🪷",
        "🌸",
        "✨",
        "🪔"
    ];


    for (let i = 0; i < 18; i++) {

        const petal =
            document.createElement("div");


        petal.innerText =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        petal.style.position =
            "fixed";


        petal.style.left =
            Math.random() * 100 + "%";


        petal.style.top =
            Math.random() * 100 + "%";


        petal.style.fontSize =
            (10 + Math.random() * 15) + "px";


        petal.style.opacity =
            0.15 + Math.random() * .35;


        petal.style.pointerEvents =
            "none";


        petal.style.zIndex =
            "999";


        petal.style.animation =
            `petalFloat ${
                8 + Math.random() * 8
            }s ease-in-out infinite`;


        petal.style.animationDelay =
            Math.random() * 5 + "s";


        document.body.appendChild(
            petal
        );

    }

}


/* =========================================================
   PETAL ANIMATION
========================================================= */

const petalStyle =
    document.createElement("style");


petalStyle.innerHTML = `

@keyframes petalFloat {

    0% {
        transform:
            translateY(0)
            rotate(0deg);
    }

    50% {
        transform:
            translateY(-35px)
            translateX(20px)
            rotate(15deg);
    }

    100% {
        transform:
            translateY(0)
            rotate(0deg);
    }

}

`;


document.head.appendChild(
    petalStyle
);


/* =========================================================
   INITIALIZE WEBSITE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadStories();

        loadMantras();

        loadMusic();

        loadGallery();

        createFloatingPetals();

    }
);
