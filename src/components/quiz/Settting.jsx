import React, { useState, useEffect, useContext } from "react";
import CategoryService from "../../services/categoryService";
import { difficulties } from "../../services/common";
import { SettingContext } from "../../Context/SettingProvider";
import { useNavigate } from "react-router-dom";

function Setting() {
    const [categoryList, setCategoryList] = useState([])
    const [difficultyList, setDifficultyList] = useState([])
    const [selectLevel, setSelectLevel] = useState('Easy')
    const { setting, setSetting } = useContext(SettingContext)
    const navigate = useNavigate();

    useEffect(() => {
        async function feetchData() {
            let catRes = await CategoryService.categories();
            setCategoryList(catRes.data?.trivia_categories);
            setDifficultyList(difficulties)
        }
        feetchData()
    }, [])

    const handleInputValue = (e) => {
        setSetting({
            ...setting,
            [e.target.name]: e.target.value
        })
    }

    const handleStartQuiz = (e) => {
        e.preventDefault();
        navigate('/quiz')
    }

    const handleSelecDifficulty = (levelName) => {
        setSelectLevel(levelName)
        setSetting({
            ...setting,
            difficulty: levelName.toLowerCase()
        })
    }

    return (
        <div className="container d-flex justify-content-center align-items-center flex-column">
            <div className="bg-warning row col-sm-6 mt-2 rounded-top py-2">
                <h5 className="text-center text-white">Quiz Setting</h5>
            </div>
            <form className="row col-sm-6 border border-warning p-3">
                <div className="row mb-3">
                    <label className="col-sm-5 col-form-label">Number of Question</label>
                    <div className="col-sm-7">
                        <input type="number"
                            className="form-control"
                            value={setting.amount}
                            name="amount" onInput={handleInputValue} />
                    </div>
                </div>
                <div className="row mb-3">
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
                </div>
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
                    <button type="submit" className="btn btn-primary me-2" onClick={handleStartQuiz}>Start Quiz</button>
                    <button type="button" className="btn btn-dark">Reset</button>
                </div>

            </form>
        </div>
    )
}

export default Setting;