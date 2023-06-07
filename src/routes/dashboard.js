import authAxios from "../lib/authAxios"
import apiRoute from "../lib/apiRoute"
import { useEffect, useState } from "react"

const Dashboard = () => {

//states
    const [answers, setAnswers] = useState([])
    const [questions, setQuestions] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 1 // Number of questions per page
    const [updateOpen, setUpdateOpen] = useState(false)
    const [updatedAnswer, setUpdatedAnswer] = useState()

//async function that initally fetches the first answer and then subsequent answers afterwards
    
    async function fetchQuestionsAndAnswers() {
        const questionOffset = (currentPage - 1) * perPage;
        const answerOffset = (currentPage - 1) * perPage;
      
        const [questionData, answerData] = await Promise.all([
            authAxios.get(`${apiRoute}api/v1/questions?limit=${perPage}&offset=${questionOffset}`),
            authAxios.get(`${apiRoute}api/v1/answers?limit=${perPage}&offset=${answerOffset}`)
        ]);
        

        // map that renders answers from DB
        let fetchedAnswers;
        if (!updateOpen) {
            fetchedAnswers = answerData.data.data.map(answer => (
                <li className="m-8 flex" key={answer.id}><div className="h-64 overflow-scroll">{answer.answer}</div><div><button id={answer.question_id} onClick={() => { setUpdateOpen(true); setUpdatedAnswer("")}} className="button text-black my-2 mx-8">Update</button></div></li>
            
            ));
        // Option that turns answer text into a textarea to edit the answer 
        } else {
           fetchedAnswers = answerData.data.data.map(answer => (
               <li className="m-8 flex" key={answer.id}><form className="overflow-scroll"><textarea id={answer.question_id} className="w-[800px] h-64 bg-black-transparent2 border border-gold rounded-lg box-shadow focus:outline-none p-4 m-2" value={updatedAnswer} onChange={(e) => setUpdatedAnswer(e.target.value )}/></form><div><button id={answer.question_id} onClick={(e) => { saveUpdate(e)}} className="button text-black my-16 mx-16">Save</button></div></li>
            )); 
           
        }
        // map that renders questions from DB
        const fetchedQuestions = questionData.data.data.map(question => (
            <li className="m-8" key={question.id}><div className="h-32 text-lg overflow-scroll"><span className="forum text-3xl">{question.id}.</span><br />{question.text}</div></li>
        ));
      
        setQuestions(fetchedQuestions)
        setAnswers(fetchedAnswers)
    }
    

    /// manage pagination for answers
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


    //saves updated answer using patch method
    const saveUpdate = async (e) => {
        try {
            const response = await authAxios.patch(`${apiRoute}/api/v1/answers/${e.target.id}`, {question_id: e.target.id, answer: updatedAnswer})
            setUpdateOpen(false)
        } catch (error) {
            console.log(error)
            }
    }

    /// Delete all answers 

    const deleteAll = async () => {
        try {
            const response = await authAxios.delete(`${apiRoute}api/v1/answers/destroy_all`)
            setUpdatedAnswer("")
        } catch (error) {
            console.log(error)
        }
    }

    //initial fetch of answers and refresh on update that calls axios above
    useEffect(() => {
        fetchQuestionsAndAnswers()
    }, [updateOpen, updatedAnswer]);

      
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="bg-black-transparent border border-white p-16 rounded-lg w-11/12 overflow-auto">
                <h1 className="forum text-5xl">Dashboard</h1>
                <h2 className="forum text-3xl mt-4">Your Answers</h2>
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
            <button className="button mt-8" onClick={deleteAll}>Delete All Your Answers </button>
        </div>
    )
}
export default Dashboard