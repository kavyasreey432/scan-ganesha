/* script.js */

/* ============================================================
   SCAN GANESHA - COMPLETE SCRIPT
   ============================================================ */

"use strict";

/* ============================================================
   GLOBAL STATE
============================================================ */

let currentParticipantName = "Devotee";
let currentParticipantUID = null;

let currentStoryIndex = 0;
let currentGalleryIndex = 0;

let chantCount = Number(
    localStorage.getItem("scanGaneshaChantCount") || 0
);

let exploredFeatures = new Set(
    JSON.parse(
        localStorage.getItem(
            "scanGaneshaExploredFeatures"
        ) || "[]"
    )
);

let firebaseAuth =
    window.firebaseAuth || null;

let firebaseDB =
    window.firebaseDB || null;

/* ============================================================
   PUZZLE STATE
============================================================ */

let puzzleImageIndex = 0;
let puzzleImage = "images/ganesha.png";

let puzzleTiles = [];
let puzzleSelected = null;

let puzzleMoves = 0;
let puzzleStartTime = null;
let puzzleTimerInterval = null;
let puzzleCompleted = false;

const puzzleImages = [
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

/* ============================================================
   SONGS
============================================================ */

const songs = [
    {
        title: "Suklam Bharadharam",
        subtitle: "Divine Ganesha Prayer",
        file: "audio/suklam%20baradharam.mp3",
        icon: "🕉️"
    },
    {
        title: "Bujji Bujji Ganapayya",
        subtitle: "Devotional Ganesha Song",
        file: "audio/bujji%20bujji%20ganapayya.mp3",
        icon: "🐘"
    },
    {
        title: "Maha Ganapatim",
        subtitle: "Sacred Ganesha Chant",
        file: "audio/maha%20ganapatim.mp3",
        icon: "🙏"
    },
    {
        title: "Jai Jai Ganesha",
        subtitle: "Celebration Song",
        file: "audio/jai%20jai%20ganesha.mp3",
        icon: "🌺"
    },
    {
        title: "Undrallayyo",
        subtitle: "Vinayaka Chaturthi Song",
        file: "audio/undrallayo.mp3",
        icon: "🍚"
    },
    {
        title: "Gananayakaya",
        subtitle: "Ganesha Devotional Song",
        file: "audio/gananayakaya.mp3",
        icon: "✨"
    },
    {
        title: "Bappa Morya",
        subtitle: "Ganapati Bappa Celebration",
        file: "audio/bappa%20morya.mp3",
        icon: "🎵"
    }
];

/* ============================================================
   STORIES
============================================================ */

const stories = [

    {
        title:
            "The Creation of the River Cauvery (How Ganesha Fooled Sage Agastya)",
        text:
`Long ago, the southern regions of India were suffering from a devastating, catastrophic drought. The lands were cracked, crops had withered into dust, and people and animals were dying of thirst. Seeing this immense suffering, the great sage Agastya traveled all the way to Mount Kailash to pray to Lord Brahma and Lord Shiva for help.

Moved by his intense devotion, Lord Shiva filled Agastya’s kamandalu (a small, sacred water pot) with holy water from the celestial Ganges. Shiva instructed him: "Take this water to the South. Wherever you pour it out with the right intention, a mighty, perennial river will flow to heal the land."

Sage Agastya cradled the sacred pot and began his long trek south. He finally reached the scenic hills of Coorg (in modern-day Karnataka). Exhausted from the journey, he wanted to find a clean, quiet spot to perform his evening prayers (Sandhyavandanam). However, he could not place the holy pot on the ground, as the water would instantly flow right there, and he hadn't yet found the ideal plains for a river.

Looking around, Agastya saw a small, innocent-looking Brahmin boy sitting under a tree. This boy was actually Lord Ganesha in disguise, who had come down to assist the sage in a way he didn't expect.

Agastya walked up to the boy and said, "Child, please hold this pot very carefully while I perform my prayers. Do not put it down under any circumstance." The boy nodded silently and took the pot.

As soon as Agastya turned his back and closed his eyes to meditate, Ganesha looked at the surrounding dry hills. He knew this exact mountainous height was the perfect birthplace for a powerful river to gain momentum and flow across thousands of miles.

Ganesha quietly placed the pot flat on the grass.

At that exact moment, a curious crow flew down and perched right on the rim of the pot. When Agastya opened his eyes and saw the pot on the ground with a crow on it, he rushed forward in a panic, shouting to scare the bird away. The startled crow flapped its wings violently, tipping the pot over.

The holy water spilled out onto the earth. The moment it touched the ground, it didn't just puddle—it transformed into a roaring, thundering, magnificent body of water that sliced through the rocks. This was the birth of the River Cauvery (Kaveri), which immediately brought life, lush greenery, and prosperity back to Southern India.

Sage Agastya was initially furious at the boy. But as he lunged forward, the young Brahmin boy vanished, and the glorious, radiant form of Lord Ganesha appeared in his place, smiling and raising his hand in a blessing. Agastya bowed in deep gratitude, realizing that Ganesha’s quick actions had perfectly fulfilled the divine mission.

The Spiritual Meaning: This story shows that sometimes what looks like an accident or a disruption (the spilled pot) is actually divine intervention putting us on the exact path we need to be on to serve the greater good.`
    },

    {
        title:
            "The Secrets of His Form (The Big Belly and the Tiny Mouse)",
        text:
`Many people wonder why the supreme lord of wisdom is depicted with a massive, round belly (Lambodara) and why a god of his size chooses to ride on a tiny, fragile field mouse (Mushika). Far from being random, these features are highly symbolic spiritual metaphors.

The Mystery of the Big Belly (Lambodara)

Ganesha's large, distended stomach is described as a vast container that holds the entire cosmos. Spiritually, it represents absolute equanimity and the capacity to digest life.

In life, we are constantly bombarded with experiences—some are incredibly joyful, while others are filled with grief, betrayal, or anger. Ganesha’s massive belly teaches us that a wise mind must be able to completely swallow, process, and "digest" both the good and the bad without losing inner peace. He does not vomit out negativity, nor does he let prosperity over-inflate his ego; he keeps it all beautifully balanced within.

The Mystery of the Tiny Mouse (Mushika Vahana)

A mouse is inherently restless, sneaky, and driven by a constant desire to chew on things. It represents the uncontrolled human mind and desire. If left unchecked, a mouse will quietly destroy a household, just like uncontrolled desires and anxieties secretly destroy a person's peace of mind. Furthermore, a mouse operates in total darkness, symbolizing ignorance.

By sitting firmly on top of the mouse, Ganesha demonstrates absolute mastery over the mind and ego. He does not crush or kill the mouse; rather, he tames it, guides it, and uses its sharp senses for a higher divine purpose. It shows that under the weight of supreme intellect and wisdom, worldly desires and a wandering mind are completely brought under control.`
    },

    {
        title:
            "The Mango Trick (Ganesha and Kartikeya's Friendly Rivalry)",
        text:
`While Ganesha and his brother Kartikeya (the general of the divine armies) loved each other deeply, they were very different in nature. Kartikeya was a fierce, physically gifted warrior who valued action, strength, and speed. Ganesha was peaceful, contemplative, and relied entirely on his intellect. Naturally, this led to playful rivalries.

One day, an ancient sage came to Mount Kailash and gifted Goddess Parvati a magnificent, rare mango that smelled of heavenly nectar. The two brothers immediately began to argue over who should get to eat the delicious fruit.

To make it a fun challenge, Parvati smiled and threw a challenge: "The fruit will go to whoever can complete three full rounds around the physical world and return to this spot first."

Kartikeya laughed out loud. He was in peak physical shape, and his mount was a magnificent, lightning-fast peacock. He vaulted onto the peacock's back, zipped through the clouds, and went tearing across the world, flying over continents, oceans, and high mountain ranges, confident that his brother didn't stand a chance.

Meanwhile, Ganesha looked down at his own round belly and his tiny mount—a small, slow-moving field mouse. Ganesha knew he couldn't beat a flying peacock in a footrace.

Instead of panicking, Ganesha calmly sat down under a banyan tree and began to read the holy scriptures. He waited patiently for hours. When he saw his brother's peacock approaching the horizon on his final lap, Ganesha closed his books.

He walked over to where Shiva and Parvati were sitting together on their tiger-skin mat. Ganesha folded his hands, bowed down low with profound love, and walked around his parents in a circle three times.

Just as he finished his third circle, Kartikeya landed, his peacock panting for breath, dusty and exhausted but triumphant. "I have won!" Kartikeya shouted. "The mango is mine!"

Parvati smiled, shook her head gently, and handed the glowing mango to Ganesha.

Kartikeya was furious. "This is unfair! He did not even leave the mountain!"

Ganesha smiled warmly and explained, "Dear brother, the holy scriptures state that one's parents are the source of all life and manifestation. They represent the entire macrocosm. By circling our parents, who are the divine creators of the universe, I have circled the entire world three times over."

Recognizing the undeniable spiritual truth and pure brilliance of his brother's mind, Kartikeya smiled, conceded defeat, and hugged Ganesha.

The Spiritual Meaning: This story shows that the outer physical world is just a reflection of the inner spiritual reality. While hard work and physical exploration are great, deep focus, understanding core truths, and devotion yield the greatest rewards in life.`
    },

    {
        title:
            "The Shield of Parvati (How Ganesha Gained His Elephant Head)",
        text:
`On the snow-capped peak of Mount Kailash, Goddess Parvati often found herself alone while her husband, Lord Shiva, meditated for years in the deep wilderness. One afternoon, wanting to take a ritual bath in her private chambers, she realized she had no loyal guard to watch her doors. Shiva’s celestial attendants, the Ganas, were deeply devoted to Shiva and would often let him enter the palace whenever he pleased, interrupting her privacy.

Determined to create a guard loyal only to her, Parvati gathered the divine turmeric paste from her own body, molded it into the shape of a handsome young boy, and breathed life into him.

"You are my son," Parvati said affectionately. "Guard my door and let absolutely no one enter until I am finished."

The boy bowed, holding a staff, fiercely determined to obey his mother.

A short while later, Lord Shiva returned from his long meditation. He walked toward the palace doors as he always did, but was suddenly blocked by the young boy.

"Stop," the boy said firmly. "No one enters my mother's chambers without her permission."

Shiva looked at the boy in astonishment. "Do you know who I am? I am Shiva, the master of this house, and Parvati is my wife. Move aside." But the boy refused to budge.

Shiva ordered his fierce army, the Ganas, to remove the boy. However, powered by Goddess Parvati's divine energy, the young boy single-handedly fought off the entire celestial army. The conflict escalated into a massive cosmic battle. Seeing a mere boy defeat his forces, Shiva grew incredibly furious. In a flash of divine rage, Shiva unleashed his powerful trident (Trishula) and severed the boy's head, which flew far across the universe.

When Parvati walked out and saw her son lying lifeless in a pool of blood, her grief turned into absolute, world-ending rage. She assumed her terrifying form as Adishakti and threatened to dissolve the entire cosmos into cosmic dust.

Terrified of her wrath, the gods rushed to Shiva, begging him to fix the situation. A remorseful Shiva immediately ordered his followers: "Go to the forest. Bring back the head of the very first living being you find facing north."

The celestial messengers ran out and encountered a powerful mother elephant weeping for her deceased baby. Honoring the divine command, they gently severed the elephant’s head and brought it back to Mount Kailash.

Shiva carefully placed the elephant head onto the boy's body and breathed new life into him. The boy opened his eyes, restored to full health. To appease Parvati and bless the child, Shiva declared, "From this day on, he will be named Ganesha (Lord of the Ganas). He will be the first deity invoked in every prayer, and no venture in the universe will succeed without his blessings."

The Spiritual Meaning: The cutting of the human head represents the destruction of the ego (Ahamkara), which separates us from the divine. Replacing it with an elephant head symbolizes the rebirth of the soul filled with supreme cosmic wisdom, intellect, and humility.`
    },

    {
        title:
            "Saving the Earth from Ravana (The Story of the Atma-Linga)",
        text:
`During the era of the Ramayana, the demon king of Lanka, Ravana, was an intense devotee of Lord Shiva. Through thousands of years of extreme penance, Ravana pleased Shiva, who appeared before him and granted him a boon.

Ravana, desiring ultimate power and immortality, asked for Shiva’s most sacred asset: the Atma-Linga (the soul-lingam of Shiva). This divine stone possessed ultimate power; whoever consecrated it in their kingdom would become completely invincible, and no force in the cosmos could ever defeat them.

Shiva granted the boon and handed over the glowing Atma-Linga, but warned Ravana with a strict cosmic rule: "You must carry this back to Lanka on foot. Wherever you place this Linga down on the earth, it will become permanently rooted to that spot. You will never be able to move it again."

Ravana joyfully accepted the condition and began his journey south toward Lanka.

Up in the heavens, the gods panicked. They knew that if Ravana successfully brought the Atma-Linga to Lanka, his tyranny would destroy the universe. They rushed to Lord Ganesha to intercept the demon king. Ganesha formulated a brilliant plan.

As Ravana approached the coastal town of Gokarna (in modern-day Karnataka), the sun began to set. Ganesha called upon Lord Varuna (the god of oceans) to enter Ravana's stomach. Suddenly, Ravana felt an overwhelming, uncontrollable urge to relieve himself.

However, he could not hold the Atma-Linga while doing so, nor could he place it on the ground, remembering Shiva’s warning.

Just then, Ganesha appeared before Ravana, disguised as a innocent, simple cowherd boy. Ravana, relieved to see someone, called out, "Boy! Come here. Hold this sacred stone for me while I attend to nature's call. Do not put it down!"

The young boy (Ganesha) looked at the heavy stone and said, "It looks far too heavy for me. I will hold it, but if my hands start hurting, I will call your name three times. If you do not return by the third call, I will put it down." Ravana agreed, thinking he would be quick.

As soon as Ravana walked a distance away, Ganesha rapidly called out his name: "Ravana! Ravana! Ravana!"

Before the shocked demon king could run back, Ganesha smiled and placed the Atma-Linga firmly onto the ground. The stone instantly sank into the earth, anchoring itself deeply.

Ravana rushed over in a furious rage and tried to lift the Linga with all his twenty hands. He pulled so hard that he distorted the shape of the stone (making it look like a cow's ear, giving the town its name Gokarna), but it wouldn't budge even an inch. Realizing he had been tricked, Ravana looked at the cowherd boy, who transformed back into the glorious form of Lord Ganesha. Ravana bowed in defeat, recognizing that the universe had been saved from his ego.

The Spiritual Meaning: This story shows Ganesha as the ultimate protector of cosmic balance. It emphasizes that raw power and intelligence (Ravana) will always fail if they are driven by evil intentions, while divine intellect (Ganesha) always protects the righteous path.`
    },

    {
        title:
            "The Race for the Cosmic Fruit (The Triumph of Intellect over Speed)",
        text:
`One afternoon in the heavenly realm of Mount Kailash, the divine sage Narada Muni arrived with a magnificent, glowing golden mango known as the Jnana Phala (the Fruit of Knowledge). This was no ordinary fruit; it contained the absolute nectar of supreme wisdom and spiritual enlightenment.

Narada offered the fruit to Lord Shiva and Goddess Parvati. However, there was a catch: the fruit could not be cut or shared. It had to be consumed whole by one person. Shiva and Parvati looked at their two young sons, Ganesha and Kartikeya (Murugan), and faced a dilemma. Both boys wanted the fruit.

To settle the matter fairly, Lord Shiva announced a cosmic race. "Whoever circles the entire universe three times and returns to Mount Kailash first will win the Jnana Phala," Shiva declared.

Hearing the terms, Kartikeya smiled confidently. His vahana (vehicle) was a swift, magnificent peacock. Without wasting a single second, Kartikeya leaped onto his peacock and rocketed into the cosmos, soaring past stars, planets, and galaxies at lightning speed, determined to win.

Meanwhile, Ganesha stood quietly, looking down at his own vahana—a tiny, slow-moving mouse. Ganesha knew that physically racing his brother across the cosmos was an impossible task. He closed his eyes and reflected deeply.

Instead of running, Ganesha calmly walked over to his parents, Shiva and Parvati. He asked them to sit close together. With deep reverence, Ganesha folded his hands, bowed, and walked around his parents three times in a clockwise direction (pradakshina).

As he finished his third lap, Kartikeya returned, panting and triumphant from his exhausting journey across the universe. He claimed the fruit. But Lord Shiva stopped him and turned to Ganesha, asking, "My son, why did you not circle the universe?"

Ganesha replied with a calm smile, "My parents are the source of all creation. Within you resides the entire cosmos. By circling my mother and father, I have circled the entire universe three times."

Deeply moved by Ganesha’s profound wisdom and devotion, Shiva and Parvati proudly handed him the Jnana Phala.

The Spiritual Meaning: This story teaches that while outer speed and worldly exploration (represented by Kartikeya) are impressive, inner wisdom and understanding the core truth of life (represented by Ganesha) are far superior. It also highlights the supreme status given to parents in Indian culture.`
    },

    {
        title:
            "The Broken Tusk (The Writing of the Mahabharata)",
        text:
`When the great sage Ved Vyasa conceived the epic Mahabharata—the longest poem ever written, containing over 100,000 verses—he realized the task of writing it down was too monumental for a mortal mind. He needed a scribe who could match the blistering speed of his thoughts and understand the deep philosophical layers of the text. He prayed to Lord Brahma, who suggested that only Lord Ganesha possessed the intellect required for the task.

Vyasa approached Ganesha, who graciously agreed to help, but laid down a strict condition to test the sage: "I will write for you, but my pen must never stop. The moment you pause in your dictation, I will stop writing and walk away."

Vyasa, equally clever, accepted the condition but added a counter-condition of his own: "I agree, but you must promise that you will not write down any verse until you fully understand its deepest meaning." Ganesha smiled and agreed.

The writing began at an incredible pace. Vyasa dictated brilliant verses, and Ganesha’s pen flew across the palm leaves. Whenever Vyasa needed a moment to rest or compose the next chapter, he would purposely dictate an incredibly complex, highly philosophical verse with multiple layers of hidden meaning. Ganesha would be forced to pause, dive deep into mental contemplation to decode the verse, and during those few seconds, Vyasa would formulate his next set of verses.

As the days turned into weeks, the pace became furious. Suddenly, disaster struck. The enormous pressure and speed caused Ganesha’s reed pen to snap in half.

True to his word, Ganesha could not pause the writing. Without a moment's hesitation, he reached up, broke off his own right tusk, dipped the pointed, bloody end into ink, and continued writing without missing a single syllable.

Through this supreme sacrifice, the entire Mahabharata was successfully recorded for humanity. Ganesha became known as Ekadanta (The One-Tusked God).

The Spiritual Meaning: Ganesha breaking his own tusk symbolizes that no sacrifice is too great for the pursuit of knowledge, art, and duty (Dharma). It also represents moving beyond physical beauty and dualities (the pair of tusks) to achieve single-minded concentration (Ekagra).`
    },

    {
        title:
            "The Curse of the Moon (Conquering the Ego)",
        text:
`Lord Ganesha is famously fond of sweets, especially modaks. On one Vinayaka Chaturthi night, Ganesha attended a grand feast where he ate an enormous amount of modaks. With his belly completely full, he climbed onto his tiny mouse to ride back to his heavenly abode.

As they walked through the quiet forest, a large snake suddenly slithered across the path. The tiny mouse panicked and tripped, causing Ganesha to tumble to the ground. Because his stomach was so full, the impact caused his belly to burst open, and all the modaks spilled out.

Undeterred and completely calm, Ganesha gathered the sweets, put them back into his belly, caught the snake, and tied it around his waist like a belt to secure his stomach.

Watching this clumsy incident from high up in the starry night sky was Chandra Dev (the Moon God). Chandra was exceptionally handsome and notoriously proud of his glowing, flawless appearance. Seeing Ganesha fall and tie a snake around his belly, the Moon broke into arrogant, mocking laughter, loudly ridiculing Ganesha’s portly shape.

Ganesha, who represents humility and universal balance, grew furious at the Moon’s vanity and cruel ego. To teach him a lesson, Ganesha opened his third eye and hurled a curse upon the Moon: "Chandra! You are so proud of your beauty that you mock others. From this moment on, your glowing light will vanish. You will become completely dark, and anyone who looks at you on the night of Vinayaka Chaturthi will face false accusations and ruin."

Instantly, the universe plunged into darkness. The Moon lost his radiant glow and realized his grave mistake. Stripped of his beauty and pride, Chandra rushed down to earth, fell at Ganesha’s feet, and begged for forgiveness, performing intense penance.

Seeing the Moon's genuine repentance and the distress of the universe, Ganesha’s anger melted into compassion. However, a divine curse could not be entirely taken back; it could only be modified.

Ganesha softened the curse, declaring: "You shall never retain your full form permanently. Instead, you will wax and wane. You will fade away into darkness over fifteen days (Amavasya), and then gradually grow back over the next fifteen days to regain your full glory (Purnima)."

The Spiritual Meaning: The Moon represents the human mind and ego, which fluctuates based on pride. Ganesha’s curse symbolizes the destruction of arrogance. To this day, traditional Hindus avoid looking at the moon on the night of Ganesh Chaturthi to remind themselves not to succumb to superficial vanity.`
    },

    {
        title:
            "Outsmarting the Demon of Pride (The Story of Kubera’s Feast)",
        text:
`Kubera, the god of wealth and the treasurer of the heavens, lived in Alakapuri—a city built entirely of gold, diamonds, and precious gems. Over time, Kubera’s immense wealth filled him with blinding arrogance. He began to believe that he was more powerful than the gods themselves, and he wanted a way to show off his fortune.

Kubera decided to host a massive, unparalleled feast for all the deities. He traveled to Mount Kailash to personally invite Lord Shiva and Goddess Parvati.

Shiva, who lives a simple, ascetic life on the snowy peaks, instantly saw through Kubera's vanity. Smiling gently, Shiva said, "O Kubera, I am a simple hermit and do not leave my mountain. But your invitation shouldn't go to waste. You may take my young son, Ganesha, as the guest of honor. Just ensure you feed him well."

Kubera laughed inside, thinking, "How much can a little boy eat?" He proudly promised to satisfy Ganesha’s appetite and escorted the young god to his golden palace.

When they arrived, Ganesha was seated at a massive dining table. The feast began, and servants brought out mountains of exotic rice, sweets, vegetables, and delicacies. Ganesha started eating. He ate quickly and joyfully. Within minutes, the first round of food vanished.

Kubera ordered more. The second batch vanished just as fast. Ganesha’s appetite seemed bottomless. Soon, the palace kitchens ran completely out of food. Kubera frantically ordered his servants to fetch raw grain, vegetables, and rice from the royal granaries, cooking them at lightning speed. Ganesha ate the raw supplies straight from the bags.

Before long, all the food in the entire kingdom of Alakapuri was completely gone.

Ganesha looked at the trembling Kubera and said, "I am still starving, Kubera! Is this all the wealth you bragged about? If you cannot give me food, I will start eating your palace."

True to his word, Ganesha began chewing on the golden plates, the gem-studded chairs, and the pillars of the palace. Terrified that his entire empire would be devoured, a humbled Kubera ran all the way back to Mount Kailash, threw himself at Shiva’s feet, and begged for mercy.

Shiva smiled and handed Kubera a tiny handful of roasted puffed rice (poha), cooked by Goddess Parvati with love and humility. "Go," Shiva said. "Feed him this with a pure heart."

Kubera rushed back and offered the small bowl of puffed rice to Ganesha with deep humility, apologizing for his pride. Ganesha took a single bite of the rice. Instantly, his hunger was satisfied. He smiled, blessed Kubera, and taught him that a grain offered with love outweighs a mountain of food offered with pride.

The Spiritual Meaning: Ganesha represents the cosmic consumer. He shows that spiritual fulfillment cannot be achieved through material hoarding or ego (Kubera's wealth), but through simple, pure devotion (Parvati's puffed rice).`
    }

];

/* ============================================================
   MANTRAS
============================================================ */

const mantras = [

    {
        title: "గణపతిమాలామంత్రాః",
        text:
`ఓం క్లీం హ్రీం శ్రీం ఐం గ్లౌం ఓం హ్రీం క్రౌం గం ఓం నమో భగవతే
మహాగణపతయే స్మరణమాత్రసంతుష్టాయ సర్వవిద్యాప్రకాశాయ
సర్వకామప్రదాయ భవబంధవిమోచనాయ హ్రీం సర్వభూతబంధనాయ
క్షీం సాధ్యాకర్షణాయ క్లీం జగత్రయ వశీకరణాయ సౌః
సర్వమనఃక్షోభణాయ శ్రీం మహాసంపత్ ప్రదాయ గ్లౌం
భూమండలాధిపత్యప్రదాయ మహాజ్ఞానప్రదాయ చిదానందాత్మనే
గౌరీనందనాయ మహాయోగినే శివప్రియాయ సర్వానందవర్ధనాయ
సర్వవిద్యాప్రకాశనప్రదాయ ద్రాం చిరంజీవినే బూం సమ్మోహనాయ
ఓం మోక్షప్రదాయ ఫట్ వశీకురు వశీకురు వౌషడాకర్షణాయ
హుం విద్వేషణాయ విద్వేషయ విద్వేషయ ఫట్ ఉచ్చాటయ ఉచ్చాటయ
ఈః స్తంభయ స్తంభయ ఖేం ఖేం మారయ మారయ శోషయ శోషయ
పరమంత్రయంత్రతంత్రాణి ఛేదయ ఛేదయ దుష్టగ్రహాన్నివారయ
నివారయ దుఃఖం హర హర వ్యాధిం నాశయ నాశయ నమః
సంపన్నాయ సంపన్నాయ స్వాహా సర్వపల్లవస్వరూపాయ మహావిద్యాయ గం
గణపతయే స్వాహా।
యన్మంత్రే క్షితిలాంఛితాభమనఘం మృత్యుశ్చ వజ్రాశిషో
భూతప్రేతపిశాచకాః ప్రతిహతా నిర్హాతపాతాదివ
ఉత్పన్నం చ సమస్తదుఃఖదురితం హ్యుచ్చాటనోచ్చాటకం
వందేఽభీష్టగణాధిపం భయహరం విఘ్నాఘనాశం పరం।
ఓం గం గణపతయే నమః।
(వనదుర్గోపనిషది)`
    },

    {
        title: "శ్రీ లక్ష్మీ గణపతి స్తోత్రం",
        text:
`ఓం నమో విఘ్న రాజాయ సర్వ సౌఖ్య ప్రదాయినే
దుష్టారిష్ట వినాశాయ పరాయ పరమాత్మనే।
లంబోదరం మహావీర్యం నాగ యజ్ఞోప శోభితం
అర్థచంద్రధరం దేవం విఘ్నవ్యూహ వినాశనం।
ఓం హ్రాం హ్రీం హ్రూం ఫట్ హ్రైం హ్రౌం హః హేరంబాయ నమో నమః।
స్వసిద్ధి ప్రదోऽసి త్వం సిద్ధి బుద్ధి ప్రదో భవ
చింతితార్థ ప్రదస్త్వం హి సతతం మోదక ప్రియ।
సింధూరారుణ వస్త్రైశ్చ పూజితో వరదాయక
ఇదం గణపతి స్తోత్రం యః పఠేత్ భక్తిమాన్ నరః।
తస్య దేహం చ గేహం చ స్వయం లక్ష్మీర్నముంచతి।
ఇతి శ్రీ లక్ష్మీ గణపతి స్తోత్రం సంపూర్ణం।
ఫలం: ఈ స్తోత్ర పారాయణం వలన ఆరోగ్య సిద్ధి, ధనప్రాప్తి కలుగును.`
    },

    {
        title: "మహా గణపతి రక్షా మంత్రం",
        text:
`ఓం నమో భగవతే గ్లౌం మహాగణపతయే
సింధూర రంజితాయ పుండ్రేక్షు గధా శూల పరశు పాశాంకుశ ధరాయ
ఓం శ్రీం హ్రీం క్లీం సర్వ జన సంరక్షకాయ సర్వ లక్ష్మీ ప్రదాయ
సర్వ లోక వశీకరణాయ।
క్రోం క్రోం క్రోం అరి అరి అరి
క్లీం క్లీం క్లీం పాశాంకుశాభ్యాం సకల రాజమండలం
మమ వశమానయ వశమానయ।
క్లీం క్లీం క్లీం సకల విషాది నివారణం కురు కురు
రం రం రం హ్రాం హ్రీం హ్రూం క్షం
సకల భూత ప్రేత పిశాచ బ్రహ్మరాక్షస యక్షిణీ మోహినీ శూలినీ
చతుష్పృష్టి యోగిన్యాది సకల భేతాళ గ్రహ శాకినీ డాకినీ విధ్వంసనం
కురు కురు।
ఫ్రోం ఫ్రోం ఫ్రోం సకల చోర భయం నివారయ నివారయ
ఠం ఠం ఠం శత్రు మండలం స్తంభయ స్తంభయ
గ్లౌం గ్లౌం గ్లౌం సకల విఘ్నాన్ విధ్వంసయ విధ్వంసయ।
సౌం శ్రీం మమ మనోరథం సాధయ సాధయ।
ఓం శ్రీం హ్రీం క్లీం శ్రీ మహాగణపతయే హుం ఫట్ స్వాహా॥`
    },

    {
        title: "గణపతి మంత్రము",
        text:
`ఓం గణానాం త్వా గణపతిం హవామహే
కవిం కవీనాముపమశ్రవస్తమమ్।
జ్యేష్ఠరాజం బ్రహ్మణాం బ్రహ్మణస్పత
ఆ నః శృణ్వన్నూతిభిః సీద సాదనమ్।
మహాగణపతయే నమః॥
ఓం॥

యజుర్వేదంలో ఉన్న గణపతి మంత్రం ఇది.
సర్వ విఘ్నాలనూ శాంతింపజేయగల శక్తివంతుడయిన వినాయకుడిని పూజించకుండా ఏ పని ప్రారంభించం. చిన్నా పెద్దా అన్ని పనులకూ ముందుగా స్మరించేదీ, సేవించేదీ ఆ గణనాధుడినే. ఆయన కృపా కటాక్షాలను అర్థిస్తూ చేసే ఈ ప్రార్థనకు అర్థం...
దేవగణాలకు అధిపతిగా, గణపతిగా పేరు తెచ్చుకున్న నిన్ను కీర్తిస్తూ ఆహ్వానిస్తున్నాము స్వామీ! నువ్వు మేధావులలో మేటివి. సాటిలేని ఖ్యాతి గడించిన వాడివి. ముఖ్యులైన వారిలో అతి ప్రధానుడవు. శ్రేష్ఠులైన వారిలో అందరికంటే శ్రేష్ఠుడవు. వేదాలకు వేదనాయకుడవు కూడా నీవే! మా మొర ఆలకించి సత్వరం వచ్చి మమ్మల్ని కటాక్షించు తండ్రీ! మహాగణపతివైన నీకు నమస్కారం!`
    },

    {
        title: "వక్రతుండ మహాకాయ శ్లోకం",
        text:
`వక్రతుండ మహాకాయ
కోటిసూర్యసమప్రభ |
నిర్విఘ్నం కురు మే దేవ
సర్వకార్యేషు సర్వదా ||`
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
వక్రతుండాయ ధీమహి |
తన్నో దంతి ప్రచోదయాత్ ||`
    },

    {
        title: "శుక్లాంబరధరం విష్ణుం శ్లోకం",
        text:
`శుక్లాంబరధరం విష్ణుం శశివర్ణం చతుర్భుజం |ప్రసన్నవదనం ధ్యాయేత్సర్వవిఘ్నోపశాంతయే ||`
    },

    {
        title: "గజాననం శ్లోకం",
        text:
`గజాననం భూతగణాది సేవితం
కపిత్థజంబూఫలసార భక్షితమ్ |
ఉమాసుతం శోకవినాశకారణం
నమామి విఘ్నేశ్వర పాదపంకజమ్ ||`
    }

];

/* ============================================================
   GLIMPSES
============================================================ */

const glimpses = [
    {
        image: "images/ganesha.png",
        title: "Divine Ganesha",
        caption: "A beautiful divine presence of Lord Ganesha."
    },
    {
        image: "images/ganesha1.jpg",
        title: "Ganesha Glimpse 1",
        caption: "A sacred glimpse from Scan Ganesha."
    },
    {
        image: "images/ganesha2.jpg",
        title: "Ganesha Glimpse 2",
        caption: "Blessings, devotion and celebration."
    },
    {
        image: "images/ganesha3.jpg",
        title: "Ganesha Glimpse 3",
        caption: "A peaceful moment with Vighnaharta."
    },
    {
        image: "images/ganesha4.jpg",
        title: "Ganesha Glimpse 4",
        caption: "Celebrating Vinayaka with devotion."
    },
    {
        image: "images/ganesha5.jpg",
        title: "Ganesha Glimpse 5",
        caption: "A beautiful devotional memory."
    },
    {
        image: "images/ganesha6.jpg",
        title: "Ganesha Glimpse 6",
        caption: "May wisdom and happiness always remain."
    },
    {
        image: "images/ganesha7.jpg",
        title: "Ganesha Glimpse 7",
        caption: "Ganapati Bappa Morya."
    },
    {
        image: "images/ganesha8.jpg",
        title: "Ganesha Glimpse 8",
        caption: "A divine festive glimpse."
    },
    {
        image: "images/ganesha9.jpg",
        title: "Ganesha Glimpse 9",
        caption: "Blessings for every new beginning."
    },
    {
        image: "images/ganesha10.jpg",
        title: "Ganesha Glimpse 10",
        caption: "May Lord Ganesha remove every obstacle."
    }
];

/* ============================================================
   SAFE HTML
============================================================ */

function escapeHTML(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

/* ============================================================
   INITIALIZATION
============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupParticipantForm();
        loadParticipantName();

        renderStories();
        renderMantras();
        renderMusic();
        renderGallery();

        updateChantUI();
        updateParticipantNames();

        setupMenu();
        setupKeyboardNavigation();
        setupFloatingPetals();

        loadEcoState();
        updateJourneyProgress();

        initializeQR();

        setupFirebaseAuth();

        updatePuzzleName();
        updateFinalPage();

        const startButton =
            document.getElementById(
                "startPuzzleBtn"
            );

        if (startButton) {

            startButton.addEventListener(
                "click",
                () => {
                    startGaneshaPuzzle();
                }
            );
        }

        const initialHash =
            window.location.hash.replace(
                "#",
                ""
            );

        if (
            initialHash &&
            document.getElementById(
                initialHash
            )
        ) {

            showPage(initialHash);

        } else {

            showPage("frontPage");
        }

    }
);

/* ============================================================
   FIREBASE
============================================================ */

async function setupFirebaseAuth() {

    if (
        !window.firebaseReady ||
        !window.firebaseAuth
    ) {
        return;
    }

    firebaseAuth =
        window.firebaseAuth;

    firebaseDB =
        window.firebaseDB;

    try {

        if (!firebaseAuth.currentUser) {

            await firebaseAuth
                .signInAnonymously();
        }

        currentParticipantUID =
            firebaseAuth.currentUser
                ? firebaseAuth.currentUser.uid
                : null;

        updatePuzzleImageAssignment();

    } catch (error) {

        console.error(
            "Firebase authentication error:",
            error
        );

        currentParticipantUID =
            null;

        updatePuzzleImageAssignment();
    }
}

async function ensureFirebaseUser() {

    if (
        !window.firebaseReady ||
        !window.firebaseAuth
    ) {
        return null;
    }

    firebaseAuth =
        window.firebaseAuth;

    firebaseDB =
        window.firebaseDB;

    try {

        if (!firebaseAuth.currentUser) {

            await firebaseAuth
                .signInAnonymously();
        }

        currentParticipantUID =
            firebaseAuth.currentUser
                ? firebaseAuth.currentUser.uid
                : null;

        updatePuzzleImageAssignment();

        return firebaseAuth.currentUser;

    } catch (error) {

        console.error(
            "Firebase user error:",
            error
        );

        return null;
    }
}

/* ============================================================
   PAGE NAVIGATION
============================================================ */

function showPage(pageId) {

    document
        .querySelectorAll(".page")
        .forEach(
            page => {
                page.classList.remove(
                    "active"
                );
            }
        );

    const target =
        document.getElementById(
            pageId
        );

    if (!target) {
        return;
    }

    target.classList.add(
        "active"
    );

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    closeMenu();

    handlePageOpen(pageId);

    if (
        pageId !== "frontPage" &&
        pageId !== "loginPage" &&
        pageId !== "wishPage"
    ) {

        history.replaceState(
            null,
            "",
            "#" + pageId
        );
    }
}

function handlePageOpen(pageId) {

    const featureMap = {
        aboutPage: "about",
        storiesPage: "stories",
        mantraPage: "mantras",
        galleryPage: "gallery",
        musicPage: "music",
        gamesPage: "puzzle",
        leaderboardPage: "leaderboard",
        ecoPage: "eco",
        csPage: "cs",
        qrPage: "qr",
        finalPage: "final"
    };

    if (
        featureMap[pageId]
    ) {

        exploredFeatures.add(
            featureMap[pageId]
        );

        localStorage.setItem(
            "scanGaneshaExploredFeatures",
            JSON.stringify(
                Array.from(
                    exploredFeatures
                )
            )
        );

        updateJourneyProgress();
    }

    if (
        pageId ===
        "leaderboardPage"
    ) {

        loadPuzzleLeaderboard();
    }

    if (
        pageId ===
        "finalPage"
    ) {

        updateFinalPage();
    }
}

/* ============================================================
   PARTICIPANT FLOW
   BAL GANESHA -> NAME -> DIVINE ENTRY -> HOME
============================================================ */

function setupParticipantForm() {

    const form =
        document.getElementById(
            "participantForm"
        );

    if (!form) {
        return;
    }

    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            const input =
                document.getElementById(
                    "participantName"
                );

            if (!input) {
                return;
            }

            const name =
                input.value.trim();

            if (!name) {

                input.focus();

                return;
            }

            currentParticipantName =
                name.substring(
                    0,
                    60
                );

            localStorage.setItem(
                "scanGaneshaParticipantName",
                currentParticipantName
            );

            updateParticipantNames();

            await saveParticipant();

            showPage(
                "wishPage"
            );
        }
    );
}

function loadParticipantName() {

    const stored =
        localStorage.getItem(
            "scanGaneshaParticipantName"
        );

    if (stored) {

        currentParticipantName =
            stored;
    }

    updateParticipantNames();
}

function updateParticipantNames() {

    const ids = [
        "wishUserName",
        "homeUserName",
        "puzzleIntroName",
        "puzzlePlayerName",
        "finalUserName"
    ];

    ids.forEach(
        id => {

            const element =
                document.getElementById(
                    id
                );

            if (element) {

                element.textContent =
                    currentParticipantName;
            }
        }
    );
}

async function saveParticipant() {

    try {

        const user =
            await ensureFirebaseUser();

        if (
            !user ||
            !firebaseDB
        ) {
            return;
        }

        await firebaseDB
            .collection(
                "participants"
            )
            .doc(
                user.uid
            )
            .set(
                {
                    uid:
                        user.uid,

                    name:
                        currentParticipantName,

                    updatedAt:
                        firebase.firestore
                            .FieldValue
                            .serverTimestamp()
                },
                {
                    merge:
                        true
                }
            );

    } catch (error) {

        console.error(
            "Participant save error:",
            error
        );
    }
}

/* ============================================================
   STORIES
============================================================ */

function renderStories() {

    renderStory(
        currentStoryIndex
    );
}

function renderStory(index) {

    const container =
        document.getElementById(
            "storiesContainer"
        );

    if (!container) {
        return;
    }

    currentStoryIndex =
        Math.max(
            0,
            Math.min(
                stories.length - 1,
                index
            )
        );

    const story =
        stories[
            currentStoryIndex
        ];

    const paragraphs =
        story.text
            .split(/\n\n/)
            .map(
                paragraph =>
                    `<p>${escapeHTML(
                        paragraph
                    )}</p>`
            )
            .join("");

    container.innerHTML = `
        <article class="story-card">

            <div class="story-number">
                Chapter ${
                    currentStoryIndex + 1
                }
            </div>

            <h2>
                ${escapeHTML(
                    story.title
                )}
            </h2>

            <div class="story-content">
                ${paragraphs}
            </div>

            <div class="story-blessing">
                🙏 Ganapati Bappa Morya 🙏
            </div>

        </article>
    `;

    updateStoryControls();
}

function nextStory() {

    if (
        currentStoryIndex <
        stories.length - 1
    ) {

        currentStoryIndex++;

        renderStory(
            currentStoryIndex
        );

    } else {

        const message =
            document.getElementById(
                "storyMiniResult"
            );

        if (message) {

            message.textContent =
                "🌺 You completed all 9 divine stories! 🙏";

            setTimeout(
                () => {
                    message.textContent =
                        "";
                },
                4000
            );
        }
    }

    exploredFeatures.add(
        "stories"
    );

    localStorage.setItem(
        "scanGaneshaExploredFeatures",
        JSON.stringify(
            Array.from(
                exploredFeatures
            )
        )
    );

    updateJourneyProgress();
}

function previousStory() {

    if (
        currentStoryIndex >
        0
    ) {

        currentStoryIndex--;

        renderStory(
            currentStoryIndex
        );
    }
}

function updateStoryControls() {

    const prev =
        document.getElementById(
            "storyPrev"
        );

    const next =
        document.getElementById(
            "storyNext"
        );

    const text =
        document.getElementById(
            "storyProgressText"
        );

    const bar =
        document.getElementById(
            "storyProgressBar"
        );

    if (prev) {

        prev.disabled =
            currentStoryIndex === 0;
    }

    if (next) {

        next.textContent =
            currentStoryIndex ===
            stories.length - 1
                ? "Finish Stories ✓"
                : "Next Chapter →";
    }

    if (text) {

        text.textContent =
            `Chapter ${
                currentStoryIndex + 1
            } of ${
                stories.length
            }`;
    }

    if (bar) {

        bar.style.width =
            (
                (
                    currentStoryIndex + 1
                ) /
                stories.length *
                100
            ) + "%";
    }
}

/* ============================================================
   MANTRAS
============================================================ */

function renderMantras() {

    const container =
        document.getElementById(
            "mantraContainer"
        );

    if (!container) {
        return;
    }

    container.innerHTML =
        "";

    mantras.forEach(
        (
            mantra,
            index
        ) => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "mantra-card";

            const formatted =
                escapeHTML(
                    mantra.text
                ).replace(
                    /\n/g,
                    "<br>"
                );

            card.innerHTML = `
                <div class="mantra-number">
                    ${
                        index + 1
                    }
                </div>

                <h2>
                    ${escapeHTML(
                        mantra.title
                    )}
                </h2>

                <div class="mantra-text">
                    ${formatted}
                </div>

                <div class="mantra-actions">

                    <button
                        type="button"
                        class="gold-btn mantra-listen-btn"
                    >
                        🔊 Listen
                    </button>

                    <button
                        type="button"
                        class="outline-btn mantra-stop-btn"
                    >
                        ⏹ Stop
                    </button>

                </div>

                <p class="mantra-status"></p>
            `;

            const listen =
                card.querySelector(
                    ".mantra-listen-btn"
                );

            const stop =
                card.querySelector(
                    ".mantra-stop-btn"
                );

            const status =
                card.querySelector(
                    ".mantra-status"
                );

            listen.addEventListener(
                "click",
                () => {

                    speakMantra(
                        mantra.text,
                        status,
                        listen
                    );
                }
            );

            stop.addEventListener(
                "click",
                () => {

                    stopSpeech();

                    if (status) {

                        status.textContent =
                            "🔇 Speech stopped.";
                    }

                    listen.disabled =
                        false;
                }
            );

            container.appendChild(
                card
            );
        }
    );
}

/* ============================================================
   SPEECH SYNTHESIS
============================================================ */

function speakMantra(
    text,
    statusElement,
    button
) {

    if (
        !(
            "speechSynthesis" in
            window
        )
    ) {

        if (statusElement) {

            statusElement.textContent =
                "Speech is not supported in this browser.";
        }

        return;
    }

    speechSynthesis.cancel();

    const utterance =
        new SpeechSynthesisUtterance(
            text
        );

    utterance.rate =
        0.68;

    utterance.pitch =
        1;

    utterance.volume =
        1;

    const chooseVoice =
        () => {

            const voices =
                speechSynthesis
                    .getVoices();

            let voice =
                voices.find(
                    item =>
                        (
                            item.lang ||
                            ""
                        ).toLowerCase() ===
                        "te-in"
                );

            if (!voice) {

                voice =
                    voices.find(
                        item =>
                            (
                                item.lang ||
                                ""
                            ).toLowerCase()
                                .startsWith(
                                    "te"
                                )
                    );
            }

            if (!voice) {

                voice =
                    voices.find(
                        item =>
                            item.lang ===
                            "en-IN"
                    );
            }

            if (!voice) {

                voice =
                    voices.find(
                        item =>
                            (
                                item.lang ||
                                ""
                            ).toLowerCase()
                                .startsWith(
                                    "en"
                                )
                    );
            }

            if (voice) {

                utterance.voice =
                    voice;
            }
        };

    chooseVoice();

    if (
        speechSynthesis.onvoiceschanged !==
        undefined
    ) {

        speechSynthesis.onvoiceschanged =
            chooseVoice;
    }

    utterance.onstart =
        () => {

            if (statusElement) {

                statusElement.textContent =
                    "🔊 Playing mantra...";
            }

            if (button) {

                button.disabled =
                    true;
            }
        };

    utterance.onend =
        () => {

            if (statusElement) {

                statusElement.textContent =
                    "🙏 Mantra completed.";
            }

            if (button) {

                button.disabled =
                    false;
            }
        };

    utterance.onerror =
        () => {

            if (statusElement) {

                statusElement.textContent =
                    "⚠️ Speech playback could not be started.";
            }

            if (button) {

                button.disabled =
                    false;
            }
        };

    speechSynthesis.speak(
        utterance
    );
}

function stopSpeech() {

    if (
        "speechSynthesis" in
        window
    ) {

        speechSynthesis.cancel();
    }
}

/* ============================================================
   CHANT COUNTER
============================================================ */

function addChant() {

    chantCount++;

    localStorage.setItem(
        "scanGaneshaChantCount",
        String(
            chantCount
        )
    );

    updateChantUI();
    updateFinalPage();

    exploredFeatures.add(
        "mantras"
    );

    localStorage.setItem(
        "scanGaneshaExploredFeatures",
        JSON.stringify(
            Array.from(
                exploredFeatures
            )
        )
    );

    updateJourneyProgress();

    const message =
        document.getElementById(
            "chantMessage"
        );

    if (
        message &&
        [
            1,
            11,
            21,
            51,
            108
        ].includes(
            chantCount
        )
    ) {

        message.textContent =
            `🙏 Beautiful! ${
                chantCount
            } chants completed. May Lord Ganesha bless you.`;

        setTimeout(
            () => {
                message.textContent =
                    "";
            },
            5000
        );
    }
}

function resetChants() {

    chantCount =
        0;

    localStorage.setItem(
        "scanGaneshaChantCount",
        "0"
    );

    updateChantUI();
    updateFinalPage();
}

function updateChantUI() {

    const count =
        document.getElementById(
            "chantCount"
        );

    const progress =
        document.getElementById(
            "chantProgress"
        );

    const finalChants =
        document.getElementById(
            "finalChants"
        );

    if (count) {

        count.textContent =
            chantCount;
    }

    if (finalChants) {

        finalChants.textContent =
            chantCount;
    }

    if (progress) {

        progress.style.width =
            Math.min(
                100,
                chantCount /
                    108 *
                    100
            ) + "%";
    }
}

/* ============================================================
   MUSIC
============================================================ */

function renderMusic() {

    const container =
        document.getElementById(
            "musicContainer"
        );

    if (!container) {
        return;
    }

    container.innerHTML =
        "";

    songs.forEach(
        song => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "music-card";

            card.innerHTML = `
                <div class="music-icon">
                    ${
                        song.icon
                    }
                </div>

                <div class="music-info">

                    <h2>
                        ${escapeHTML(
                            song.title
                        )}
                    </h2>

                    <p>
                        ${escapeHTML(
                            song.subtitle
                        )}
                    </p>

                    <audio
                        class="music-player"
                        controls
                        preload="metadata"
                    >
                        <source
                            src="${song.file}"
                            type="audio/mpeg"
                        >
                    </audio>

                    <p class="music-status"></p>

                </div>
            `;

            const audio =
                card.querySelector(
                    ".music-player"
                );

            const status =
                card.querySelector(
                    ".music-status"
                );

            audio.addEventListener(
                "play",
                () => {

                    stopOtherMusic(
                        audio
                    );

                    if (status) {

                        status.textContent =
                            "🎵 Playing...";
                    }
                }
            );

            audio.addEventListener(
                "pause",
                () => {

                    if (
                        !audio.ended &&
                        status
                    ) {

                        status.textContent =
                            "⏸ Paused";
                    }
                }
            );

            audio.addEventListener(
                "ended",
                () => {

                    if (status) {

                        status.textContent =
                            "🙏 Song completed.";
                    }
                }
            );

            audio.addEventListener(
                "error",
                () => {

                    if (status) {

                        status.textContent =
                            "⚠️ Audio file could not be loaded.";
                    }
                }
            );

            container.appendChild(
                card
            );
        }
    );
}

function stopOtherMusic(
    activeAudio
) {

    document
        .querySelectorAll(
            ".music-player"
        )
        .forEach(
            audio => {

                if (
                    audio !==
                    activeAudio
                ) {

                    audio.pause();
                }
            }
        );
}

/* ============================================================
   GALLERY
============================================================ */

function renderGallery() {

    const container =
        document.getElementById(
            "galleryContainer"
        );

    if (!container) {
        return;
    }

    container.innerHTML =
        "";

    glimpses.forEach(
        (
            item,
            index
        ) => {

            const card =
                document.createElement(
                    "button"
                );

            card.type =
                "button";

            card.className =
                "gallery-card";

            card.innerHTML = `
                <img
                    src="${escapeHTML(
                        item.image
                    )}"
                    alt="${escapeHTML(
                        item.title
                    )}"
                    loading="lazy"
                >

                <div class="gallery-overlay">

                    <strong>
                        ${escapeHTML(
                            item.title
                        )}
                    </strong>

                    <span>
                        View ✨
                    </span>

                </div>
            `;

            card.addEventListener(
                "click",
                () => {
                    openGallery(
                        index
                    );
                }
            );

            container.appendChild(
                card
            );
        }
    );
}

function openGallery(
    index
) {

    currentGalleryIndex =
        Math.max(
            0,
            Math.min(
                glimpses.length - 1,
                index
            )
        );

    const modal =
        document.getElementById(
            "galleryModal"
        );

    if (!modal) {
        return;
    }

    updateGalleryModal();

    modal.classList.add(
        "active"
    );

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );
}

function updateGalleryModal() {

    const item =
        glimpses[
            currentGalleryIndex
        ];

    const image =
        document.getElementById(
            "galleryModalImage"
        );

    const title =
        document.getElementById(
            "galleryModalTitle"
        );

    const caption =
        document.getElementById(
            "galleryModalCaption"
        );

    const counter =
        document.getElementById(
            "galleryModalCounter"
        );

    if (image) {

        image.src =
            item.image;

        image.alt =
            item.title;
    }

    if (title) {

        title.textContent =
            item.title;
    }

    if (caption) {

        caption.textContent =
            item.caption;
    }

    if (counter) {

        counter.textContent =
            `${
                currentGalleryIndex + 1
            } / ${
                glimpses.length
            }`;
    }
}

function closeGallery() {

    const modal =
        document.getElementById(
            "galleryModal"
        );

    if (!modal) {
        return;
    }

    modal.classList.remove(
        "active"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );
}

function changeGallery(
    direction
) {

    currentGalleryIndex =
        (
            currentGalleryIndex +
            direction +
            glimpses.length
        ) %
        glimpses.length;

    updateGalleryModal();
}

/* ============================================================
   PUZZLE IMAGE ASSIGNMENT
============================================================ */

function getPuzzleImageIndex(
    uid
) {

    if (!uid) {
        return 0;
    }

    let hash = 0;

    for (
        let i = 0;
        i < uid.length;
        i++
    ) {

        hash =
            (
                (
                    hash << 5
                ) -
                hash
            ) +
            uid.charCodeAt(i);

        hash |=
            0;
    }

    return Math.abs(
        hash
    ) %
    puzzleImages.length;
}

function updatePuzzleImageAssignment() {

    puzzleImageIndex =
        getPuzzleImageIndex(
            currentParticipantUID
        );

    puzzleImage =
        puzzleImages[
            puzzleImageIndex
        ];

    const imageNumber =
        document.getElementById(
            "puzzleImageNumber"
        );

    if (imageNumber) {

        imageNumber.textContent =
            `Ganesha Image ${
                puzzleImageIndex + 1
            }`;
    }
}

function updatePuzzleName() {

    updateParticipantNames();
    updatePuzzleImageAssignment();
}

/* ============================================================
   START PUZZLE
============================================================ */

async function startGaneshaPuzzle() {

    await ensureFirebaseUser();

    puzzleMoves =
        0;

    puzzleSelected =
        null;

    puzzleCompleted =
        false;

    updatePuzzleImageAssignment();

    const intro =
        document.getElementById(
            "gameIntro"
        );

    const area =
        document.getElementById(
            "puzzleArea"
        );

    const result =
        document.getElementById(
            "puzzleResult"
        );

    const moves =
        document.getElementById(
            "puzzleMoves"
        );

    const score =
        document.getElementById(
            "puzzleLiveScore"
        );

    const hint =
        document.getElementById(
            "puzzleHint"
        );

    if (intro) {

        intro.hidden =
            true;
    }

    if (area) {

        area.hidden =
            false;
    }

    if (result) {

        result.innerHTML =
            "";
    }

    if (moves) {

        moves.textContent =
            "0";
    }

    if (score) {

        score.textContent =
            "1000";
    }

    if (hint) {

        hint.textContent =
            "Select two pieces to swap them.";
    }

    exploredFeatures.add(
        "puzzle"
    );

    localStorage.setItem(
        "scanGaneshaExploredFeatures",
        JSON.stringify(
            Array.from(
                exploredFeatures
            )
        )
    );

    updateJourneyProgress();

    createPuzzle();
    startPuzzleTimer();
}

/* ============================================================
   CREATE PUZZLE
============================================================ */

function createPuzzle() {

    puzzleTiles = [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
    ];

    do {

        puzzleTiles =
            shufflePuzzle(
                puzzleTiles
            );

    } while (
        puzzleTiles.every(
            (
                value,
                index
            ) =>
                value ===
                index
        )
    );

    renderPuzzle();
}

/* ============================================================
   SHUFFLE
============================================================ */

function shufflePuzzle(
    array
) {

    const result =
        [
            ...array
        ];

    for (
        let i =
            result.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );

        [
            result[i],
            result[j]
        ] =
        [
            result[j],
            result[i]
        ];
    }

    return result;
}

/* ============================================================
   RENDER PUZZLE
============================================================ */

function renderPuzzle() {

    const board =
        document.getElementById(
            "puzzleBoard"
        );

    if (!board) {
        return;
    }

    board.innerHTML =
        "";

    puzzleTiles.forEach(
        (
            tileNumber,
            position
        ) => {

            const tile =
                document.createElement(
                    "button"
                );

            tile.type =
                "button";

            tile.className =
                "puzzle-piece";

            const row =
                Math.floor(
                    tileNumber /
                    3
                );

            const column =
                tileNumber %
                3;

            tile.style.backgroundImage =
                `url("${puzzleImage}")`;

            tile.style.backgroundSize =
                "300% 300%";

            tile.style.backgroundRepeat =
                "no-repeat";

            tile.style.backgroundPosition =
                `${column * 50}% ${
                    row * 50
                }%`;

            tile.setAttribute(
                "aria-label",
                `Puzzle piece ${
                    tileNumber + 1
                }`
            );

            tile.addEventListener(
                "click",
                () => {

                    selectPuzzlePiece(
                        position,
                        tile
                    );
                }
            );

            board.appendChild(
                tile
            );
        }
    );
}

/* ============================================================
   SELECT PUZZLE PIECE
============================================================ */

function selectPuzzlePiece(
    position,
    tile
) {

    if (puzzleCompleted) {
        return;
    }

    if (
        puzzleSelected ===
        null
    ) {

        puzzleSelected =
            position;

        tile.classList.add(
            "selected"
        );

        const hint =
            document.getElementById(
                "puzzleHint"
            );

        if (hint) {

            hint.textContent =
                "✨ Select another piece to swap.";
        }

        return;
    }

    if (
        puzzleSelected ===
        position
    ) {

        puzzleSelected =
            null;

        renderPuzzle();

        return;
    }

    swapPuzzlePieces(
        puzzleSelected,
        position
    );
}

/* ============================================================
   SWAP PUZZLE PIECES
============================================================ */

function swapPuzzlePieces(
    first,
    second
) {

    const temp =
        puzzleTiles[first];

    puzzleTiles[first] =
        puzzleTiles[second];

    puzzleTiles[second] =
        temp;

    puzzleMoves++;

    puzzleSelected =
        null;

    renderPuzzle();
    updatePuzzleStats();

    if (
        puzzleTiles.every(
            (
                value,
                index
            ) =>
                value ===
                index
        )
    ) {

        finishPuzzle();

    } else {

        const hint =
            document.getElementById(
                "puzzleHint"
            );

        if (hint) {

            hint.textContent =
                "Good move! Keep going. 🙏";
        }
    }
}

/* ============================================================
   PUZZLE STATS
============================================================ */

function updatePuzzleStats() {

    const moves =
        document.getElementById(
            "puzzleMoves"
        );

    if (moves) {

        moves.textContent =
            puzzleMoves;
    }

    updatePuzzleScore();
}

function getCurrentPuzzleScore() {

    const elapsed =
        puzzleStartTime
            ? Math.floor(
                (
                    Date.now() -
                    puzzleStartTime
                ) / 1000
            )
            : 0;

    return Math.max(
        100,
        1000 -
        elapsed * 3 -
        puzzleMoves * 8
    );
}

function updatePuzzleScore() {

    const score =
        document.getElementById(
            "puzzleLiveScore"
        );

    if (!score) {
        return;
    }

    score.textContent =
        getCurrentPuzzleScore();
}

/* ============================================================
   TIMER
============================================================ */

function startPuzzleTimer() {

    stopPuzzleTimer();

    puzzleStartTime =
        Date.now();

    puzzleTimerInterval =
        setInterval(
            updatePuzzleTimer,
            1000
        );

    updatePuzzleTimer();
}

function stopPuzzleTimer() {

    if (
        puzzleTimerInterval
    ) {

        clearInterval(
            puzzleTimerInterval
        );

        puzzleTimerInterval =
            null;
    }
}

function updatePuzzleTimer() {

    if (!puzzleStartTime) {
        return;
    }

    const elapsed =
        Math.floor(
            (
                Date.now() -
                puzzleStartTime
            ) / 1000
        );

    const minutes =
        Math.floor(
            elapsed /
            60
        );

    const seconds =
        elapsed %
        60;

    const timer =
        document.getElementById(
            "puzzleTimer"
        );

    if (timer) {

        timer.textContent =
            `${String(
                minutes
            ).padStart(
                2,
                "0"
            )}:${String(
                seconds
            ).padStart(
                2,
                "0"
            )}`;
    }

    updatePuzzleScore();
}

/* ============================================================
   FINISH PUZZLE
============================================================ */

async function finishPuzzle() {

    if (puzzleCompleted) {
        return;
    }

    puzzleCompleted =
        true;

    stopPuzzleTimer();

    const elapsed =
        Math.floor(
            (
                Date.now() -
                puzzleStartTime
            ) / 1000
        );

    const finalScore =
        Math.max(
            100,
            1000 -
            elapsed * 3 -
            puzzleMoves * 8
        );

    const minutes =
        Math.floor(
            elapsed /
            60
        );

    const seconds =
        elapsed %
        60;

    const timeText =
        `${String(
            minutes
        ).padStart(
            2,
            "0"
        )}:${String(
            seconds
        ).padStart(
            2,
            "0"
        )}`;

    const scoreData = {
        name:
            currentParticipantName,

        uid:
            currentParticipantUID ||
            "local-user",

        score:
            finalScore,

        time:
            timeText,

        timeSeconds:
            elapsed,

        moves:
            puzzleMoves,

        image:
            puzzleImage,

        imageIndex:
            puzzleImageIndex,

        createdAt:
            Date.now()
    };

    localStorage.setItem(
        "scanGaneshaLastPuzzleScore",
        String(
            finalScore
        )
    );

    localStorage.setItem(
        "scanGaneshaLastPuzzleTime",
        String(
            elapsed
        )
    );

    localStorage.setItem(
        "scanGaneshaLastPuzzleMoves",
        String(
            puzzleMoves
        )
    );

    const result =
        document.getElementById(
            "puzzleResult"
        );

    if (result) {

        result.innerHTML = `
            <div class="puzzle-success">

                <div class="success-icon">
                    🐘✨
                </div>

                <h2>
                    Puzzle Completed!
                </h2>

                <p>
                    Congratulations,
                    <strong>
                        ${escapeHTML(
                            currentParticipantName
                        )}
                    </strong>
                    🙏
                </p>

                <p>
                    🏆 Score:
                    <strong>
                        ${finalScore}
                    </strong>
                </p>

                <p>
                    ⏱️ Time:
                    <strong>
                        ${timeText}
                    </strong>
                </p>

                <p>
                    🔄 Moves:
                    <strong>
                        ${puzzleMoves}
                    </strong>
                </p>

                <p>
                    Your result has been saved to
                    the Ganesha Puzzle leaderboard.
                </p>

                <button
                    type="button"
                    class="gold-btn"
                    onclick="showPage('leaderboardPage')"
                >
                    🏆 View Leaderboard
                </button>

                <button
                    type="button"
                    class="outline-btn"
                    onclick="restartGaneshaPuzzle()"
                >
                    🔄 Play Again
                </button>

            </div>
        `;
    }

    const hint =
        document.getElementById(
            "puzzleHint"
        );

    if (hint) {

        hint.textContent =
            "🌺 Divine puzzle completed successfully!";
    }

    await savePuzzleScore(
        scoreData
    );

    await loadPuzzleLeaderboard();

    updateFinalPage();
}

/* ============================================================
   RESTART
============================================================ */

function restartGaneshaPuzzle() {

    stopPuzzleTimer();

    puzzleCompleted =
        false;

    puzzleMoves =
        0;

    puzzleSelected =
        null;

    const result =
        document.getElementById(
            "puzzleResult"
        );

    const hint =
        document.getElementById(
            "puzzleHint"
        );

    if (result) {

        result.innerHTML =
            "";
    }

    if (hint) {

        hint.textContent =
            "Select two pieces to swap them.";
    }

    updatePuzzleImageAssignment();

    createPuzzle();
    startPuzzleTimer();
}

/* ============================================================
   FIREBASE SCORE
============================================================ */

/* ============================================================
   FIREBASE SCORE
============================================================ */

async function savePuzzleScore(scoreData) {

    try {

        const user =
            await ensureFirebaseUser();

        if (!user || !firebaseDB) {

            console.error(
                "Firebase is unavailable."
            );

            saveLocalPuzzleScore(scoreData);

            return;
        }

        const playerName =
            String(
                currentParticipantName ||
                "Devotee"
            )
                .trim()
                .substring(0, 30);

        const imagePath =
            String(
                scoreData.image ||
                "images/ganesha.png"
            );

        await firebaseDB
            .collection("puzzleScores")
            .add({

                uid:
                    user.uid,

                name:
                    playerName,

                score:
                    Number(
                        scoreData.score ||
                        0
                    ),

                moves:
                    Number(
                        scoreData.moves ||
                        0
                    ),

                timeSeconds:
                    Number(
                        scoreData.timeSeconds ||
                        0
                    ),

                time:
                    String(
                        scoreData.time ||
                        "00:00"
                    ),

                imageId:
                    imagePath,

                image:
                    imagePath,

                createdAt:
                    firebase.firestore
                        .FieldValue
                        .serverTimestamp()
            });

        currentParticipantUID =
            user.uid;

        console.log(
            "✅ Puzzle score saved"
        );

    } catch (error) {

        console.error(
            "❌ Firebase score save error:",
            error
        );

        saveLocalPuzzleScore(
            scoreData
        );
    }
}


/* ============================================================
   LOCAL BACKUP
============================================================ */

function saveLocalPuzzleScore(scoreData) {

    let scores = [];

    try {

        scores =
            JSON.parse(
                localStorage.getItem(
                    "scanGaneshaPuzzleScores"
                ) || "[]"
            );

    } catch (error) {

        scores = [];
    }

    scores.push(
        scoreData
    );

    scores.sort(
        (a, b) =>
            Number(
                b.score || 0
            ) -
            Number(
                a.score || 0
            )
    );

    localStorage.setItem(
        "scanGaneshaPuzzleScores",
        JSON.stringify(
            scores.slice(
                0,
                50
            )
        )
    );
}


/* ============================================================
   GLOBAL LEADERBOARD
============================================================ */

async function loadPuzzleLeaderboard() {

    const container =
        document.getElementById(
            "puzzleLeaderboardRows"
        );

    if (!container) {
        return;
    }

    container.innerHTML = `
        <p class="leaderboard-loading">
            🏆 Loading all devotees...
        </p>
    `;

    try {

        const user =
            await ensureFirebaseUser();

        if (!user || !firebaseDB) {

            throw new Error(
                "Firebase is unavailable."
            );
        }

        currentParticipantUID =
            user.uid;


        /* ====================================================
           GET ALL PARTICIPANTS
           ==================================================== */

        const participantsSnapshot =
            await firebaseDB
                .collection("participants")
                .get();


        /* ====================================================
           GET ALL PUZZLE SCORES
           ==================================================== */

        const scoresSnapshot =
            await firebaseDB
                .collection("puzzleScores")
                .get();


        /* ====================================================
           STORE BEST SCORE FOR EACH USER
           ==================================================== */

        const scoreMap =
            new Map();

        scoresSnapshot.forEach(
            doc => {

                const data =
                    doc.data() || {};

                const uid =
                    data.uid ||
                    doc.id;

                const score =
                    Number(
                        data.score || 0
                    );

                const oldScore =
                    scoreMap.get(uid);

                if (
                    !oldScore ||
                    score >
                        oldScore.score ||
                    (
                        score ===
                            oldScore.score &&
                        Number(
                            data.timeSeconds ||
                            999999
                        ) <
                            Number(
                                oldScore.timeSeconds ||
                                999999
                            )
                    )
                ) {

                    scoreMap.set(
                        uid,
                        {
                            uid:
                                uid,

                            name:
                                data.name ||
                                "Devotee",

                            score:
                                score,

                            moves:
                                Number(
                                    data.moves ||
                                    0
                                ),

                            time:
                                data.time ||
                                "00:00",

                            timeSeconds:
                                Number(
                                    data.timeSeconds ||
                                    0
                                ),

                            imageId:
                                data.imageId ||
                                data.image ||
                                "images/ganesha.png",

                            played:
                                true
                        }
                    );
                }
            }
        );


        /* ====================================================
           BUILD GLOBAL LIST FROM ALL PARTICIPANTS
           ==================================================== */

        const leaderboard =
            [];

        participantsSnapshot.forEach(
            doc => {

                const data =
                    doc.data() || {};

                const uid =
                    doc.id;

                const existingScore =
                    scoreMap.get(uid);

                leaderboard.push({

                    uid:
                        uid,

                    name:
                        data.name ||
                        existingScore?.name ||
                        "Devotee",

                    score:
                        existingScore
                            ? existingScore.score
                            : 0,

                    moves:
                        existingScore
                            ? existingScore.moves
                            : 0,

                    time:
                        existingScore
                            ? existingScore.time
                            : "Not Played",

                    timeSeconds:
                        existingScore
                            ? existingScore.timeSeconds
                            : 999999,

                    imageId:
                        existingScore
                            ? existingScore.imageId
                            : "images/ganesha.png",

                    played:
                        Boolean(
                            existingScore
                        )
                });
            }
        );


        /* ====================================================
           ADD OLD SCORE USERS THAT MAY NOT HAVE
           A PARTICIPANT DOCUMENT
           ==================================================== */

        scoreMap.forEach(
            (player, uid) => {

                const alreadyExists =
                    leaderboard.some(
                        item =>
                            item.uid === uid
                    );

                if (
                    !alreadyExists
                ) {

                    leaderboard.push(
                        player
                    );
                }
            }
        );


        /* ====================================================
           SORT
           PLAYED USERS FIRST
           HIGHEST SCORE FIRST
           ==================================================== */

        leaderboard.sort(
            (a, b) => {

                // Users who played come first
                if (
                    a.played !==
                    b.played
                ) {

                    return a.played
                        ? -1
                        : 1;
                }

                // Highest score first
                if (
                    b.score !==
                    a.score
                ) {

                    return b.score -
                        a.score;
                }

                // Better time first
                if (
                    a.timeSeconds !==
                    b.timeSeconds
                ) {

                    return a.timeSeconds -
                        b.timeSeconds;
                }

                // Fewer moves first
                if (
                    a.moves !==
                    b.moves
                ) {

                    return a.moves -
                        b.moves;
                }

                // Finally sort names
                return String(
                    a.name
                ).localeCompare(
                    String(
                        b.name
                    )
                );
            }
        );


        renderPuzzleLeaderboard(
            leaderboard
        );

        updateFinalRank(
            leaderboard
        );

        console.log(
            "✅ Global leaderboard loaded:",
            leaderboard
        );

    } catch (error) {

        console.error(
            "❌ Global leaderboard error:",
            error
        );

        container.innerHTML = `
            <div class="leaderboard-empty">

                <div style="font-size:50px;">
                    ⚠️
                </div>

                <h3>
                    Unable to load leaderboard
                </h3>

                <p>
                    Please refresh the page.
                </p>

            </div>
        `;
    }
}


/* ============================================================
   RENDER GLOBAL LEADERBOARD
============================================================ */

function renderPuzzleLeaderboard(
    scores
) {

    const container =
        document.getElementById(
            "puzzleLeaderboardRows"
        );

    if (!container) {
        return;
    }

    if (
        !scores ||
        scores.length === 0
    ) {

        container.innerHTML = `
            <div class="leaderboard-empty">

                <div style="font-size:50px;">
                    🏆
                </div>

                <h3>
                    No Devotees Yet
                </h3>

                <p>
                    Be the first person to
                    scan and join Scan Ganesha!
                </p>

            </div>
        `;

        return;
    }

    container.innerHTML =
        "";

    scores.forEach(
        (
            player,
            index
        ) => {

            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "leaderboard-row";


            const isYou =
                player.uid &&
                currentParticipantUID &&
                player.uid ===
                    currentParticipantUID;

            if (isYou) {

                row.classList.add(
                    "current-player"
                );
            }


            let rank =
                `#${index + 1}`;

            if (
                index === 0
            ) {

                rank =
                    "🥇";
            } else if (
                index === 1
            ) {

                rank =
                    "🥈";
            } else if (
                index === 2
            ) {

                rank =
                    "🥉";
            }


            const scoreText =
                player.played
                    ? Number(
                        player.score ||
                        0
                    )
                    : "Not Played";


            const timeText =
                player.played
                    ? (
                        player.time ||
                        "00:00"
                    )
                    : "—";


            const movesText =
                player.played
                    ? Number(
                        player.moves ||
                        0
                    )
                    : "—";


            row.innerHTML = `

                <div class="leaderboard-rank">
                    ${rank}
                </div>


                <div class="leaderboard-name">

                    ${escapeHTML(
                        player.name ||
                        "Devotee"
                    )}

                    ${
                        isYou
                            ? " ⭐"
                            : ""
                    }

                </div>


                <div class="leaderboard-image">

                    <img
                        src="${escapeHTML(
                            player.imageId ||
                            "images/ganesha.png"
                        )}"
                        alt="Ganesha"
                        onerror="
                            this.src='images/ganesha.png'
                        "
                    >

                </div>


                <div class="leaderboard-score">

                    ${scoreText}

                </div>


                <div class="leaderboard-time">

                    ⏱️ ${escapeHTML(
                        timeText
                    )}

                </div>


                <div class="leaderboard-moves">

                    🔄 ${movesText}

                </div>

            `;


            container.appendChild(
                row
            );
        }
    );
}


