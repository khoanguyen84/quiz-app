import axios from "axios";
import { QUIZ_API_URL } from "./common";

class QuizService {
    static getQuizList(params) {
        if(params.difficulty === 'mix difficulties'){
            return axios.get(QUIZ_API_URL, {
                params: {
                    amount: params.amount
                    // category: params.category
                }
            });
        }
        return axios.get(QUIZ_API_URL, {
            params: {
                amount: params.amount,
                difficulty: params.difficulty,
                // category: params.category
            }
        });
    }
}

export default QuizService;