// Sample Questions
const questions = [
    {
        question: "What is your favorite programming language?",
        options: ["JavaScript", "Python", "Java", "C++"],
    },
    {
        question: "Which front-end framework do you prefer?",
        options: ["React", "Vue.js", "Angular", "Svelte"],
    },
    {
        question: "Which backend language do you use most?",
        options: ["Node.js", "Django", "Ruby on Rails", "Spring Boot"],
    }
];

let currentQuestionIndex = 0;
let votes = {};
let timerInterval;

// Initialize first question
window.onload = function() {
    loadQuestion();
};

// Load question and start timer
function loadQuestion() {
    clearInterval(timerInterval);
    const questionData = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = questionData.question;
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    questionData.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.innerHTML = `
            <input type="radio" name="vote" value="${option}" id="${option}">
            <label for="${option}">${option}</label>
        `;
        optionsDiv.appendChild(optionElement);
    });

    // Reset timer and results
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('vote-form').style.display = 'block';
    startTimer();
}

function submitVote() {
    const selectedOption = document.querySelector('input[name="vote"]:checked');
    if (selectedOption) {
        const vote = selectedOption.value;
        votes[vote] = (votes[vote] || 0) + 1;
        document.getElementById('vote-form').style.display = 'none';
        showResults();
    } else {
        alert("Please select an option!");
    }
}

function startTimer() {
    let timeLeft = 60;
    document.getElementById('timer').innerText = `Time left: ${timeLeft} seconds`;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Time left: ${timeLeft} seconds`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showResults();
        }
    }, 1000);
}

function showResults() {
    const labels = Object.keys(votes);
    const data = Object.values(votes);

    document.getElementById('result-container').style.display = 'block';
    document.getElementById('timer').innerText = '';

    const ctx = document.getElementById('resultChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Votes',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    setTimeout(() => {
        nextQuestion();
    }, 60000); // Wait 1 minute before moving to the next question
}

function nextQuestion() {
    votes = {};
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        document.getElementById('question-container').innerHTML = '<h2>Thank you for participating!</h2>';
        document.getElementById('result-container').style.display = 'none';
    }
}
