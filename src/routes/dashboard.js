import authAxios from "../lib/authAxios"
import apiRoute from "../lib/apiRoute"
import { useEffect, useState } from "react"
import UpdateAnswer from "./update-answer"
import { Link } from "react-router-dom"

const Dashboard = () => {
    const [answers, setAnswers] = useState([])
    const [questions, setQuestions] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 1 // Number of questions per page
    const [updateOpen, setUpdateOpen] = useState(false)
    const [updatedAnswer, setUpdatedAnswer] = useState()
    console.log(updateOpen)
    async function fetchQuestionsAndAnswers() {
        const questionOffset = (currentPage - 1) * perPage;
        const answerOffset = (currentPage - 1) * perPage;
      
        const [questionData, answerData] = await Promise.all([
            authAxios.get(`${apiRoute}api/v1/questions?limit=${perPage}&offset=${questionOffset}`),
            authAxios.get(`${apiRoute}api/v1/answers?limit=${perPage}&offset=${answerOffset}`)
        ]);
        
        let fetchedAnswers;
        if (!updateOpen) {
            fetchedAnswers = answerData.data.data.map(answer => (
                <li className="m-8 flex" key={answer.id}><div className="h-64 overflow-scroll">{answer.answer}</div><div><button id={answer.question_id} onClick={(e) => { updateAnswer(e, answer)}} className="button text-black my-16 mx-4">Update</button></div></li>
            ));
            
        } else {
           fetchedAnswers = answerData.data.data.map(answer => (
                <li className="m-8 flex" key={answer.id}><form className="overflow-scroll"><textarea className="w-[800px] h-64 bg-black-transparent2 focus:border border-white" value={updatedAnswer.answer} onChange={setUpdatedAnswer}/></form><div><button id={answer.question_id} onClick={(e) => { updateAnswer(e) }} className="button text-black my-16 mx-16">Update</button></div></li>
            )); 
            
        }
        
        const fetchedQuestions = questionData.data.data.map(question => (
            <li className="m-8" key={question.id}><div className="h-32 overflow-scroll"><span className="forum">{question.id}.</span>  {question.text}</div></li>
        ));
      
        setQuestions(fetchedQuestions)
        setAnswers(fetchedAnswers)
    }
      
    useEffect(() => {
        fetchQuestionsAndAnswers()
    }, [updateOpen])

    const nextPage = () => {
        setCurrentPage(currentPage + 1)
    }
      
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }
      
    const isNextDisabled = questions.length <= currentPage * perPage;
    const isPrevDisabled = currentPage === 1;


    const updateAnswer = (e, answer) => {
        e.preventDefault()
        setUpdateOpen(true)
        setUpdatedAnswer({ question_id: e.target.id, answer: answer.answer})
    }
      
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="bg-black-transparent border border-white p-16 rounded-lg w-11/12 overflow-auto">
                <h1 className="forum text-5xl">Dashboard</h1>
                <h2 className="forum text-3xl">Your Answers</h2>
                <div className="flex flex-col-2">
                    <ul className="mont w-96">{questions.slice((currentPage - 1) * perPage, currentPage * perPage)}</ul>
                    <ul className="mont flex-1">{answers.slice((currentPage - 1) * perPage, currentPage * perPage)}</ul>
                </div>
                    <div className="flex justify-around mt-4">
                        <button className="button" onClick={prevPage} disabled={isPrevDisabled}>
                            Previous
                        </button>
                        <button className="button" onClick={nextPage} disabled={isNextDisabled}>
                            Next
                    </button>
                    
                </div>
                
            </div>
            <button className="button mt-8">Delete All Your Answers</button>
        </div>
    )
}
export default Dashboard