/* ============================================================
   FINAL RANK
============================================================ */

function updateFinalRank(
    scores
) {

    const element =
        document.getElementById(
            "finalPuzzleRank"
        );

    if (!element) {
        return;
    }

    const index =
        scores.findIndex(
            player =>
                player.uid &&
                currentParticipantUID &&
                player.uid ===
                    currentParticipantUID &&
                player.played
        );

    element.textContent =
        index >= 0
            ? `#${index + 1}`
            : "—";
}

/* ============================================================
   FINAL PAGE
============================================================ */


/* ============================================================
   FINAL PAGE
============================================================ */

function updateFinalPage() {

    const name =
        document.getElementById(
            "finalUserName"
        );

    const chants =
        document.getElementById(
            "finalChants"
        );

    const score =
        document.getElementById(
            "finalPuzzleScore"
        );

    const storedScore =
        localStorage.getItem(
            "scanGaneshaLastPuzzleScore"
        );

    if (name) {

        name.textContent =
            currentParticipantName;
    }

    if (chants) {

        chants.textContent =
            chantCount;
    }

    if (score) {

        score.textContent =
            storedScore ||
            "—";
    }
}

/* ============================================================
   FINAL WISH
============================================================ */

async function saveFinalWish() {

    const field =
        document.getElementById(
            "finalWish"
        );

    const message =
        document.getElementById(
            "wishSavedMessage"
        );

    if (!field) {
        return;
    }

    const wish =
        field.value.trim();

    if (!wish) {

        if (message) {

            message.textContent =
                "Please write your wish first 🙏";
        }

        return;
    }

    localStorage.setItem(
        "scanGaneshaFinalWish",
        wish
    );

    if (message) {

        message.textContent =
            "🙏 Your wish has been offered to Lord Ganesha.";
    }

    try {

        const user =
            await ensureFirebaseUser();

        if (
            user &&
            firebaseDB
        ) {

            await firebaseDB
                .collection(
                    "participants"
                )
                .doc(
                    user.uid
                )
                .set(
                    {
                        uid:
                            user.uid,

                        name:
                            currentParticipantName,

                        finalWish:
                            wish,

                        updatedAt:
                            firebase.firestore
                                .FieldValue
                                .serverTimestamp()
                    },
                    {
                        merge:
                            true
                    }
                );
        }

    } catch (error) {

        console.error(
            "Final wish save error:",
            error
        );
    }
}

