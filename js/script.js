let currentQuestion = 0;
let rightQuestions = 0;

let applauseSound = new Audio('audio/applause.mp3');
let rightAnswerSound = new Audio('audio/right-answer.mp3');
let falseAnswerSound = new Audio('audio/false-answer.mp3');
let clickedYet = false;


function startQuizGame() {
    document.getElementById('start-section').style.display = 'none';
    document.getElementById('question-body').style.display = '';
    showLenght();
    showQuestion();
    showCurrentQuestionDisplay();
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
    return currentQuestion == htmlQuiz.length;
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
    
    if(clickedYet == true) {
        return;
    }
    else{
    if (rightAnswerSelected(selectedQuestionNumer, question)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        document.getElementById(selection).previousElementSibling.style.backgroundColor = 'green';
        rightQuestions++;
        rightAnswerSound.play();
        clickedYet = true;
    }
    else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(selection).previousElementSibling.style.backgroundColor = 'red';
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        document.getElementById(idOfRightAnswer).previousElementSibling.style.backgroundColor = 'green';
        falseAnswerSound.play();
        clickedYet = true;
    }
    document.getElementById('next-button').disabled = false;
}
}


function rightAnswerSelected(selectedQuestionNumer, question) {
    return selectedQuestionNumer == question['right_answer'];
}


function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    clickedYet = false;
    showCurrentQuestionDisplay();
    resetAnswerLetters();
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


function resetAnswerLetters() {
    document.getElementById('answer-button_1').style.backgroundColor = 'lightgray';
    document.getElementById('answer-button_2').style.backgroundColor = 'lightgray';
    document.getElementById('answer-button_3').style.backgroundColor = 'lightgray';
    document.getElementById('answer-button_4').style.backgroundColor = 'lightgray';
}


function restartGame() {
    rightQuestions = 0;
    currentQuestion = 0;
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('question-body').style.display = '';
    showQuestion();
    showCurrentQuestionDisplay();
    resetAnswerLetters();
    resetAnswerButtons();
}


function showCurrentQuestionDisplay() {
    document.getElementById('current-question-display').innerHTML = `${currentQuestion + 1}`;
}


function checkStartScreen() {
    let startScreen = document.getElementById('start-section');
    if(startScreen.display = 'flex') {
        document.getElementById('sidebar').style.marginRight = '0px';
        startScreen.style.width = '100%';
    }
}