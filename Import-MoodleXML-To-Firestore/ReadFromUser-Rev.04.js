const fs = require('fs');
const readline = require('readline');
const { DOMParser } = require('xmldom');
const admin = require('firebase-admin');

const serviceAccount = require('./quiz-app-9f2e2-firebase-adminsdk-zpn9a-c27749ff34.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initiate connection to Firestore DB
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Function to get the latest ID from the collection
async function getLastID(collectionRef) {
  const snapshot = await collectionRef.get();
  if (snapshot.empty) {
    return 0; // If no documents, start from 0
  } else {
    const lastDocument = snapshot.docs[snapshot.docs.length - 1];
    return parseInt(lastDocument.id, 10);
  }
}

// Function to add documents to Firestore with custom IDs starting from the latest ID + 1
async function addDocumentsWithCustomIDs(collection, documents) {
  const lastID = await getLastID(collection);
  for (const [index, document] of documents.entries()) {
    const id = (lastID + index + 1).toString().padStart(3, '0'); // Generate IDs (001, 002, 003,.......)
    await collection.doc(id).set(document);
    console.log(`Document ${id} added to ${collection.path}`);
  }
}

// Function to parse XML
const parseXml = (xml) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, 'text/xml');
  return xmlDoc;
};

// Ask user for XML file path
rl.question('Enter the path to the XML file: ', async (xmlFilePath) => {
  try {
    const xmlString = fs.readFileSync(xmlFilePath, 'utf-8');
    
    // Convert XML to JSON
    const convertQuestionNodeToJson = (node) => {
      let TP = node.getAttribute('type');
      let question = {
        Type: null, // Default value
      };
    
      if (TP === 'multichoice') {
        question.Type = 1;
      } else if (TP === 'shortanswer') {
        question.Type = 2;
      } else if (TP === 'numerical') {
        question.Type = 3;
      } else if (TP === 'truefalse') {
        question.Type = 4;
      }
  
      const childNodesArray = Array.from(node.childNodes); 
       childNodesArray.forEach((childNode) => {
        // choose the required attributes
        if(childNode.tagName === 'name' || childNode.tagName === 'questiontext' || childNode.tagName === 'answer' || childNode.tagName === 'single' || childNode.tagName === 'generalfeedback'){       
          if (childNode.nodeType === 1 && childNode.tagName !== 'type') {
            let tagName;
          
            // adjust attribute names as per scheme
            if(childNode.tagName === 'single'){
              tagName = 'HasSingleCorrectAnswer';
              const textContent = childNode.textContent.trim();
              let CorrectAnswer = new Boolean(false);
              if (!question[tagName]) {
                question[tagName];
              }
              if (textContent === 'true'){
                CorrectAnswer = new Boolean(true);
              }

              if (!question[tagName]) {
                question[tagName] = CorrectAnswer;
              }

            // change and import shortanswer as per required scheme
            }else if(childNode.tagName === 'answer' && node.getAttribute('type') === 'shortanswer'){
              tagName = 'correctAnswers';
              const textContent = childNode.textContent.trim();
              
               
              const attributes = Array.from(childNode.attributes);
              let Grade =new Number(0);

              attributes.forEach((attribute) => {
               if(attribute.name === 'fraction'){
                 if(attribute.value < 100){
                   tagName = 'partiallyCorrectAnswers';
                 }
               }
              });

              if (!question[tagName]) {
                question[tagName] = [];
               }

              attributes.forEach((attribute) => {
              if(attribute.name === 'fraction'){
                Grade = Number(attribute.value);
              }
              });

              const elementData = {
              answerText: textContent,
              gradePoints: Grade,
              };

              question[tagName].push(elementData);

            // change and import numerical as per required scheme
            }else  if(childNode.tagName === 'answer' && node.getAttribute('type') === 'numerical'){
              tagName = 'correctNumericalAnswer';
              const textNode = Array.from(childNode.childNodes).find(node => node.tagName === 'text');
              const textContent =new Number(textNode.textContent.trim());
              const feedbackNode = Array.from(childNode.childNodes).find(node => node.tagName === 'feedback');
              const feedbackContent = feedbackNode.textContent.trim();

              const attributes = Array.from(childNode.attributes);
              let Grade =new Number(0);

              attributes.forEach((attribute) => {
               if(attribute.name === 'fraction'){
                 if(attribute.value < 100){
                   tagName = 'partiallyCorrectNumericalAnswers';
                 }
               }
              });

              if (!question[tagName]) {
                question[tagName] = [];
               }

              attributes.forEach((attribute) => {
              if(attribute.name === 'fraction'){
                Grade = Number(attribute.value);
              }
              });

              const elementData = {
              answer: textContent,
              gradePoints: Grade,
              feedBack: feedbackContent
              };

              question[tagName].push(elementData);

            // change and import multichoice as per required scheme  
            }else if(childNode.tagName === 'answer'){
              tagName = 'answerOptions';
              const textContent = childNode.textContent.trim();
             
               
              const attributes = Array.from(childNode.attributes);
              let Grade = new Number(0);
              let Correct = new Boolean(false);
              attributes.forEach((attribute) => {
              if(attribute.name === 'fraction'){
                Grade = Number(attribute.value);
                if(attribute.value > 0){
                  Correct = Boolean(true);
                }
              }
              });

              if (!question[tagName]) {
               question[tagName] = [];
              }

              const elementData = {
               answerText: textContent,
               gradePoints: Grade,
               isCorrect: Correct
              };

              question[tagName].push(elementData);

            // change and import truefalse
            }else{
              tagName = childNode.tagName;
              const textContent = childNode.textContent.trim();
              
              if (!question[tagName]) {
               question[tagName] = textContent;
              }
            }
          }
        }
       });
  
      return question;
    };
    
    // add category to the questoin
    const convertXmlToJson = (xml) => {
      const xmlDoc = parseXml(xml);
      const questions = [];
      let currentCategory = null;
  
      const questionNodes = xmlDoc.getElementsByTagName('question');
      for (let i = 0; i < questionNodes.length; i++) {
        const node = questionNodes[i];
        if (node.getAttribute('type') === 'category') {
          currentCategory = node.getElementsByTagName('category')[0].textContent;
        } else {
          const question = convertQuestionNodeToJson(node);
          if (currentCategory) {
            question.category = currentCategory;
          }
          questions.push(question);
        }
      }
  
      return questions;
    };
  
    const jsonQuestions = convertXmlToJson(xmlString);
    const jsonString = JSON.stringify(jsonQuestions, null, 2);
  
    // Import JSON data into Firestore
    async function importJSONData() {
      try {
        const questionsData = JSON.parse(jsonString); // Parse JSON string directly
        const collectionRef = db.collection('MoodleQuestions');
        await addDocumentsWithCustomIDs(collectionRef, questionsData);
        console.log('Import completed successfully.');
      } catch (error) {
        console.error('Error importing JSON data:', error);
      } finally {
        
        // delete questions with no answer
        const noAnswer =await db.collection('MoodleQuestions').where('Type', '==' ,null).get();
        noAnswer.forEach(element => {
         element.ref.delete();
         console.log(`Document ${element.id} deleted from MoodleQuestions`);
        });
        admin.app().delete();
      }
    }
  
    // Call the function to start the data import
    importJSONData();
  } catch (error) {
    console.error('Error reading XML file:', error);
  } finally {
    rl.close();
  }
});