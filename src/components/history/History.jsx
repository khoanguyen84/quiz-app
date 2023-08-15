import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { AuthContext } from "../../Context/AuthProvider";
import { db } from "../../firebase/config";
import moment from "moment/moment";
import DOMPurify from "dompurify";

function History() {
    const user = useContext(AuthContext);
    const [historyList, setHistoryList] = useState([])
    const [historyDetail, setHistoryDetail] = useState();
    useEffect(() => {
        async function getHistoies() {
            const snapshot = await db.collection('histories')
                .orderBy('quiz_date', 'desc')
                .where('uid', '==', user.uid)
                .get()
            setHistoryList(snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            })))
        }
        getHistoies();
    }, [user])

    return (
        <MainLayout>
            <div className="container d-flex align-items-center justify-content-center">
                <table className="table table-hover table-success table-striped">
                    <thead className="table-warning text-success">
                        <tr>
                            <th>Quiz Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Duration</th>
                            <th>Questions</th>
                            <th>Correct Answers</th>
                            <th>Result</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !historyList.length ? (
                                <tr>
                                    <td className="text-center" colSpan={8}>Empty Data</td>
                                </tr>
                            ) :
                            historyList?.map((history) => (
                                <tr key={history.id}>
                                    <td className="text-wrap">{moment(history.quiz_date).format('DD/MM/yyyy')}</td>
                                    <td>{moment(history.start_time).format('HH:mm:ss')}</td>
                                    <td>{moment(history.end_time).format('HH:mm:ss')}</td>
                                    <td className="text-center">{moment(history.end_time).diff(moment(history.start_time), 'minute')}</td>
                                    <td className="text-center">{history.no_of_questions}</td>
                                    <td className="text-center">{history.no_of_correct_answers}</td>
                                    <td className="text-center">{history.no_of_correct_answers}/{history.no_of_questions}</td>
                                    <td>
                                        <button className="btn btn-sm text-danger" onClick={() => setHistoryDetail(history)}>
                                            <i className="fa-regular fa-eye me-1" />
                                            Detail
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <>
                {
                    historyDetail && (
                        <div className="modal d-flex align-items-top fs-10">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header py-1">
                                        <h5 className="modal-title" id="exampleModalLabel">Quiz history detail</h5>
                                        <button type="button" className="btn-close" onClick={() => setHistoryDetail()} />
                                    </div>
                                    <div className="modal-body py-0">
                                        {
                                            historyDetail.quiz_list?.map((quiz) => (
                                                <div key={quiz.id} className={`${quiz.is_correct ? "bg-secondary" : "bg-danger"} card row ctext-white p-2 my-1`}>
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
                                        }
                                    </div>
                                    <div className="modal-footer py-0">
                                        <button type="button" className="btn btn-sm btn-dark" onClick={() => setHistoryDetail()}>
                                            <i className="fa fa-times me-2" />
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </>
        </MainLayout>
    )
}

export default History;