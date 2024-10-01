"use client"
import React, { useEffect, useState } from 'react';
import QuizAPI from '@/app/_utils/QuizAPI';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import QuizItem from './QuizItem'; // Ensure this component is defined

function QuizList() {
  const [quizList, setQuizList] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAllQuizzes();
  }, []);

  const fetchAllQuizzes = async () => {
    try {
      const resp = await QuizAPI.getAllQuiz();
      console.log('Fetched Quizzes:', resp); // Inspect the fetched data
      setQuizList(resp.quizzes || []); // Set quizList directly from the response
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      setQuizList([]);
    }
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredQuizzes = quizList.filter((quiz) => {
    if (filter === 'all') return true;
    return quiz.status === filter; // Ensure quizzes have a 'status' property; adjust if necessary
  });

  return (
    <div className="p-5 bg-white rounded-lg mt-3">
      <h2 className="text-[20px] font-bold text-blue-500">All Quizzes</h2>
      <Select onValueChange={handleFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="new">New</SelectItem>
          <SelectItem value="unfinished">Unfinished</SelectItem>
          <SelectItem value="finished">Finished</SelectItem>
        </SelectContent>
      </Select>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
        {filteredQuizzes.map((quiz, index) => (
          <div key={index}>
            <QuizItem quiz={quiz} /> {/* Pass quiz with only the name */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizList;
