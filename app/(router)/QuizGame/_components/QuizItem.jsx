"use client";
import Image from 'next/image';
import React from 'react';

function QuizItem({ quiz, onClick }) {
  if (!quiz) {
    return <div>No quiz data available</div>;
  }

  return (
    
    <div 
      className="border p-5 rounded-lg hover:shadow-md cursor-pointer hover:shadow-purple-200"
      onClick={() => onClick(quiz.quizId)} // Calls the onClick prop with the quiz ID
    >
      <Image src ={quiz?.banner?.url}
      width={700}
      height={150}
      alt='banner'
      className='rounded-t-xl'
      />
      <h3 className="font-bold">{quiz.quizName}</h3>
    </div>
  );
}

export default QuizItem;
