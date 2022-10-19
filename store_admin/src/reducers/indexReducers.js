import { combineReducers } from "redux";
import listUser from "./getAllUsers";
import message from "./messageReducer";
import hotCustomer from "./hotCustomerReducer";
import allOrders from "./getAllorders";
import allProducts from "./getAllProducts";
import fb from "./getAllFeedbackReducer";
import messAll from "./messageAll";
import loading from "./loadingReducer";
import cancelProducts from "./cancelProducts";
import chat from "./chatReducer";
export default combineReducers({
  listUser,
  message,
  hotCustomer,
  allOrders,
  allProducts,
  fb,
  messAll,
  loading,
  cancelProducts,
  chat,
});
