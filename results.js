// Fetch the XML file containing correct answers
fetch('questions.xml')
  .then(response => response.text())
  .then(xmlString => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    // Store correct answers in an object
    const correctAnswers = {};
    const questionElements = xmlDoc.querySelectorAll('question');
    questionElements.forEach(questionElement => {
      const questionId = questionElement.getAttribute('id');
      const correctAnswer = questionElement.querySelector('answer').textContent;
      correctAnswers[questionId] = correctAnswer;
    });

    // Add event listener to the submit button
    const submitButton = document.getElementById('submitBtn');
    submitButton.addEventListener('click', () => {
      // Calculate the user's score
      let score = 0;
      questionElements.forEach(questionElement => {
        const questionId = questionElement.getAttribute('id');
        const userAnswer = document.querySelector(`input[name="question${questionId}"]:checked`);
        if (userAnswer) {
          if (userAnswer.value === correctAnswers[questionId]) {
            score++;
          }
        }
      });

      // Display the result to the user
      const resultMessage = `You scored ${score} out of ${questionElements.length}`;
      alert(resultMessage);
    });
  })
  .catch(error => {
    console.error('Error fetching or parsing the XML file:', error);
  });
