const fs = require('fs');
const { DOMParser } = require('xmldom');
const admin = require('firebase-admin');

const serviceAccount = require('./quiz-app-9f2e2-firebase-adminsdk-zpn9a-c27749ff34.json');

// Initiate connection to Firestore DB
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Function to get the latest ID from the collection
async function getLastID(collectionRef) {
  const snapshot = await collectionRef.get();
  if (snapshot.empty) {
    // If no documents, start from 0
    return 0; 
  } else {
    const lastDocument = snapshot.docs[snapshot.docs.length - 1];
    return parseInt(lastDocument.id, 10);
  }
}

// Function to add documents to Firestore with custom IDs starting from the latest ID + 1
async function addDocumentsWithCustomIDs(collection, documents) {
  const lastID = await getLastID(collection);
  for (const [index, document] of documents.entries()) {
    const id = (lastID + index + 1).toString().padStart(4, '0');
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

// Read XML file and convert to JSON
const xmlFilePath = 'questions-about-HTML.xml';
const xmlString = fs.readFileSync(xmlFilePath, 'utf-8');

// create question and adding attribute "type"
const convertQuestionNodeToJson = (node) => {
  const question = {
    type: node.getAttribute('type'),
  };
  // convert node.childNodes (questions) into an array
  const childNodesArray = Array.from(node.childNodes);
  // Loop inside the (question)
  childNodesArray.forEach((childNode) => {

    // ensure inly valid question attributes processed and save tagname and text content
    if (childNode.nodeType === 1 && childNode.tagName !== 'type') {
      const tagName = childNode.tagName;
      const textContent = childNode.textContent.trim();

      // check tagname processed before or 1st time, if 1st time it creates array for the tag name
      if (!question[tagName]) {
        question[tagName] = [];
      }
      
      // create element data to save attribute and its value
      const elementData = {
        value: textContent,
        attributes: {},
      };
      
      // converts attributes into array and iterate through each attribute and attribute vlaue
      const attributes = Array.from(childNode.attributes);
      attributes.forEach((attribute) => {
        elementData.attributes[attribute.name] = attribute.value;
      });
      
      // push the attributes and associate it with the tagname 
      question[tagName].push(elementData);
    }
  });
  // return the question after processing all the properties and the attributes under it.
  return question;
};

// parse xml document, create question array and set current category to null
const convertXmlToJson = (xml) => {
  const xmlDoc = parseXml(xml);
  const questions = [];
  let currentCategory = null;
  
  // retrive all questions
  const questionNodes = xmlDoc.getElementsByTagName('question');

  // loop through each question
  for (let i = 0; i < questionNodes.length; i++) {
    const node = questionNodes[i];
    // check if there is current question has a tagname "category" and stores it in "currentCategory"
    if (node.getAttribute('type') === 'category') {
      currentCategory = node.getElementsByTagName('category')[0].textContent;
      // if the question doesn't contain  tagname "Category"
    } else {
      // convert xml question to jason format 
      const question = convertQuestionNodeToJson(node);
      // add property category to the question and sets the value to "currentCategory"
      if (currentCategory) {
        question.category = currentCategory;
      }
      // puch question into questions array
      questions.push(question);
    }
  }
  // return questions array 
  return questions;
};

// call convertXmlToJson to convert XML document to JSON-format string
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
