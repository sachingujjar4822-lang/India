// यह हमारे प्रश्न और उनके जवाबों का डेटा है
const questions = [
    {
        question: "भारत की राजधानी क्या है?",
        options: ["दिल्ली", "मुंबई", "कोलकाता", "चेन्नई"],
        correctAnswer: "दिल्ली"
    },
    {
        question: "कंप्यूटर का जनक कौन है?",
        options: ["बिल गेट्स", "स्टीव जॉब्स", "चार्ल्स बैबेज", "लैरी पेज"],
        correctAnswer: "चार्ल्स बैबेज"
    },
    {
        question: "विश्व का सबसे ऊँचा पर्वत कौन सा है?",
        options: ["कंचनजंगा", "माउंट एवरेस्ट", "एलब्रुस", "माउंट फुजी"],
        correctAnswer: "माउंट एवरेस्ट"
    },
    {
        question: "हमारे सौरमंडल में कितने ग्रह हैं?",
        options: ["7", "8", "9", "10"],
        correctAnswer: "8"
    },
    {
        question: "भारत का राष्ट्रीय पक्षी क्या है?",
        options: ["कौआ", "मोर", "तोता", "कबूतर"],
        correctAnswer: "मोर"
    }
];

// HTML तत्वों (elements) को सेलेक्ट करें
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

// क्विज़ शुरू करने का फंक्शन
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    nextButton.style.display = 'none'; // शुरुआत में 'अगला' बटन छिपा रहेगा
}

// प्रश्न दिखाने का फंक्शन
function showQuestion() {
    optionsContainer.innerHTML = '';
    
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        optionsContainer.appendChild(button);
        
        button.addEventListener('click', () => selectOption(option, button));
    });

    nextButton.style.display = 'none'; // हर नए प्रश्न के लिए 'अगला' बटन छिपा रहेगा
}

// विकल्प (option) चुनने का फंक्शन
function selectOption(selectedOption, button) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    
    const allOptions = optionsContainer.querySelectorAll('button');
    allOptions.forEach(btn => btn.disabled = true);
    
    if (selectedOption === correctAnswer) {
        score++;
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
        
        allOptions.forEach(btn => {
            if (btn.innerText === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }

    nextButton.style.display = 'block'; // जवाब चुनने के बाद 'अगला' बटन दिखाएं
}

// "अगला" बटन पर क्लिक करने का फंक्शन
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// रिजल्ट दिखाने का फंक्शन
function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreElement.innerText = `${score} out of ${questions.length}`;
}

// "दोबारा खेलें" बटन पर क्लिक करने का फंक्शन
restartButton.addEventListener('click', startQuiz);

// जब पेज लोड हो तो क्विज़ शुरू करें
startQuiz();
