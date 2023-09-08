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
      const question = {
        type: node.getAttribute('type'),
      };
  
      const childNodesArray = Array.from(node.childNodes);
  
      childNodesArray.forEach((childNode) => {
        if (childNode.nodeType === 1 && childNode.tagName !== 'type') {
          const tagName = childNode.tagName;
          const textContent = childNode.textContent.trim();
            
          if (!question[tagName]) {
            question[tagName] = [];
          }
            
          const elementData = {
            value: textContent,
            attributes: {},
          };
  
          const attributes = Array.from(childNode.attributes);
          attributes.forEach((attribute) => {
            elementData.attributes[attribute.name] = attribute.value;
          });
  
          question[tagName].push(elementData);
        }
      });
  
      return question;
    };
  
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
