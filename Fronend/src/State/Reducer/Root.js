import { combineReducers } from "redux";
import Values from './Reducer';

const reducer = combineReducers(
    {
        value: Values
    }
);

export default reducer;


