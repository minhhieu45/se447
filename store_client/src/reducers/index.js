import { combineReducers } from "redux";
import infoUser from "./user";
import spinnersReducer from "./isToggleSpinners";
import store from "./store";
import token from "./token";
import message from "./message";
import cart from "./cart";
import orderMess from "./orders";
import feedback from "./adminFeedback";
import orderList from "./adminOrders";
import history from "./payHistory";
import updateIsActiveReducer from "./updateIsactive";
import getAllUser from "./getAllUser";
const myReducers = combineReducers({
  infoUser,
  spinnersReducer,
  store,
  token,
  message,
  cart,
  orderMess,
  feedback,
  orderList,
  history,
  updateIsActiveReducer,
  getAllUser,
});
export default myReducers;
