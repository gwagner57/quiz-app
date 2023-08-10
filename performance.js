// performance.js
document.addEventListener('DOMContentLoaded', () => {
    const resultsDiv = document.getElementById('results');
    
    // Get user choices from local storage
    const userChoices = JSON.parse(localStorage.getItem('userChoices'));
  
    // Fetch the XML file to get correct answers
    fetch('questions.xml')
      .then(response => response.text())
      .then(xmlString => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  
        // Compare user choices with correct answers and calculate score
        let score = 0;
        userChoices.forEach((userChoice, index) => {
          const correctAnswer = parseInt(xmlDoc.querySelector(`question[id="${index + 1}"] answer`).textContent);
          if (userChoice === correctAnswer) {
            score++;
          }
        });
  
        // Display the results
        resultsDiv.textContent = `Your score: ${score} out of ${userChoices.length}`;
      })
      .catch(error => {
        console.error('Error fetching or parsing the XML file:', error);
      });
  });
  