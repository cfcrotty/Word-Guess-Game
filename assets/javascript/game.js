var winScore = 0;
var lossesScore = 0;
var guessLeftScore = 10;
var nextSong = 0;
var guessLetter = [];
var newSong = 1;
var lettersArr = [];

var winsTally = document.getElementById("wins");
var lossesTally = document.getElementById("losses");
var currentWordText = document.getElementById("currentWord");
var numOfGuessesText = document.getElementById("numOfGuesses");
var lettersText = document.getElementById("letters");

var songs = ["yesterday","tomorrow"];

// Creates an array that lists alphabet.
var letterChoices = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

//returns and generates HTML code(span) depending argument length
function printSpan(song,guessLetter1) {
    var txt = "";
    for (var i=0;i<song.length;i++) {
        txt += "<span id='span"+i+"'>"+" _ "+"</span>";
    }
    currentWordText.innerHTML=txt;
    //return txt;
}

//prints the letter in th HTML span
function printLetter(usrGuess,songIdx) {
    //alert(usrGuess);
    for (var i=0;i<songs[songIdx].length;i++) {
        if (usrGuess===songs[songIdx][i]) {
            //alert(songs[songIdx][i]);
            document.getElementById("span"+i).textContent=usrGuess;
            //alert(usrGuess+" --- "+letterIdx);
            guessLetter[i]=usrGuess;
        }
    }
    
}

function resetAll() {
    guessLetter = [];
    lettersArr = [];
    newSong = 1;
    printSpan(songs[nextSong]);
    guessLeftScore = 10;
    numOfGuessesText.textContent = 10;
    lettersText.textContent = "";
}

// This function is run whenever the user presses a key.
document.onkeyup = function (event) {
    if (songs.length>nextSong) {
        if (newSong) {  resetAll(); newSong=0; }

        var userGuess = event.key;
        userGuess = userGuess.toLowerCase();
        var chk = songs[nextSong].indexOf(userGuess);
        var chk1 = letterChoices.indexOf(userGuess);
        var letterRepeat = lettersArr.indexOf(userGuess);

        if (letterRepeat<0) {
            if (chk1<0) {
                alert("Please enter letters from a/A to z/Z only.");
            } else {
                lettersText.textContent += userGuess+",";
                if (chk<0) {
                    guessLeftScore--;
                    numOfGuessesText.textContent = guessLeftScore;
                    lettersArr.push(userGuess);
                    if (guessLeftScore===0) {
                        lossesScore++;
                        lossesTally.textContent = lossesScore;
                        resetAll();
                        nextSong++;
                    }
                } else if (chk>=0) {
                    printLetter(userGuess,nextSong);
                    lettersArr.push(userGuess);
                }
            }
        } 
        
        var userWord = guessLetter.toString().toLowerCase().replace(/[,\s]/g, '');
        if (songs.length>nextSong && songs[nextSong].toLowerCase()===userWord) {
            winScore++;
            winsTally.textContent = winScore;
            resetAll();
            nextSong++;
        }
    } else {
        alert("Game Over");
    }
};