/* ============================================================
   QR
============================================================ */

function initializeQR() {

    const container =
        document.getElementById(
            "qrcode"
        );

    if (!container) {
        return;
    }

    const websiteURL =
        "https://kavyasreey432.github.io/scan-ganesha/";

    const text =
        document.getElementById(
            "websiteURLText"
        );

    if (text) {

        text.textContent =
            websiteURL;
    }

    container.innerHTML =
        "";

    if (
        typeof QRCode !==
        "undefined"
    ) {

        new QRCode(
            container,
            {
                text:
                    websiteURL,

                width:
                    220,

                height:
                    220,

                colorDark:
                    "#65151d",

                colorLight:
                    "#fffdf8",

                correctLevel:
                    QRCode.CorrectLevel.H
            }
        );
    }
}

async function copyWebsiteURL() {

    const websiteURL =
        "https://kavyasreey432.github.io/scan-ganesha/";

    const message =
        document.getElementById(
            "copyMessage"
        );

    try {

        if (
            navigator.clipboard &&
            navigator.clipboard.writeText
        ) {

            await navigator.clipboard
                .writeText(
                    websiteURL
                );

        } else {

            const input =
                document.createElement(
                    "input"
                );

            input.value =
                websiteURL;

            document.body.appendChild(
                input
            );

            input.select();

            document.execCommand(
                "copy"
            );

            input.remove();
        }

        if (message) {

            message.textContent =
                "✅ Website link copied!";
        }

    } catch (error) {

        console.error(
            "Copy error:",
            error
        );

        if (message) {

            message.textContent =
                websiteURL;
        }
    }

    setTimeout(
        () => {

            if (message) {

                message.textContent =
                    "";
            }

        },
        4000
    );
}

