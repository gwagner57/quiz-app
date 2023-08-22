const admin = require("firebase-admin");

const serviceAccount = require("./quiz-app-9f2e2-firebase-adminsdk-zpn9a-c27749ff34.json");

const quizzesData = require('./quizzes.json');
const questionsData = require('./questions.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function importData() {
  try {
    // Import questions
    for (const question of questionsData) {
      const questionId = question.id.toString();
      delete question.id;
      await db.collection('questions').doc(questionId).set(question);
      console.log(`Question ${questionId} imported`);
    }

    // Import quizzes
    for (const quiz of quizzesData) {
      const quizId = quiz.id.toString();
      const quizData = { ...quiz };
      delete quiz.id;
      quizData.questions = quizData.questions.map(questionId => db.collection('questions').doc(questionId.toString()));
      await db.collection('quizzes').doc(quizId).set(quizData);
      console.log(`Quiz ${quizId} imported`);
    }

    console.log('Data import complete');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

importData();