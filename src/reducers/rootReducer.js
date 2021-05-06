import {combineReducers} from "redux";
import gitReducer from "./gitReducer";

const rootReducer = combineReducers({
    repos: gitReducer
})

export default rootReducer