/* ============================================================
   ECO
============================================================ */

function updateEcoChallenge() {

    const checks =
        Array.from(
            document.querySelectorAll(
                "[data-eco]"
            )
        );

    const checked =
        checks.filter(
            checkbox =>
                checkbox.checked
        ).length;

    const count =
        document.getElementById(
            "ecoCount"
        );

    const progress =
        document.getElementById(
            "ecoProgress"
        );

    const badge =
        document.getElementById(
            "ecoBadge"
        );

    if (count) {

        count.textContent =
            checked;
    }

    if (progress) {

        progress.style.width =
            (
                checks.length
                    ? (
                        checked /
                        checks.length *
                        100
                    )
                    : 0
            ) + "%";
    }

    if (badge) {

        badge.hidden =
            checked !==
            checks.length;
    }

    localStorage.setItem(
        "scanGaneshaEcoState",
        JSON.stringify(
            checks.map(
                checkbox =>
                    checkbox.checked
            )
        )
    );

    if (
        checks.length &&
        checked ===
            checks.length
    ) {

        exploredFeatures.add(
            "eco"
        );

        localStorage.setItem(
            "scanGaneshaExploredFeatures",
            JSON.stringify(
                Array.from(
                    exploredFeatures
                )
            )
        );

        updateJourneyProgress();
    }
}

