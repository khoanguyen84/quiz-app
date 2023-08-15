import React, { useState, useEffect, useContext } from "react";
import CategoryService from "../../services/categoryService";
import { difficulties } from "../../services/common";
import { SettingContext } from "../../Context/SettingProvider";
import { useNavigate } from "react-router-dom";
import Spinner from './../layout/Spinner';
import MainLayout from "../layout/MainLayout";
import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object({
    amount: yup.number().positive().integer().min(5).required().typeError("Invalid question number!")
})

function Setting() {
    const [categoryList, setCategoryList] = useState([])
    const [difficultyList, setDifficultyList] = useState([])
    const [selectLevel, setSelectLevel] = useState('Easy')
    const [loading, setLoading] = useState(false);
    const { setting, setSetting } = useContext(SettingContext)
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        setLoading(true)
        async function feetchData() {
            let catRes = await CategoryService.categories();
            setCategoryList(catRes.data?.trivia_categories);
            setDifficultyList(difficulties)
            setLoading(false)
        }
        feetchData()
    }, [])

    const handleInputValue = (e) => {
        setSetting({
            ...setting,
            [e.target.name]: e.target.value
        })
    }

    const handleStartQuiz = (data) => {
        navigate('/quiz')
    }

    const handleSelecDifficulty = (levelName) => {
        setSelectLevel(levelName)
        setSetting({
            ...setting,
            difficulty: levelName.toLowerCase()
        })
    }
    const handleResetSetting = () => {
        setSelectLevel('Easy')
        setSetting({
            ...setting,
            amount: 5
        })
    }
    return (
        <MainLayout>
            {
                loading ? <Spinner /> : (
                    <div className="container d-flex justify-content-center align-items-center flex-column">
                        <div className="bg-warning row col-sm-6 mt-2 rounded-top py-2">
                            <h5 className="text-center text-white">Quiz Setting</h5>
                        </div>
                        <form onSubmit={handleSubmit(handleStartQuiz)} className="row col-sm-6 border border-warning p-3">
                            <div className="row mb-3">
                                <label className="col-sm-5 col-form-label">Number of Question</label>
                                <div className="col-sm-7">
                                    <input type="number"
                                        className="form-control"
                                        value={setting.amount}
                                        {...register("amount")} onInput={handleInputValue} />
                                    <span className="text-danger">{errors.amount?.message}</span>
                                </div>
                            </div>
                            {/* <div className="row mb-3">
                            <label className="col-sm-5 col-form-label">Category</label>
                            <div className="col-sm-7">
                                <select className="form-control" name="category" onChange={handleInputValue}>
                                    {
                                        categoryList.map((cat) => (
                                            <option key={cat.id} value={cat.name} >{cat.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div> */}
                            <fieldset className="row mb-3">
                                <legend className="col-form-label col-sm-5 pt-0">Difficulty</legend>
                                <div className="col-sm-7">
                                    {
                                        difficultyList.map((level) => (
                                            <div key={level.id} className="form-check">
                                                <input className="form-check-input" type="radio"
                                                    name="difficulty"
                                                    checked={level.name === selectLevel}
                                                    onChange={() => handleSelecDifficulty(level.name)} />
                                                <label className="form-check-label">{level.name}</label>
                                            </div>
                                        ))
                                    }
                                </div>
                            </fieldset>
                            <div className="mb-3 d-flex">
                                <button type="submit" className="btn btn-primary me-2">Start Quiz</button>
                                {/* <Link to={'/quiz'} className="btn btn-primary me-2">Start Quiz</Link> */}
                                <button type="button" className="btn btn-dark" onClick={handleResetSetting}>Reset</button>
                            </div>

                        </form>
                    </div>
                )
            }
        </MainLayout>
    )
}

export default Setting;