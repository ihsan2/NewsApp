import {combineReducers} from 'redux';

// import all reducer
import news from './news';
import search from './search';

const rootReducer = combineReducers({news, search});

export default rootReducer;
