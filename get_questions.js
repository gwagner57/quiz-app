// Fetch the XML file
fetch('questions.xml')
  .then(response => response.text())
  .then(xmlString => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    // Get the container div to append questions
    const containerDiv = document.querySelector('.container');

    // Get all question elements from the XML
    const questionElements = xmlDoc.querySelectorAll('question');

    // Loop through each question and create corresponding HTML elements
    questionElements.forEach((questionElement, index) => {
      const questionContainer = document.createElement ('div');
      questionContainer.setAttribute('class', 'question');
      const questionSeq = document.createElement ('div');
      questionSeq.setAttribute('class', 'sequence');
      questionSeq.innerHTML = `<div id="sequence">${index + 1}</div>`;
      const questionAndchoices = document.createElement ('div');
      questionAndchoices.setAttribute('class', 'question-right');
      const questionDiv = document.createElement('div');
      questionDiv.setAttribute('class', 'question-text');
      questionDiv.innerHTML = `
        <div class="question-text">${questionElement.querySelector('text').textContent}</div>
      `;
      const answerChoicesDiv = document.createElement('div');
      answerChoicesDiv.setAttribute('class', 'question-choice');
      for (let i = 1; i <= 4; i++) {
        const choiceText = questionElement.querySelector(`choice${i}`).textContent;
        const choiceLabel = document.createElement('label');
        choiceLabel.innerHTML = `
          <input type="radio" name="question${index + 1}-answer" value="${i}">
          ${choiceText}<br>
        `;
        answerChoicesDiv.appendChild(choiceLabel);
      }
      

      containerDiv.appendChild(questionContainer);
      questionContainer.appendChild(questionSeq);
      questionContainer.appendChild(questionAndchoices);
      questionAndchoices.appendChild(questionDiv);
      questionAndchoices.appendChild(answerChoicesDiv);
    });
    // Add the "Finish the Quizz" button
    const finishButton = document.createElement('a');
    finishButton.setAttribute('class', 'btn');
    finishButton.setAttribute('href', '#');
    finishButton.textContent = 'Finish the Quizz';
    containerDiv.appendChild(finishButton);
    // Function to collect user choices
    
  // Function to collect user choices
  function collectUserChoices() {
    const userChoices = [];
    const questionElements = document.querySelectorAll('.question');

    questionElements.forEach((questionElement, index) => {
    const selectedChoice = document.querySelector(`input[name="question${index + 1}-answer"]:checked`);
      if (selectedChoice) {
        const selectedValue = parseInt(selectedChoice.value);
        userChoices.push(selectedValue);
     }
  });

  return userChoices;
  }

    // Function to handle the "Finish the Quizz" button click
    function finishQuizz() {
      const userChoices = collectUserChoices();
      localStorage.setItem('userChoices', JSON.stringify(userChoices));
      window.location.href = 'performance.html'; // Change to the URL of your result page
    }

    // Add event listener to the "Finish the Quizz" button
    finishButton.addEventListener('click', finishQuizz);
  })
  .catch(error => {
    console.error('Error fetching or parsing the XML file:', error);
  });
    