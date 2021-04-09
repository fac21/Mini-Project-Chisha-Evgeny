//Speech to Text

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; //To enable on both firefox and Chrome

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {

    const transcript = Array.from(e.results) //Convert results of sppech to an array then map over each one
        .map(result => result[0]) //mapping over first result of speech
        .map(result => result.transcript) //mapping over remaining result of speech
        .join('') //joining the speech together as a sentence

    p.textContent = transcript; //Creating a paragraph of the sppech
    if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }

    if (transcript.includes('getGif')) {
        console.log('getGif');
    }
    console.log(transcript);
});

recognition.addEventListener('end', recognition.start);

recognition.start();


//Text to Speech


const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
        .filter(voice => voice.lang.includes('en')) //keep only English
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
}

function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
}

function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg);
    }
}

function setOption() {
    msg[this.name] = this.value;
    toggle();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));