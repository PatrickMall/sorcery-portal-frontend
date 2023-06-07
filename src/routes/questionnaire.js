import React, { useEffect, useState } from 'react';
import apiRoute from '../lib/apiRoute';
import authAxios from '../lib/authAxios';
const Questionnaire = ({ changeBackground }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState();
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const response = await authAxios.get(`${apiRoute}/api/v1/questions`);
    const data = await response;
    setQuestions(data.data.data);
  };

  const handleAnswerChange = (e) => {
    const newAnswer = e.target.value
    setAnswer(newAnswer);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      changeBackground()
    } else {
      window.location.href = "/";
    }
  };
  console.log(currentQuestionIndex + 1)
  console.log(answer)
  const saveAnswer = async () => {
    const response = await authAxios.post(`${apiRoute}api/v1/answers`, { question_id: currentQuestionIndex + 1, answer: answer });
    console.log(response)
    setAnswer("")
  };

  const currentQuestion = questions[currentQuestionIndex];
  
  if (currentQuestionIndex < questions.length) {
    return (
    
      <div className='py-16 px-32 bg-black-transparent rounded-xl'>
        {currentQuestion && (
          <div className='w-screen'>
            <h3 className='forum text-6xl'>Question {currentQuestionIndex + 1}</h3>
            <h4 className='forum text-3xl mt-8'>{currentQuestion.category}</h4>
            <p className='forum text-2xl mt-8'>{currentQuestion.text}</p>
            <textarea
              className='bg-black-transparent2 border border-white rounded-sm w-9/12 h-64 mont mt-4 focus:outline-none box-shadow p-4'
              value={answer}
              onChange={handleAnswerChange}
            />
          </div>
        )}
        <button className='button mt-8' onClick={(e) => { e.preventDefault(); saveAnswer(); handleNextQuestion() }}>
          {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>);
  } else {
    

  }

}

export default Questionnaire;