var questions;
var questionNumber = 1;
var numOfCorrectAnswers = 0;
var playerName = "";
var clock;
function proceed() {
    playerName = document.getElementById("name").value;
    document.getElementById("form").style.display = "none";
    $("#rulesModal").modal('show');
    loadData();
}

function checkName() {
    playerName = document.getElementById("name").value;
    if (playerName.trim() === "") {
        document.getElementById("button").disabled = true;
    } else {
        document.getElementById("button").disabled = false;
    }
}

function loadData() {
    $.getJSON("questions.json", function (result) {
        questions = result.questions;
    });
}

function showQuestions() {
    document.getElementById("questions").style.display = "block";
    populateQuestionData(0);
}

function populateQuestionData(questionNumber) {
    timer();
    var answersElement = document.getElementById("answers");
    var answerInput = document.getElementById("answerInput");
    answerInput.style.display = "none";
    answersElement.style.display = "none";

    document.getElementById("nextQuestion").disabled = false;
    document.getElementById("question").innerHTML = questions[questionNumber].question;
    document.getElementById("qid").innerHTML = questionNumber + 1;
    if (questions[questionNumber].options.length > 0) {

        var answersElement = document.getElementById("answers");
        answersElement.style.display = "block";
        answersElement.innerHTML = "";
        for (let i = 0; i < questions[questionNumber].options.length; i++) {

            const element = questions[questionNumber].options[i];
            answersElement.innerHTML += '<li> <input type="radio" name="answer" value="' + element + '" onclick="checkAnswer()">' +
                ' <label class="element-animation">' + element + '</label></li>'
        }
    } else {
        var answerInput = document.getElementById("answerInput");
        answerInput.style.display = "block";
    }
}

function timer() {
    clearInterval(clock);

    var sec = 20;
    document.getElementById('timerDisplay').innerHTML = 'Vreme: 00:20';

    clock = setInterval(function () {
        document.getElementById('timerDisplay').innerHTML = 'Vreme: 00:' + sec;
        sec--;
        if (sec <= 0) {
            nextQuestion();
        }
    }, 1000);
}

function checkAnswer() {
    if (questions[questionNumber - 1].options.length > 0) {
        var checkedAnswer = document.querySelector('input[type="radio"]:checked');
        var answers = document.querySelectorAll('input[type="radio"]');
        answers.forEach(element => {
            element.disabled = true;
        });

        document.getElementById("nextQuestion").disabled = true;
        if (checkedAnswer.value === questions[questionNumber - 1].answer) {
            document.getElementById("correctAnswer").style.display = "block";
            numOfCorrectAnswers++;


        } else {
            document.getElementById("incorrectAnswer").style.display = "block";
        }
    } else {
        var answerValue = document.getElementById("answerInputValue").value;

        if (answerValue === questions[questionNumber - 1].answer) {
            document.getElementById("correctAnswer").style.display = "block";
            numOfCorrectAnswers++;


        } else {
            document.getElementById("incorrectAnswer").style.display = "block";
        }

    }
    setTimeout(() => {
        nextQuestion();
    }, 2000);
}

function nextQuestion() {
    document.getElementById("correctAnswer").style.display = "none";
    document.getElementById("incorrectAnswer").style.display = "none";
    questionNumber += 1;

    if (questionNumber > questions.length) {
        showScorePage();
        return;
    }

    populateQuestionData(questionNumber - 1);
}

function showScorePage() {
    document.getElementById("questions").style.display = "none";
    document.getElementById("score-panel").style.display = "block";
    document.getElementById("message").innerHTML = "Uspešno ste završili kviz " + playerName + "! " +
        "Vaš rezultat je " + numOfCorrectAnswers + " poena.";
}
