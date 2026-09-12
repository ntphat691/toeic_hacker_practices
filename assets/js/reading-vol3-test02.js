let correctCount = 0;
let incorrectCount = 0;
const questionState = new Map();
let totalQuestionsCache = 0;

function loadQuestionsData() {
    initializeQuiz();
}

function initializeQuiz() {
    if (!questionsData) return;

    document.getElementById('testTitle').textContent = '📚 ' + questionsData.testTitle;
    document.getElementById('testSubtitle').textContent = questionsData.timeLimit + ' - ' + getTotalQuestions() + ' Questions';

    document.getElementById('loadingContainer').style.display = 'none';
    document.getElementById('scorePanel').style.display = 'flex';
    document.getElementById('questionsContainer').style.display = 'block';

    generateQuestions();
    updateScore();
}

function getTotalQuestions() {
    if (!questionsData || !questionsData.parts) return 0;
    
    if (totalQuestionsCache > 0) return totalQuestionsCache;
    
    var total = 0;
    questionsData.parts.forEach(function(part) {
        if (part.questions) {
            total += part.questions.length;
        }
        if (part.passages) {
            part.passages.forEach(function(passage) {
                if (passage.questions) {
                    total += passage.questions.length;
                }
            });
        }
    });
    totalQuestionsCache = total;
    return total;
}

function generateQuestions() {
    var container = document.getElementById('questionsContainer');
    container.innerHTML = '';
    
    questionsData.parts.forEach(function(part, partIndex) {
        var partHeader = document.createElement('div');
        partHeader.className = 'passage';
        partHeader.innerHTML = '<h2>Part ' + part.partNumber + ' - ' + part.title + '</h2>';
        container.appendChild(partHeader);
        
        if (part.questions) {
            part.questions.forEach(function(q) {
                var questionDiv = document.createElement('div');
                questionDiv.className = 'question-block';
                
                var optionsHTML = q.options.map(function(opt, idx) {
                    var letter = String.fromCharCode(65 + idx);
                    return '<div class="option" onclick="selectAnswer(this, \'' + q.id + '\', \'' + q.correctAnswer + '\')"><input type="radio" name="' + q.id + '" value="' + letter + '" id="' + q.id + letter + '"><label for="' + q.id + letter + '">(' + letter + ') ' + opt.text + '</label></div>';
                }).join('');
                
                questionDiv.innerHTML = '<span class="question-number">Question ' + q.id + '</span><p style="margin-bottom: 15px; line-height: 1.6;">' + q.question + '</p><div class="options">' + optionsHTML + '</div><div class="answer-feedback" id="feedback-' + q.id + '"></div>';
                
                container.appendChild(questionDiv);
            });
        }
        
        if (part.passages) {
            part.passages.forEach(function(passage, passageIndex) {
                var passageDiv = document.createElement('div');
                passageDiv.className = 'passage';
                var passageHTML = '<h2>' + passage.passage + '</h2>';
                if (passage.image && passage.image !== '') {
                    passageHTML += '<img src="' + passage.image + '" alt="' + passage.passage + '" style="max-width: 100%; height: auto; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">';
                }
                passageHTML += '<div class="passage-text">' + passage.text + '</div>';
                passageDiv.innerHTML = passageHTML;
                container.appendChild(passageDiv);
                
                if (passage.questions) {
                    passage.questions.forEach(function(q) {
                        var questionDiv = document.createElement('div');
                        questionDiv.className = 'question-block';
                        
                        var optionsHTML = q.options.map(function(opt, idx) {
                            var letter = String.fromCharCode(65 + idx);
                            return '<div class="option" onclick="selectAnswer(this, \'' + q.id + '\', \'' + q.answer + '\')"><input type="radio" name="' + q.id + '" value="' + letter + '" id="' + q.id + letter + '"><label for="' + q.id + letter + '">(' + letter + ') ' + opt + '</label></div>';
                        }).join('');
                        
                        var questionText = q.question ? '<p style="margin-bottom: 15px; line-height: 1.6;">' + q.question + '</p>' : '';
                        questionDiv.innerHTML = '<span class="question-number">Question ' + q.num + '</span>' + questionText + '<div class="options">' + optionsHTML + '</div><div class="answer-feedback" id="feedback-' + q.id + '"></div>';
                        
                        container.appendChild(questionDiv);
                    });
                }
                
                if (passageIndex < part.passages.length - 1) {
                    var divider = document.createElement('div');
                    divider.className = 'passage-divider';
                    container.appendChild(divider);
                }
            });
        }
        
        if (partIndex < questionsData.parts.length - 1) {
            var divider = document.createElement('div');
            divider.className = 'passage-divider';
            container.appendChild(divider);
        }
    });
}

function selectAnswer(optionElement, questionId, correctAnswer) {
    var selectedValue = optionElement.querySelector('input').value;
    var isCorrect = selectedValue === correctAnswer;

    var previousAnswer = questionState.get(questionId);
    if (previousAnswer === true) correctCount--;
    if (previousAnswer === false) incorrectCount--;

    questionState.set(questionId, isCorrect);

    var allOptions = document.querySelectorAll('.option input[name="' + questionId + '"]');
    allOptions.forEach(function(inp) {
        var opt = inp.closest('.option');
        if (opt) {
            opt.classList.remove('selected-correct', 'selected-incorrect');
        }
    });

    if (isCorrect) {
        optionElement.classList.add('selected-correct');
        var feedback = document.getElementById('feedback-' + questionId);
        feedback.textContent = '✓ Correct!';
        feedback.className = 'answer-feedback correct show';
        correctCount++;

        allOptions.forEach(function(inp) {
            var opt = inp.closest('.option');
            if (opt) {
                opt.style.pointerEvents = 'none';
                opt.style.opacity = '0.7';
            }
        });
    } else {
        optionElement.classList.add('selected-incorrect');
        var feedback = document.getElementById('feedback-' + questionId);
        feedback.textContent = '✗ Incorrect. Try again!';
        feedback.className = 'answer-feedback incorrect show';
        incorrectCount++;

        allOptions.forEach(function(inp) {
            var opt = inp.closest('.option');
            if (opt) {
                opt.style.pointerEvents = 'auto';
                opt.style.opacity = '1';
            }
        });
    }

    updateScore();
}

function updateScore() {
    document.getElementById('correctScore').textContent = correctCount;
    document.getElementById('incorrectScore').textContent = incorrectCount;
    document.getElementById('totalScore').textContent = (correctCount + incorrectCount) + '/' + getTotalQuestions();
}

function resetQuiz() {
    if (!confirm('Are you sure you want to reset the quiz? All progress will be lost.')) {
        return;
    }

    correctCount = 0;
    incorrectCount = 0;
    questionState.clear();
    updateScore();

    document.querySelectorAll('.question-block').forEach(function(block) {
        block.querySelectorAll('input[type="radio"]').forEach(function(input) {
            input.checked = false;
        });

        block.querySelectorAll('.option').forEach(function(option) {
            option.classList.remove('selected-correct', 'selected-incorrect');
            option.style.pointerEvents = 'auto';
            option.style.opacity = '1';
        });

        block.querySelectorAll('.answer-feedback').forEach(function(feedback) {
            feedback.classList.remove('show');
        });
    });
}

window.addEventListener('DOMContentLoaded', function() {
    loadQuestionsData();
});