function loadEcoState() {

    const checks =
        Array.from(
            document.querySelectorAll(
                "[data-eco]"
            )
        );

    if (!checks.length) {
        return;
    }

    let saved =
        [];

    try {

        saved =
            JSON.parse(
                localStorage.getItem(
                    "scanGaneshaEcoState"
                ) ||
                "[]"
            );

    } catch {

        saved =
            [];
    }

    checks.forEach(
        (
            checkbox,
            index
        ) => {

            checkbox.checked =
                Boolean(
                    saved[index]
                );
        }
    );

    updateEcoChallenge();
}

/* ============================================================
   COMPUTER SCIENCE
============================================================ */

function showCSFact(
    button
) {

    if (!button) {
        return;
    }

    const card =
        button.closest(
            ".cs-card"
        );

    if (!card) {
        return;
    }

    const hidden =
        card.querySelector(
            ".hidden-connection"
        );

    if (!hidden) {
        return;
    }

    const shown =
        hidden.classList.toggle(
            "show"
        );

    button.textContent =
        shown
            ? "Hide connection"
            : "Reveal connection";

    if (shown) {

        exploredFeatures.add(
            "cs"
        );

        localStorage.setItem(
            "scanGaneshaExploredFeatures",
            JSON.stringify(
                Array.from(
                    exploredFeatures
                )
            )
        );

        updateJourneyProgress();
    }
}

