const API_ENDPOINT = 'http://127.0.0.1:8001/api/jokes/%amount%';

let jokesButton = document.getElementById('fetchJokesButton');

if (jokesButton) {
    jokesButton.addEventListener('click', onJokesButtonClicked);
}

let hasClearedJokeArea = false;
let jokesFetched = 0;

function fetchJokes(amount) {
    axios.get(API_ENDPOINT.replace('%amount%', amount))
        .then(function (response) {
            let jokes = getJokesArrayFromApiResponse(response.data.response_text.value);

            jokesFetched += jokes.length;

            appendJokesToStack(jokes);
            updateJokeCount();
        })
        .catch(function(e) {
            appendJokesToStack([e]);
        })
        .then(function() {
            if (jokesButton) {
                jokesButton.disabled = false;
                jokesButton.innerText = 'Fetch';
            }
        })
}

function getJokesArrayFromApiResponse(response) {
    let jokesArray = response;
    let jokes = [];

    for (let i = 0; i < jokesArray.length; i++) {
        jokes.push(jokesArray[i].joke);
    }

    return jokes;
}

function updateJokeCount() {
    let jokesCount = document.getElementById('jokesCount');

    if (jokesCount) {
        jokesCount.innerText = jokesFetched;
    }
}

function appendJokesToStack(jokes) {
    let jokesArea = document.getElementById('jokesArea');

    if (jokesArea) {
        if (!hasClearedJokeArea) {
            jokesArea.innerHTML = '';
            hasClearedJokeArea = true;
        }

        for (let i = 0; i < jokes.length; i++) {
            jokesArea.innerHTML = '<div class="notification">' + jokes[i] + '</div>' + jokesArea.innerHTML
        }
    }
}

function onJokesButtonClicked() {
    if (jokesButton) {
        jokesButton.disabled = true;
        jokesButton.innerText = 'Fetching...';
    }

    let amount = 1;
    let amountInput = document.getElementById('fetchJokesAmount');

    if (amountInput && isNumeric(amountInput.value)) {
        amount = parseInt(amountInput.value);
    }

    if (amount > 20) {
        amount = 20;
    }

    fetchJokes(amount);
}

// I took this functon (isNumeric) from a StackOverflow answer
// https://stackoverflow.com/a/175787/14307013

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

