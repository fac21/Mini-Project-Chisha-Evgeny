window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; //To enable on both firefox and Chrome

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
 
    const transcript = Array.from(e.results)     //Convert results of sppech to an array then map over each one
      .map(result => result[0])                  //mapping over first result of speech
      .map(result => result.transcript)          //mapping over remaining result of speech
      .join('')                                  //joining the speech together as a sentence

    p.textContent = transcript;                  //Creating a paragraph of the sppech
    if(e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }

    if(transcript.includes('getGif')){
        console.log('getGif');
    }
    console.log(transcript);
});

recognition.addEventListener('end', recognition.start);

recognition.start();

