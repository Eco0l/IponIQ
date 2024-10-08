"use client";
import React, { useEffect, useState } from 'react';
import QuizAPI from '@/app/_utils/QuizAPI';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion'; // For smooth animations
import { db } from '@/firebaseConfig';
import { getFirestore, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useUser } from '@clerk/nextjs';

function QuizGame({ quizId, onClose }) {
  const { user } = useUser(); // This gives access to authenticated user's data
  const userId = user?.id; // Retrieve the userId from Clerk
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // Timer for each question
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const [isGameOver, setIsGameOver] = useState(false); // Track if game is over
  const storeScoreInFirestore = async (userId, quizId, score ) => {
    try {
      const scoreRef = doc(db, 'quiz_scores', `${userId}_${quizId}`);
      await setDoc(scoreRef, {
        userId: userId,
        quizId: quizId,
        score: score,
        timestamp: serverTimestamp(), // Correct use of serverTimestamp
        user_fname: user.firstName || ""
      });
      console.log('Score successfully stored in Firestore');
    } catch (error) {
      console.error('Error storing score:', error);
    }
  };

  
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        const response = await QuizAPI.getAllQuiz();
        const quizData = response.quizzes.find((quiz) => quiz.quizId === quizId);
        const quizQuestions = response.questions.filter((question, index) => index < 10); // Limit to 10 questions
        if (quizQuestions.length === 0) {
          throw new Error("No questions found for this quiz.");
        }
        setQuestions(quizQuestions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz:', error);
        setError('Failed to load quiz');
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isGameOver) {
      setIsGameOver(true); // End the game if time runs out
    }
  }, [timeLeft, isGameOver]);

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion) {
      const correctAnswer = currentQuestion.correctAnswer;
      if (selectedAnswer === correctAnswer) {
        const timeBonus = timeLeft * 10; // Faster response, higher score
        setScore(score + 100 + timeBonus);
      }

      // Move to the next question or end the game
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeLeft(30); // Reset timer for the next question
      } else {
        setIsGameOver(true); // End the game after 10 questions
      }
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(30);
    setIsGameOver(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!questions.length) return <div>No questions available</div>; // Check for empty questions

  const currentQuestion = questions[currentQuestionIndex];

  if (isGameOver) {
    storeScoreInFirestore(userId, quizId, score); // Assuming you have access to `userId` and `quizId`
    return (
      <div className="p-5">
        <h2 className="text-lg font-bold mb-3">Quiz Complete!</h2>
        <p>Your final score: {score}</p>

        <div className="mt-4">
          <button onClick={handleRetry} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Retry Quiz
          </button>
          <button onClick={onClose} className="ml-4 text-red-500 hover:text-red-700">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-lg font-bold mb-3">Quiz Game</h2>

      {/* Display question */}
      {currentQuestion && currentQuestion.questionText ? (
        <motion.div
          key={currentQuestion.questionId} // Make sure questionId exists before using it
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-4">{currentQuestion.questionText}</p>

          {/* Display choices */}
          {currentQuestion.choices && currentQuestion.choices.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.choices.map((choice, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                  onClick={() => handleAnswer(choice)}
                >
                  {choice}
                </motion.button>
              ))}
            </div>
          ) : (
            <div>No choices available</div>
          )}

          {/* Timer and Score */}
          <div className="mt-4">
            <p>Time left: {timeLeft}s</p>
            <p>Score: {score}</p>

            {/* Circular progress bar for timer with custom size */}
            <div style={{ width: 100, height: 100, margin: '0 auto' }}>
              <CircularProgressbar
                value={timeLeft}
                maxValue={30}
                text={`${timeLeft}s`}
                styles={buildStyles({
                  textColor: '#000',
                  pathColor: `rgba(62, 152, 199, ${timeLeft / 30})`,
                  trailColor: '#d6d6d6',
                })}
              />
            </div>
          </div>

          {/* Close button */}
          <button onClick={onClose} className="mt-4 text-red-500">
            Close Quiz
          </button>
        </motion.div>
      ) : (
        <div>No question available</div>
      )}
    </div>
  );
}

export default QuizGame;
