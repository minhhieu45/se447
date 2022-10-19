import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducersContainer from "./../reducers/index";
let store = createStore(reducersContainer, applyMiddleware(thunk));
export default store;
