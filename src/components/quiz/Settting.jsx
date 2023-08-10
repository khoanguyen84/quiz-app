import React, { useState, useEffect } from "react";
import CategoryService from "../../services/categoryService";
import { difficulties } from "../../services/common";

function Setting() {
    const [categoryList, setCategoryList] = useState([])
    const [difficultyList, setDifficultyList] = useState([])
    const [setting, setSeting] = useState({
        amount: 0,
        difficulty: '',
        category: ''
    })

    useEffect(() => {
        async function feetchData() {
            let catRes = await CategoryService.categories();
            setCategoryList(catRes.data?.trivia_categories);
            setDifficultyList(difficulties)
        }
        feetchData()
    }, [])

    return (
        <div className="container d-flex justify-content-center align-items-center flex-column">
            <div className="bg-warning row col-sm-6 mt-2 rounded-top py-2">
                <h5 className="text-center text-white">Quiz Setting</h5>
            </div>
            <form className="row col-sm-6 border border-warning p-3">
                <div className="row mb-3">
                    <label className="col-sm-5 col-form-label">Number of Question</label>
                    <div className="col-sm-7">
                        <input type="number" className="form-control" />
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-5 col-form-label">Category</label>
                    <div className="col-sm-7">
                        <select className="form-control">
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
                                    <input className="form-check-input" type="radio" name="difficulty" />
                                    <label className="form-check-label">{level.name}</label>
                                </div>
                            ))
                        }
                    </div>
                </fieldset>
                <div className="mb-3 d-flex">
                    <button type="submit" className="btn btn-primary me-2">Start Quiz</button>
                    <button type="button" className="btn btn-dark">Reset</button>
                </div>

            </form>
        </div>
    )
}

export default Setting;