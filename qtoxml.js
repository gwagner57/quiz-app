const fs = require('fs');

const quizzData = require('./quizz.json');
const questionsData = require('./questions.json');

const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n';

let xmlContent = xmlHeader;

for (const question of questionsData) {
    xmlContent += `  <!-- question: ${question.id} -->\n`;
    xmlContent += `  <question id="${question.id}">\n`;
    xmlContent += `    <type>${JSON.stringify(question.type)}</type>\n`;
    xmlContent += `    <category>${JSON.stringify(question.category)}</category>\n`;
    xmlContent += `    <text>${JSON.stringify(question.text)}</text>\n`;
    xmlContent += `    <hasmanycorrectanswers>${JSON.stringify(question.hasmanycorrectanswers)}</hasmanycorrectanswers>\n`;
    xmlContent += `    <choice1>${JSON.stringify(question.choice1)}</choice1>\n`;
    xmlContent += `    <choice2>${JSON.stringify(question.choice2)}</choice2>\n`;
    xmlContent += `    <choice3>${JSON.stringify(question.choice3)}</choice3>\n`;
    xmlContent += `    <choice4>${JSON.stringify(question.choice4)}</choice4>\n`;
    xmlContent += `    <answer>${JSON.stringify(question.answer)}</answer>\n`;
    xmlContent += `  </question>\n`;
}

xmlContent += '</quiz>';

fs.writeFile('questions.xml', xmlContent, (err) => {
    if (err) {
        console.error('Error writing XML file:', err);
    } else {
        console.log('questions.xml has been successfully generated.');
    }
});
