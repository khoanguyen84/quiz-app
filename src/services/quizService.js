import axios from "axios";
import { QUIZ_API_URL } from "./common";

class QuizService {
    static getQuizList(params) {
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