function checkDebugAnswer(
    button,
    correct
) {

    const result =
        document.getElementById(
            "debugResult"
        );

    const options =
        document.querySelectorAll(
            ".debug-options button"
        );

    options.forEach(
        option => {
            option.disabled =
                true;
        }
    );

    if (!result) {
        return;
    }

    if (correct) {

        result.className =
            "success-message";

        result.textContent =
            "✅ Correct! First reproduce and understand the problem. That is the foundation of effective debugging.";

    } else {

        result.className =
            "error-message";

        result.textContent =
            "🙏 Not quite. Try to reproduce and understand the problem first.";
    }

    exploredFeatures.add(
        "cs"
    );

    localStorage.setItem(
        "scanGaneshaExploredFeatures",
        JSON.stringify(
            Array.from(
                exploredFeatures
            )
        )
    );

    updateJourneyProgress();
}

/* ============================================================
   JOURNEY
============================================================ */

function updateJourneyProgress() {

    const text =
        document.getElementById(
            "journeyText"
        );

    const progress =
        document.getElementById(
            "journeyProgress"
        );

    const total =
        10;

    const completed =
        Math.min(
            exploredFeatures.size,
            total
        );

    if (text) {

        text.textContent =
            `${completed} / ${total} experiences explored`;
    }

    if (progress) {

        progress.style.width =
            (
                completed /
                total *
                100
            ) + "%";
    }
}

