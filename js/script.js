let currentQuestion = 0;
let rightQuestions = 0;

let applauseSound = new Audio('audio/applause.mp3');
let rightAnswerSound = new Audio('audio/right-answer.mp3');
let falseAnswerSound = new Audio('audio/false-answer.mp3');


function init() {
    showLenght();
    showQuestion();
}


function showLenght() {
    document.getElementById('all-questions').innerHTML = htmlQuiz.length;
}


function marginSidebar() {
    document.getElementById('sidebar').style.marginRight = '0px';
}


function showResult() {
    let numbersOfScore = document.getElementById('numbers-of-score');
    numbersOfScore.innerHTML = '';
    numbersOfScore.innerHTML = `
    ${rightQuestions}/${htmlQuiz.length}`;
}


function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    }
    else {
        updateProgessBar();
        updateToNextQuestion();
    }
}


function gameIsOver() {
    return currentQuestion >= htmlQuiz.length;
}


function showEndScreen() {
    document.getElementById('end-screen').style = '';
    document.getElementById('question-body').style.display = 'none';
    marginSidebar();
    showResult();
    applauseSound.play();
}


function updateProgessBar() {
    let percent = (currentQuestion + 1) / htmlQuiz.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%`;
}


function updateToNextQuestion() {

    let question = htmlQuiz[currentQuestion];
    document.getElementById('question').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}


function answer(selection) {
    let question = htmlQuiz[currentQuestion];
    let selectedQuestionNumer = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (rightAnswerSelected(selectedQuestionNumer)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        rightQuestions++;
        rightAnswerSound.play();
    }
    else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        falseAnswerSound.play();
    }
    document.getElementById('next-button').disabled = false;
}


function rightAnswerSelected(selectedQuestionNumer) {
    return selectedQuestionNumer == question['right_answer'];
}


function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    showCurrentQuestionDisplay();
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}


function showCurrentQuestionDisplay() {
    document.getElementById('current-question-display').innerHTML = `${currentQuestion + 1}`;
}


function restartGame() {
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('question-body').style.display = '';
    rightQuestions = 0;
    currentQuestion = 0;
    init();
}