"use client";
import React, { useState, useEffect } from "react";
import { collection, query, orderBy, limit, where, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig"; // Import Firebase config
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
        const response = await QuizAPI.getAllQuiz();
        const quizzes = response.quizzes;
        setQuizDetails(quizzes);

        const leaderboardData = [];

        // Fetch leaderboard data for each quiz
        for (const quiz of quizzes) {
          const quizScoresQuery = query(
            collection(db, "quiz_scores"),
            where("quizId", "==", quiz.quizId),
            orderBy("score", "desc"),
            limit(3) // Limit to top 3 scorers per quiz
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
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-indigo-700 flex items-center justify-center">
        Leaderboards <Award className="inline ml-3" size={28} />
      </h2>

      {currentLeaderboard ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          key={currentLeaderboard.quizId}
        >
          <h3 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
            {currentLeaderboard.quizName}
          </h3>

          <table className="table-auto w-full text-left">
            <thead>
              <tr className="bg-indigo-300 text-indigo-900">
                <th className="px-4 py-3 font-bold">Rank</th>
                <th className="px-4 py-3 font-bold">Name</th>
                <th className="px-4 py-3 font-bold">Score</th>
              </tr>
            </thead>
            <tbody>
              {currentLeaderboard.topScores.map((scoreData, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-indigo-100" : "bg-indigo-50"
                  } hover:bg-indigo-200 transition-all`}
                >
                  <td className="px-4 py-3 font-semibold">{index + 1}</td>
                  <td className="px-4 py-3 flex items-center gap-3">
                    <User className="text-indigo-600" size={22} />
                    {scoreData.user_fname}
                  </td>
                  <td className="px-4 py-3 text-indigo-700 font-semibold">{scoreData.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      ) : (
        <div className="text-center text-gray-600">No leaderboard available</div>
      )}

      {/* Slider Controls */}
      <div className="flex justify-between items-center mt-10">
        <button
          onClick={handlePrev}
          className="flex items-center bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition transform hover:scale-105"
        >
          <ChevronLeft size={24} className="mr-2" />
          Previous Quiz
        </button>
        <button
          onClick={handleNext}
          className="flex items-center bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition transform hover:scale-105"
        >
          Next Quiz
          <ChevronRight size={24} className="ml-2" />
        </button>
      </div>
    </div>
  );
}

export default Leaderboards;
