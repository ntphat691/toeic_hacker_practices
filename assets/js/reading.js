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
  questionsData.parts.forEach(function (part) {
    if (part.questions) {
      total += part.questions.length;
    }
    if (part.passages) {
      part.passages.forEach(function (passage) {
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

  questionsData.parts.forEach(function (part, partIndex) {
    var partHeader = document.createElement('div');
    partHeader.className = 'passage';
    partHeader.innerHTML = '<h2>Part ' + part.partNumber + ' - ' + part.title + '</h2>';
    if (part.instructions) {
      partHeader.innerHTML += '<p style="margin-bottom: 15px; line-height: 1.6;">' + part.instructions + '</p>';
    }
    container.appendChild(partHeader);

    if (part.questions) {
      part.questions.forEach(function (q) {
        var questionDiv = document.createElement('div');
        questionDiv.className = 'question-block';

        var optionsHTML = q.options.map(function (opt, idx) {
          var letter = String.fromCharCode(65 + idx);
          return '<div class="option" onclick="selectAnswer(this, \'' + q.id + '\', \'' + q.correctAnswer + '\')"><input type="radio" name="' + q.id + '" value="' + letter + '" id="' + q.id + letter + '"><label for="' + q.id + letter + '">(' + letter + ') ' + opt.text + '</label></div>';
        }).join('');

        questionDiv.innerHTML = '<span class="question-number">Question ' + q.id.replace('q', '') + '</span><p style="margin-bottom: 15px; line-height: 1.6;">' + q.question + '</p><div class="options">' + optionsHTML + '</div><div class="answer-feedback" id="feedback-' + q.id + '"></div>';

        container.appendChild(questionDiv);
      });
    }

    if (part.passages) {
      part.passages.forEach(function (passage, passageIndex) {
        var passageDiv = document.createElement('div');
        passageDiv.className = 'passage';
        var passageHTML = '<h2>' + passage.passage + '</h2>';
        if (passage.image && passage.image !== '') {
          passageHTML += '<img src="' + passage.image + '" alt="' + passage.passage + '" style="max-width: 100%; height: auto; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">';
        }
        if (passage.text && passage.text !== '') {
          passageHTML += '<div class="passage-text">' + passage.text + '</div>';
        }
        passageDiv.innerHTML = passageHTML;
        container.appendChild(passageDiv);

        if (passage.questions) {
          passage.questions.forEach(function (q) {
            var questionDiv = document.createElement('div');
            questionDiv.className = 'question-block';

            var optionsHTML = q.options.map(function (opt, idx) {
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

function recomputeScore() {
  var c = 0;
  var i = 0;
  for (var v of questionState.values()) {
    if (v === true) c++;
    else if (v === false) i++;
  }
  correctCount = c;
  incorrectCount = i;
}

function lockQuestion(questionId) {
  var options = document.querySelectorAll('.option input[name="' + questionId + '"]');
  options.forEach(function (inp) {
    var opt = inp.closest('.option');
    if (opt) {
      opt.style.pointerEvents = 'none';
      opt.style.opacity = '0.7';
    }
  });
}

function selectAnswer(optionElement, questionId, correctAnswer) {
  var input = optionElement.querySelector('input');

  // Clear previous selection if any
  var allInputs = document.querySelectorAll('.option input[name="' + questionId + '"]');
  allInputs.forEach(function (inp) {
    var opt = inp.closest('.option');
    opt.classList.remove('selected-correct', 'selected-incorrect');
    inp.checked = false;
  });

  // Check the clicked input
  input.checked = true;
  var selectedValue = input.value;
  var feedbackDiv = document.getElementById('feedback-' + questionId);

  if (selectedValue === correctAnswer) {
    optionElement.classList.add('selected-correct');
    feedbackDiv.textContent = '✓ Correct!';
    feedbackDiv.classList.remove('incorrect');
    feedbackDiv.classList.add('correct');
    questionState.set(questionId, true);
    lockQuestion(questionId);
  } else {
    optionElement.classList.add('selected-incorrect');
    feedbackDiv.textContent = '✗ Incorrect. Try again!';
    feedbackDiv.classList.remove('correct');
    feedbackDiv.classList.add('incorrect');
    // Don't lock on incorrect answer - allow re-selection
    // Remove from state if previously marked as incorrect
    if (questionState.get(questionId) === false) {
      questionState.delete(questionId);
    }
  }

  feedbackDiv.classList.add('show');
  recomputeScore();
  updateScore();
}

function updateScore() {
  document.getElementById('correctScore').textContent = correctCount;
  document.getElementById('incorrectScore').textContent = incorrectCount;
  document.getElementById('totalScore').textContent = (correctCount + incorrectCount) + '/' + getTotalQuestions();
}

function resetQuiz() {
  correctCount = 0;
  incorrectCount = 0;
  questionState.clear();

  var options = document.querySelectorAll('.option');
  options.forEach(function (opt) {
    opt.style.pointerEvents = 'auto';
    opt.style.opacity = '1';
    opt.classList.remove('selected-correct', 'selected-incorrect');
    opt.querySelector('input').checked = false;
  });

  var feedbacks = document.querySelectorAll('.answer-feedback');
  feedbacks.forEach(function (fb) {
    fb.classList.remove('show', 'correct', 'incorrect');
    fb.textContent = '';
  });

  updateScore();
}

window.onload = loadQuestionsData;
