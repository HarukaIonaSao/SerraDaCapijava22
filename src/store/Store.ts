import {createStore} from 'redux'
import { tokenReducer } from "./tokens/TokenReduce"

const store = createStore(tokenReducer);

export default store;