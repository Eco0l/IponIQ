"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useUser } from '@clerk/nextjs';
import { Award, ListChecks, Calendar } from 'lucide-react'; // Importing icons from Lucide
import { Line } from 'react-chartjs-2'; // Import chart.js for graphs
import 'chart.js/auto'; // Needed for chart.js setup
import QuizAPI from '@/app/_utils/QuizAPI'; // Import the QuizAPI

const DashboardDetails = () => {
  const { user } = useUser(); // Access authenticated user's data
  const userId = user?.id; // Retrieve the userId from Clerk
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [highestScoreQuiz, setHighestScoreQuiz] = useState(null);
  const [averageCorrectAnswers, setAverageCorrectAnswers] = useState(0); // Track average correct answers
  const [quizData, setQuizData] = useState([]);
  const [quizzesFromAPI, setQuizzesFromAPI] = useState([]);

  useEffect(() => {
    const fetchQuizStats = async () => {
      try {
        // Fetch all quizzes the user has completed from Firestore
        const quizzesRef = collection(db, 'quiz_scores');
        const q = query(quizzesRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        const quizzes = [];
        let totalCorrectAnswers = 0;

        querySnapshot.forEach((doc) => {
          const quizData = doc.data();
          quizzes.push(quizData);
          totalCorrectAnswers += quizData.correctAnswers || 0; // Sum up correct answers
        });

        // Set total quizzes done
        setTotalQuizzes(quizzes.length);

        if (quizzes.length > 0) {
          // Calculate average correct answers
          const avgCorrectAnswers = totalCorrectAnswers / quizzes.length;
          setAverageCorrectAnswers(avgCorrectAnswers.toFixed(2));

          // Find the quiz with the highest score
          const highestScoreQuiz = quizzes.reduce((prevQuiz, currentQuiz) => {
            return prevQuiz.score > currentQuiz.score ? prevQuiz : currentQuiz;
          });
          setHighestScoreQuiz(highestScoreQuiz);

          // Set quiz data for graph
          setQuizData(quizzes.map((quiz) => ({
            score: quiz.score,
            timestamp: quiz.timestamp ? quiz.timestamp.toDate() : null, // Convert Firestore timestamp
            quizName: quiz.quizName || 'Unknown Quiz',
          })));
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    const fetchQuizzesFromAPI = async () => {
      try {
        const { quizzes } = await QuizAPI.getAllQuiz();
        setQuizzesFromAPI(quizzes); // Set the quizzes fetched from Hygraph
      } catch (error) {
        console.error('Error fetching quizzes from API:', error);
      }
    };

    if (userId) {
      fetchQuizStats();
      fetchQuizzesFromAPI(); // Fetch quizzes from Hygraph
    }
  }, [userId]);

  // Prepare data for the graph
  const chartData = {
    labels: quizData.map((quiz) =>
      quiz.timestamp ? quiz.timestamp.toLocaleDateString() : 'Unknown Date'
    ),
    datasets: [
      {
        label: 'Quiz Scores Over Time',
        data: quizData.map((quiz) => quiz.score),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  // Find the quiz name from the Hygraph API data
  const getQuizNameById = (quizId) => {
    const quiz = quizzesFromAPI.find((q) => q.quizId === quizId);
    return quiz ? quiz.quizName : 'Unknown Quiz';
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-5 text-gray-800">Dashboard Details</h2>

      {/* Total quizzes completed */}
      <div className="mb-6 bg-white shadow-md rounded-lg p-5 flex items-center space-x-4">
        <ListChecks className="text-blue-500 w-8 h-8" />
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Total Quizzes Completed</h3>
          <p className="text-2xl font-bold text-gray-900">{totalQuizzes}</p>
        </div>
      </div>

      {/* Highest score and quiz name */}
      {highestScoreQuiz ? (
        <div className="bg-white shadow-md rounded-lg p-5 flex items-center space-x-4">
          <Award className="text-yellow-500 w-8 h-8" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Highest Score</h3>
            <p className="text-2xl font-bold text-gray-900">Score: {highestScoreQuiz.score}</p>
            <p className="text-md text-gray-600">
              Quiz: {getQuizNameById(highestScoreQuiz.quizId)}
            </p>
            <p className="text-md text-gray-600">
              Finished on:{' '}
              {highestScoreQuiz.timestamp
                ? highestScoreQuiz.timestamp.toDate().toLocaleString()
                : 'Unknown Date'}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-5">
          <p className="text-gray-600">No quizzes completed yet.</p>
        </div>
      )}

      {/* Average correct answers */}
      <div className="mt-6 bg-white shadow-md rounded-lg p-5 flex items-center space-x-4">
        <ListChecks className="text-green-500 w-8 h-8" />
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Average Correct Answers</h3>
          <p className="text-2xl font-bold text-gray-900">{averageCorrectAnswers}</p>
        </div>
      </div>

      {/* Line graph showing quiz scores over time */}
      {quizData.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-5 mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Progress Over Time</h3>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default DashboardDetails;
