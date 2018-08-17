const numberOfSounds = {
    "happy": 2,
    "sad": 0,
    "angry": 0,
    "surprised": 0
};

let sound = new Audio(`sounds/gresillement.mp3`);
sound.play();

let lastEmotion = "";

setInterval( () => {
    // We check if emotionScores really contains something because it can be "false"
    if (emotionScores) {

        let currentEmotion = "";

        if (emotionScores[3].value > 0.2) {
            currentEmotion = "happy";
        } else {
            let emotion = getCurrentEmotion(emotionScores);
            currentEmotion = emotion.name;
        }

        console.log(currentEmotion);

        if (lastEmotion !== currentEmotion && currentEmotion === "happy") {
            clearSound();
            playSound(currentEmotion);
        }

        if (currentEmotion !== "happy") {
            clearSound();
        }

        lastEmotion = currentEmotion;
    }


}, 1000);

function playSound(emotion) {
    console.log(`playsound`);

    let random = Math.floor(Math.random()*numberOfSounds[emotion]);
    let soundPath = `sounds/${emotion}/${emotion}-${random}.mp3`;

    // Stop the sound to avoid overlapping
    if (sound.paused === false) {
        stopSound();
    }
    sound = new Audio(soundPath);
    sound.play();

}

function stopSound() {
    // do something in order to avoid Uncaught in Promise
    // https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
}

function clearSound() {
    console.log(`clearSOund`);
    sound.pause();
    sound = new Audio(`sounds/gresillement.mp3`);
    sound.play();

}

// Choose the emotion with the highest score and return this score
function getCurrentEmotion(scores) {
    let highestValue = scores[0]; // we put the first emotion as the highest value
    for (const emotion in scores) {
        if (scores[emotion].value > highestValue.value) {
            highestValue = scores[emotion];
        }
    }
    return {
        "name": highestValue.emotion,
        "score": highestValue.value
    };
}

