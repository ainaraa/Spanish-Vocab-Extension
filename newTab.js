const title = document.getElementById('title');
const word = document.getElementById('word');
const type = document.getElementById('type');
const definition = document.getElementById('definition');
const sentence = document.getElementById('sentence');

let spanishWord = null;

const url = chrome.runtime.getURL('./data/vocab.json');
console.log("Loading vocab from " + url);
const promiseJson = fetch(url).then((response) => response.json());
loadVocab(promiseJson);

document.getElementById('playback').addEventListener("click", function(){
        const msg = new SpeechSynthesisUtterance();
        msg.text = spanishWord;
        msg.lang = "es-ES";
        window.speechSynthesis.speak(msg);
});

function loadVocab(promise) {
        promise.then((json) => {
                const index = Math.floor(json.length * Math.random());
                const chosen = JSON.stringify(json[index]);
                console.log("Vocab: " + chosen);
                const chosenJson = JSON.parse(chosen);

                spanishWord = chosenJson.word;
                let titleStr = spanishWord;
                let typeStr = null;
                if (chosenJson.type != null) {
                        titleStr = titleStr + " (" + chosenJson.type + ")";
                        typeStr = chosenJson.type + ": ";
                }
                let sentenceStr = null;
                if (chosenJson.sentence != null) {
                        sentenceStr = chosenJson.sentence;
                }

                title.innerText = titleStr;
                word.innerText = spanishWord;
                type.innerText = typeStr;
                definition.innerText = chosenJson.definition;
                sentence.innerText = sentenceStr;
        });
}
