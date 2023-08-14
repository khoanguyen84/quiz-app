import DOMPurify from "dompurify";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function QuizDetail(props) {
    const { quizList } = props;
    const [showDetail, setShowDetail] = useState(false)
    return (
        <>
            <div className="card bg-warning col-sm-6 text-white p-2">
                <div className="card-header">Result</div>
                <div className="card-body">
                    <p>You answered correct {(quizList.filter((item) => item.is_correct)).length}/{quizList.length}</p>
                </div>
                <div className="card-footer">
                    <Link to={"/setting"} className="btn btn-primary me-2">Quiz Again</Link>
                    <button className="btn btn-secondary" onClick={() => setShowDetail(!showDetail)}>Show Detail</button>
                </div>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
                {
                    showDetail && (
                        quizList.map((quiz) => (
                            <div key={quiz.id} className={`${quiz.is_correct ? "bg-secondary" : "bg-danger"} row card  col-sm-6 text-white p-2 my-1`}>
                                <div className="card-header">
                                    <p><span className="fw-bolder">Question</span>: {DOMPurify.sanitize(quiz.question)}</p>
                                </div>
                                <ul className="list-group list-group-flush rounded">
                                    {
                                        quiz.answerList.map((answer) => (
                                            <li key={answer} className={quiz.user_answers.includes(answer) ? 'list-group-item active' : "list-group-item"}>{DOMPurify.sanitize(answer)}</li>
                                        ))
                                    }
                                </ul>
                                <div className="card-footer">
                                    <p><span className="fw-bolder">Correct answer</span>: {DOMPurify.sanitize(quiz.correct_answer)}</p>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </>
    )
}

export default QuizDetail;