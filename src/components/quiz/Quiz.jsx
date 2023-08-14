import React, { useContext, useEffect, useMemo, useState } from "react";
import QuizService from "../../services/quizService";
import { SettingContext } from "../../Context/SettingProvider";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import MainLayout from "../layout/MainLayout";

function Quiz() {
    const [quizList, setQuizList] = useState([])
    const [currentQuiz, setCurrentQuiz] = useState(0)
    const [quiz, setQuiz] = useState({})
    const [loading, setLoading] = useState(false);
    const { setting } = useContext(SettingContext)
    useEffect(() => {
        setLoading(true)
        async function getQuizList() {
            let quizListRes = await QuizService.getQuizList(setting);
            let data = quizListRes?.data?.results.map((item, index) => {
                return {
                    ...item,
                    id: index + 1,
                    answerList: Array.isArray(item.correct_answer) ?
                        [...item.incorrect_answers, ...item.correct_answer] :
                        [...item.incorrect_answers, item.correct_answer],
                    user_answers: [],
                    is_correct: false
                }
            })
            setQuizList(data);
            setLoading(false)
        }
        getQuizList()
    }, [])


    useEffect(() => {
        if (currentQuiz < quizList.length) {
            console.log(quizList[currentQuiz]);
            setQuiz(quizList[currentQuiz])
        }
    }, [currentQuiz, quizList])

    const handleNextQuiz = () => {
        if (currentQuiz < quizList.length) {
            setCurrentQuiz(currentQuiz + 1);
        }
    }

    const handlePreviousQuiz = () => {
        if (currentQuiz > 0) {
            setCurrentQuiz(currentQuiz - 1);
        }
    }

    const handleAnswerQuiz = (quizId, answer) => {
        setQuizList(prev => {
            let newQuizList = prev.map((quiz) => {
                if (quiz.id === quizId) {
                    if (Array.isArray(quiz.correct_answer)) {
                        quiz.user_answers = [...quiz.user_answers, answer]
                    }
                    else {
                        quiz.user_answers = [answer]
                    }
                    quiz.is_correct = quiz.correct_answer.includes(quiz.user_answers)
                }
                return quiz;
            })

            return newQuizList;
        })
    }
    return (
        <MainLayout>
            <div className="container">
                {
                    loading ? <Spinner /> : (
                        <>
                            <div className="row mt-2 d-flex align-items-center justify-content-center">
                                {
                                    currentQuiz >= quizList.length ?
                                        (
                                            <div className="card bg-warning col-sm-6 text-white p-2">
                                                <div className="card-header">Result</div>
                                                <div className="card-body">
                                                    <p>You answered correct {(quizList.filter((item) => item.is_correct)).length}/{quizList.length}</p>
                                                </div>
                                                <div className="card-footer">
                                                    <Link to={"/setting"} className="btn btn-primary me-2">Quiz Again</Link>
                                                    <button type="button" className="btn btn-secondary text-white" onClick={handlePreviousQuiz}>Back To Quiz</button>
                                                </div>
                                            </div>
                                        ) :
                                        quiz && Object.keys(quiz).length && (
                                            <div className="card bg-success col-sm-6 text-white p-2">
                                                <div className="card-header">
                                                    <p><span className="fw-bolder">Category</span>: {DOMPurify.sanitize(quiz.category)}</p>
                                                    <p><span className="fw-bolder">Difficulty</span>: {DOMPurify.sanitize(quiz.difficulty)}</p>
                                                    <p><span className="fw-bolder">Type</span>: {Array.isArray(quiz.correct_answer) ? 'Multiple' : 'Single'}</p>
                                                    <p><span className="fw-bolder">Question</span>: {DOMPurify.sanitize(quiz.question)}</p>
                                                </div>
                                                <ul className="list-group list-group-flush rounded">
                                                    {
                                                        quiz.answerList.map((answer) => (
                                                            <li role="button" key={answer} className={quiz.user_answers.includes(answer) ? 'list-group-item active' : "list-group-item"}
                                                                onClick={() => handleAnswerQuiz(quiz.id, answer)}
                                                            >{DOMPurify.sanitize(answer)}</li>
                                                        ))
                                                    }
                                                </ul>
                                                <div className="card-footer d-flex justify-content-between">
                                                    <button type="button" className="btn btn-link text-white" disabled={currentQuiz <= 0} onClick={handlePreviousQuiz}>Previous Quiz</button>
                                                    {
                                                        (currentQuiz == quizList.length - 1) ? (
                                                            <button type="button" className="btn btn-danger text-white" onClick={handleNextQuiz}>Submission</button>
                                                        ) : (
                                                            <button type="button" className="btn btn-link text-white" disabled={currentQuiz >= quizList.length} onClick={handleNextQuiz}>Next Quiz</button>
                                                        )
                                                    }

                                                </div>
                                            </div>
                                        )
                                }
                            </div>
                            <div className="row mt-2 d-flex align-items-center justify-content-center">
                                <div className="col-sm-6">
                                    {
                                        quizList && quizList.map((quiz, index) => (
                                            <span role="button" className={
                                                `${index == currentQuiz ? 'border border-danger border-2' : ''} 
                                                    btn btn-sm btn-w30 me-1 mb-1 
                                                    ${quiz.user_answers.length ? 'btn-success' : 'btn-warning'}`
                                            }
                                                onClick={() => setCurrentQuiz(index)}
                                            >{quiz.id}</span>
                                        ))
                                    }
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </MainLayout>
    )
}

export default Quiz;