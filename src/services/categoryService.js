import axios from "axios";
import { CATEGORY_API_URL } from "./common";

class CategoryService {
    static categories() {
        return axios.post(CATEGORY_API_URL)
    }
}

export default CategoryService;