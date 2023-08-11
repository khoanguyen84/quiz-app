import React, { useContext, useEffect, useMemo, useState } from "react";
import QuizService from "../../services/quizService";
import { SettingContext } from "../../Context/SettingProvider";
import DOMPurify from "dompurify";

function Quiz() {
    const [quizList, setQuizList] = useState([])
    const [numberOfQuiz, setNumberOfQuiz] = useState(1)
    const [quiz, setQuiz] = useState({})
    const { setting } = useContext(SettingContext)
    useEffect(() => {
        async function getQuizList() {
            let quizListRes = await QuizService.getQuizList(setting);
            let data = quizListRes?.data?.results.map((item, index) => {
                return {
                    ...item,
                    id: index + 1,
                    user_answers: []
                }
            })
            setQuizList(data);
        }
        getQuizList()
    }, [])

    useEffect(() => {
        if (quizList && quizList.length) {
            let currentQuiz = quizList[numberOfQuiz - 1];
            const answerList = Array.isArray(currentQuiz.correct_answer) ?
                [...currentQuiz.incorrect_answers, ...currentQuiz.correct_answer] :
                [...currentQuiz.incorrect_answers, currentQuiz.correct_answer]
            setQuiz({ ...currentQuiz, answerList })
        }
    }, [numberOfQuiz, quizList])

    const handleNextQuiz = () => {
        if (numberOfQuiz < quizList.length) {
            setNumberOfQuiz(numberOfQuiz + 1);
        }
    }

    const handlePreviousQuiz = () => {
        if (numberOfQuiz > 1) {
            setNumberOfQuiz(numberOfQuiz - 1);
        }
    }

    const handleAnswerQuiz = (quizId, answer) => {
        let newQuiz = {
            ...quiz,
            user_answers: [answer]
        }
        setQuiz(newQuiz)
    }
    return (
        <div className="container">
            <div className="row mt-2 d-flex align-items-center justify-content-center">
                {
                    Object.keys(quiz).length ? (
                        <div className="card bg-success col-sm-6 text-white p-2">
                            <div className="card-header">
                                {DOMPurify.sanitize(quiz.question)}
                            </div>
                            <ul className="list-group list-group-flush rounded">
                                {
                                    quiz.answerList.map((answer) => (
                                        <li role="button" key={answer} className={quiz.user_answers.includes(answer) ? 'list-group-item active' : "list-group-item"}
                                            onClick={() => handleAnswerQuiz(quiz.id, answer)}
                                        >{answer}</li>
                                    ))
                                }
                            </ul>
                            <div className="card-footer d-flex justify-content-between">
                                <button type="button" className="btn btn-link text-white" onClick={handlePreviousQuiz}>Previous Quiz</button>
                                <button type="button" className="btn btn-link text-white" onClick={handleNextQuiz}>Next Quiz</button>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        </div>
    )
}

export default Quiz;