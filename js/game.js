var playing = false;
var score;
var action;
var timeLeft;
var correctAnswer;
var gameOver = document.getElementById('gameover')
// if we click on the start/reset
document.getElementById("startreset").onclick = () => {
    // if we are playing 
    // reload page
    if (playing == true) {
        // location.reload(); // reload page
        sat('gameover').innerHTML = `<p> you reset your game! </p> <p>your current score is ${score} </p>`;
        show('gameover')
        setTimeout(function () {
            location.reload()
        }, 2000)
    } else {
        // if we are not playing
        // score 0
        // show countdown box
        // reduce time by 1sec
        playing = true;
        score = 0;
        sat('score-value').innerHTML = score;
        // timeRemaining.style.display = 'block';
        show('timeremaining')
        sat('startreset').innerHTML = 'Reset Game';
        // time left
        timeLeft = 60;
        sat('time-rem').innerHTML = timeLeft;

        hide('gameover')
        // start countdown 
        startCountdown();
        
        // generate a new Q & A;
        generateQA();
    }
}

for (let i=1; i<5; i++) {
    sat(`box${i}`).onclick = function() {
    if(playing == true) {
        if(this.innerHTML == correctAnswer) {
            score++;
            sat('score-value').innerHTML = score;
            hide('wrong');
            show('correct');
            setTimeout(function() {
                hide('correct');
            }, 1000)
            generateQA();
        } else {
            hide('correct');
            show('wrong');
            setTimeout(function() {
                hide('wrong');
            }, 1000)
        }
    }
}
}

function startCountdown() {
    action = setInterval(function () {
        timeLeft -= 1
        sat('time-rem').innerHTML = timeLeft;

        if (timeLeft == 0) {
            stopCountdown(action);
            show('gameover');
            sat('gameover').innerHTML = `<p> Game Over!</p> <p> your score is ${score}.`;
            hide('timeremaining');
            hide('correct');
            hide('wrong');
            playing = false;
            sat('startreset').innerHTML = 'Start Game'
        }
    }, 1000)
}

function stopCountdown(act) {
    clearInterval(act)
}

function hide(id) {
    document.getElementById(id).style.display = 'none';
}

function show(id) {
    document.getElementById(id).style.display = 'block';
}

function sat(id) {
    return document.getElementById(id)
}

function generateQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    sat('question').innerHTML = `${x} x ${y} `
    var correctposition = 1 + Math.round(Math.random() * 3);
    sat(`box${correctposition}`).innerHTML = correctAnswer;
    
    var answers = [correctAnswer]
    // fill other boxes with wrong answer 
    for(let i=1; i< 5; i++) {
        if(i!== correctposition){
            var wrongAnswer;
            do  {
            wrongAnswer = Math.round(9 * Math.random()) * Math.round(Math.random() * 9);
            }while(answers.indexOf(wrongAnswer) > -1)
            sat(`box${i}`).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}