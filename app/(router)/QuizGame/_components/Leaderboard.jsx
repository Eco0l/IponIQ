"use client";
import React, { useState, useEffect } from "react";
import { collection, query, orderBy, limit, where, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig"; // Import your Firebase config
import { motion } from "framer-motion"; // For smooth animations
import QuizAPI from "@/app/_utils/QuizAPI"; // Assuming you have an API utility for fetching quizzes
import { ChevronLeft, ChevronRight, Award, User } from "lucide-react"; // Lucide Icons

function Leaderboards() {
  const [leaderboards, setLeaderboards] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizDetails, setQuizDetails] = useState([]); // Store quiz details (quizId and quizName)

  // Fetch quiz data from Hygraph and leaderboard data from Firestore
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        // Fetch quiz details from Hygraph (quizId and quizName)
        const response = await QuizAPI.getAllQuiz();
        const quizzes = response.quizzes; // Assuming quizzes include quizId and quizName
        setQuizDetails(quizzes); // Store quizId and quizName for each quiz

        const leaderboardData = [];

        // Fetch leaderboard data for each quiz
        for (const quiz of quizzes) {
          const quizScoresQuery = query(
            collection(db, "quiz_scores"),
            where("quizId", "==", quiz.quizId),
            orderBy("score", "desc"),
            limit(5) // Get top 5 scorers per quiz
          );
          const scoresSnapshot = await getDocs(quizScoresQuery);
          const topScores = scoresSnapshot.docs.map((doc) => doc.data());

          leaderboardData.push({
            quizId: quiz.quizId,
            quizName: quiz.quizName,
            topScores: topScores.map((scoreData) => ({
              score: scoreData.score,
              user_fname: scoreData.user_fname || "Anonymous",
            })),
          });
        }

        setLeaderboards(leaderboardData);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  // Function to move to the next quiz leaderboard slide
  const handleNext = () => {
    setCurrentQuizIndex((prevIndex) => (prevIndex + 1) % quizDetails.length);
  };

  // Function to move to the previous quiz leaderboard slide
  const handlePrev = () => {
    setCurrentQuizIndex((prevIndex) => (prevIndex - 1 + quizDetails.length) % quizDetails.length);
  };

  const currentLeaderboard = leaderboards[currentQuizIndex];

  if (leaderboards.length === 0) {
    return <div className="text-center text-gray-600">Loading leaderboards...</div>;
  }

  return (
    <div className="p-5 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">
        Leaderboards <Award className="inline ml-2" size={24} />
      </h2>

      {currentLeaderboard ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          key={currentLeaderboard.quizId}
        >
          <h3 className="text-xl font-semibold text-indigo-500 mb-4 text-center">
            {currentLeaderboard.quizName}
          </h3>

          <table className="table-auto w-full text-left border-separate border-spacing-2">
            <thead>
              <tr className="bg-indigo-100 text-indigo-800">
                <th className="px-4 py-2">Rank</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {currentLeaderboard.topScores.map((scoreData, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-4 py-2 font-semibold">{index + 1}</td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <User className="text-indigo-500" size={20} /> {scoreData.user_fname}
                  </td>
                  <td className="px-4 py-2 text-indigo-600 font-semibold">{scoreData.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      ) : (
        <div className="text-center text-gray-600">No leaderboard available</div>
      )}

      {/* Slider Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrev}
          className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          <ChevronLeft size={20} className="mr-2" />
          Previous Quiz
        </button>
        <button
          onClick={handleNext}
          className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          Next Quiz
          <ChevronRight size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
}

export default Leaderboards;