/* ============================================================
   MENU
============================================================ */

function setupMenu() {

    const toggle =
        document.getElementById(
            "menuToggle"
        );

    const nav =
        document.getElementById(
            "mainNav"
        );

    if (
        !toggle ||
        !nav
    ) {
        return;
    }

    toggle.addEventListener(
        "click",
        () => {

            nav.classList.toggle(
                "open"
            );

            toggle.setAttribute(
                "aria-label",
                nav.classList.contains(
                    "open"
                )
                    ? "Close menu"
                    : "Open menu"
            );
        }
    );

    nav.querySelectorAll(
        "button"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                closeMenu
            );
        }
    );
}

function closeMenu() {

    const nav =
        document.getElementById(
            "mainNav"
        );

    const toggle =
        document.getElementById(
            "menuToggle"
        );

    if (nav) {

        nav.classList.remove(
            "open"
        );
    }

    if (toggle) {

        toggle.setAttribute(
            "aria-label",
            "Open menu"
        );
    }
}

/* ============================================================
   KEYBOARD
============================================================ */

function setupKeyboardNavigation() {

    document.addEventListener(
        "keydown",
        event => {

            const modal =
                document.getElementById(
                    "galleryModal"
                );

            if (
                modal &&
                modal.classList.contains(
                    "active"
                )
            ) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeGallery();
                }

                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    changeGallery(
                        -1
                    );
                }

                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    changeGallery(
                        1
                    );
                }

                return;
            }

            const storiesPage =
                document.getElementById(
                    "storiesPage"
                );

            if (
                storiesPage &&
                storiesPage.classList.contains(
                    "active"
                )
            ) {

                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    previousStory();
                }

                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    nextStory();
                }
            }
        }
    );
}

