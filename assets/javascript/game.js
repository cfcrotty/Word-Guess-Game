var winScore = 0;
var lossesScore = 0;
var guessLeftScore = 10;
var nextSong = 0;
var guessLetter = [];
var newSong = 1;
var lettersArr = [];
var audioLoaded = 0;

var myAudio = document.getElementById("myAudio"); 
var winsTally = document.getElementById("wins");
var lossesTally = document.getElementById("losses");
var currentWordText = document.getElementById("currentWord");
var numOfGuessesText = document.getElementById("numOfGuesses");
var lettersText = document.getElementById("letters");
var changeAudio = document.getElementById("audioSrc").src;

var songs = [{s:"Bohemian Rhapsody",a:"assets/audio/Bohemian Rhapsody.mp3",h:"assets/images/br.jpg"},
            {s:"Blurred Lines",a:"assets/audio/Blurred Lines.mp3",h:"assets/images/bl.jpeg"},
            {s:"Sugar Man",a:"assets/audio/Sugar Man.mp3",h:"assets/images/sm.jpg"},
            {s:"Super Bass",a:"assets/audio/Super Bass.mp3",h:"assets/images/sb.jpg"},
            {s:"Gorilla",a:"assets/audio/Gorilla.mp3",h:"assets/images/g.jpg"},
            {s:"Look At Me Now",a:"assets/audio/Look At Me Now.mp3",h:"assets/images/lamn.jpg"},
            {s:"My Chick Bad",a:"assets/audio/My Chick Bad.mp3",h:"assets/images/mcb.jpg"}];

// Creates an array that lists alphabet.
var letterChoices = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

//returns and generates HTML code(span) depending argument length
function printSpan(song) {
    var txt = "";
    for (var i=0;i<song.length;i++) {
        txt += "<span id='span"+i+"'>";
        txt += (song[i]===" ") ? "&nbsp;&nbsp;&nbsp;" : " _ "; //song[i].match(/^ *$/)
        txt += "</span>";
    }
    currentWordText.innerHTML=txt;
    //return txt;
}

//prints the letter in th HTML span
function printLetter(usrGuess,songIdx) {
    for (var i=0;i<songs[songIdx].s.length;i++) {
        if (usrGuess===songs[songIdx].s[i].toLowerCase()) {
            document.getElementById("span"+i).textContent=usrGuess;
            guessLetter[i]=usrGuess;
        }
    }
    
}

//resets counters, HTML span and change song
function resetAll() {
    currentWordText.innerHTML="";
    guessLetter = [];
    lettersArr = [];
    newSong = 1;
    guessLeftScore = 10;
    numOfGuessesText.textContent = 10;
    lettersText.textContent = "";
    printSpan(songs[nextSong].s.toLowerCase());
}

//function to load/change song
function loadSong() {
    changeAudio=songs[nextSong].a; 
    myAudio.src=songs[nextSong].a; 
    myAudio.play(); 
}

//show or hide image
function displayHideHint(val) {
    if (val) {
        var displayImage = document.getElementById("imageHint");
        var image = document.getElementById("image");
        image.src = songs[nextSong].h;
        displayImage.style.display="block";
        document.getElementById("hint").style.display = "block";
    } else if (!val) {
        document.getElementById("imageHint").style.display = "none";
        document.getElementById("hint").style.display = "none";
    }
}

resetAll();
// This function is run whenever the user presses a key.
document.onkeyup = function (event) {
    if (songs.length>nextSong) {
        if (newSong) {  
            if (!audioLoaded) {loadSong(); audioLoaded++;} else {audioLoaded=0;}
            resetAll(); 
            newSong=0;
        }

        var userGuess = event.key;
        userGuess = userGuess.toLowerCase();
        var chk = songs[nextSong].s.toLowerCase().indexOf(userGuess);
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
                        nextSong++;
                        loadSong();
                        audioLoaded++;
                        resetAll();
                    }
                } else if (chk>=0) {
                    printLetter(userGuess,nextSong);
                    lettersArr.push(userGuess);
                }
            }
        } 
        
        var userWord = guessLetter.toString().toLowerCase().replace(/[,\s]/g, '');
        if (songs[nextSong].s.toLowerCase().replace(/[ \s]/g, '')===userWord) {
            winScore++;
            winsTally.textContent = winScore;
            nextSong++;
            loadSong();
            audioLoaded++;
            if (songs.length>nextSong) resetAll();
        }
    } else {
        alert("Game Over");
        myAudio.pause(); 
        return;
    }
};