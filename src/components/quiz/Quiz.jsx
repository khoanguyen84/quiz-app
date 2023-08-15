import React, { useContext, useEffect, useState } from "react";
import QuizService from "../../services/quizService";
import { SettingContext } from "../../Context/SettingProvider";
import DOMPurify from "dompurify";
import Spinner from "../layout/Spinner";
import MainLayout from "../layout/MainLayout";
import QuizDetail from "./QuizDetail";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { db } from "../../firebase/config";
import { AuthContext } from "../../Context/AuthProvider";

function Quiz() {
    const [quizList, setQuizList] = useState([])
    const [currentQuiz, setCurrentQuiz] = useState(0)
    const [quiz, setQuiz] = useState({})
    const [loading, setLoading] = useState(false);

    const [duration, setDuration] = useState({
        quiz_date: null,
        start_time: null,
    })
    const { setting } = useContext(SettingContext)
    const user = useContext(AuthContext);
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
            setDuration({
                ...duration,
                quiz_date: new Date().valueOf(),
                start_time: new Date().valueOf(),
            })
            setLoading(false)
        }
        getQuizList()
    }, [])


    useEffect(() => {
        if (currentQuiz < quizList.length) {
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

    const handleSubmission = () => {
        confirmAlert({
            // title: 'Confirm to submit',
            message: 'Are you sure to submission?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        await db.collection("histories").add({
                            uid: user.uid,
                            quiz_date: duration.quiz_date,
                            start_time: duration.start_time,
                            end_time: new Date().valueOf(),
                            no_of_questions: quizList.length,
                            no_of_correct_answers: (quizList.filter((item) => item.is_correct)).length,
                            quiz_list: quizList
                        })
                        handleNextQuiz();
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
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
                                            <QuizDetail quizList={quizList} />
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
                                                            <button type="button" className="btn btn-danger text-white" onClick={handleSubmission}>Submission</button>
                                                        ) : (
                                                            <button type="button" className="btn btn-link text-white" disabled={currentQuiz >= quizList.length} onClick={handleNextQuiz}>Next Quiz</button>
                                                        )
                                                    }

                                                </div>
                                            </div>
                                        )
                                }
                            </div>
                            {
                                currentQuiz < quizList.length && (
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
                                )
                            }
                        </>
                    )
                }
            </div>
        </MainLayout>
    )
}

export default Quiz;