/* ============================================================
   PETALS
============================================================ */

function setupFloatingPetals() {

    const container =
        document.getElementById(
            "floatingPetals"
        );

    if (!container) {
        return;
    }

    const symbols = [
        "🌸",
        "🌺",
        "✨",
        "🪔",
        "🙏",
        "🌼"
    ];

    for (
        let i = 0;
        i < 15;
        i++
    ) {

        const petal =
            document.createElement(
                "span"
            );

        petal.className =
            "floating-petal";

        petal.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        petal.style.left =
            (
                Math.random() *
                100
            ) + "%";

        petal.style.animationDelay =
            (
                Math.random() *
                10
            ) + "s";

        petal.style.animationDuration =
            (
                8 +
                Math.random() *
                8
            ) + "s";

        petal.style.fontSize =
            (
                14 +
                Math.random() *
                18
            ) + "px";

        container.appendChild(
            petal
        );
    }
}

/* ============================================================
   MODAL CLICK
============================================================ */

document.addEventListener(
    "click",
    event => {

        const modal =
            document.getElementById(
                "galleryModal"
            );

        if (
            modal &&
            modal.classList.contains(
                "active"
            ) &&
            event.target ===
                modal
        ) {

            closeGallery();
        }
    }
);

/* ============================================================
   VISIBILITY
============================================================ */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            stopPuzzleTimer();

        } else if (
            !puzzleCompleted &&
            puzzleStartTime
        ) {

            startPuzzleTimer();
        }
    }
);

/* ============================================================
   GLOBAL FUNCTIONS FOR HTML
============================================================ */

window.showPage =
    showPage;

window.nextStory =
    nextStory;

window.previousStory =
    previousStory;

window.addChant =
    addChant;

window.resetChants =
    resetChants;

window.speakMantra =
    speakMantra;

window.stopSpeech =
    stopSpeech;

window.openGallery =
    openGallery;

window.closeGallery =
    closeGallery;

window.changeGallery =
    changeGallery;

window.startGaneshaPuzzle =
    startGaneshaPuzzle;

window.restartGaneshaPuzzle =
    restartGaneshaPuzzle;

window.selectPuzzlePiece =
    selectPuzzlePiece;

window.loadPuzzleLeaderboard =
    loadPuzzleLeaderboard;

window.copyWebsiteURL =
    copyWebsiteURL;

window.updateEcoChallenge =
    updateEcoChallenge;

window.showCSFact =
    showCSFact;

window.checkDebugAnswer =
    checkDebugAnswer;

window.saveFinalWish =
    saveFinalWish;

/* ============================================================
   END
============================================================ */

console.log(
    "🙏 Scan Ganesha loaded successfully."
);
console.log(
    "🐘 Bal Ganesha → Name → Divine Entry → Home"
);
console.log(
    "📖 9 Stories"
);
console.log(
    "🕉️ 9 Mantras & Shlokas"
);
console.log(
    "🎵 7 Devotional Songs"
);
console.log(
    "🖼️ Glimpses"
);
console.log(
    "🧩 Personalized 3×3 Puzzle"
);
console.log(
    "🏆 Firebase Leaderboard"
);
console.log(
    "🌱 Eco-Friendly Challenge"
);
console.log(
    "💻 Ganesha & Computer Science"
);
console.log(
    "📱 QR Sharing"
);
console.log(
    "🙏 Ganapati Bappa Morya 🙏"
);
