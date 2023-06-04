import React, { useEffect, useState } from 'react';
import apiRoute from '../lib/apiRoute';

const Questionnaire = () => {
    const [questions, setQuestions] = useState([{text: 'What is your business name?', category: 'Business and Website Overview'}]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   const fetchQuestions = async () => {
//     const response = await fetch(`${apiRoute}/api/v1/questions`);
//     const data = await response.json();
//     setQuestions(data);
//   };

  const handleAnswerChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      saveAnswers();
    }
  };

  const saveAnswers = async () => {
    await fetch('/api/answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answers),
    });

    // Reset the questionnaire state after saving answers
    setCurrentQuestionIndex(0);
    setAnswers([]);
    // fetchQuestions();
  };

const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className='py-32 px-32'>
      {currentQuestion && (
        <div className='w-screen'>
                <h3 className='forum text-6xl'>Question {currentQuestionIndex + 1}</h3>
                <h4 className='forum text-3xl mt-8'>{currentQuestion.category}</h4>
                <p className='forum text-2xl mt-8'>{currentQuestion.text}</p>
          <textarea
            className='bg-black border border-white rounded-sm w-9/12 h-96 mont mt-4'
            value={answers[currentQuestionIndex] || ''}
            onChange={handleAnswerChange}
          />
        </div>
      )}
      <button className='button mt-8' onClick={handleNextQuestion}>
        {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
      </button>
    </div>
  );
};

export default Questionnaire;