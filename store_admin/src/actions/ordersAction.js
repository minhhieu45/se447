import callApi from "../callApi/callApi";
import types from "./../types/typeOfActions";
import axios from "axios";
class Orders {
  getAllOrders = () => {
    return async (dispatch) => {
      let result = await callApi(`http://localhost:9000/orders`);
      dispatch({
        type: types.GET_ALL_ORDERS,
        payload: result,
      });
    };
  };
  updateOrder = (id) => {
    return async (dispatch) => {
      let result = await axios.put(`http://localhost:9000/orders/${id}`);
      dispatch({
        type: types.MESSAGE_USER,
        payload: result.data,
      });
    };
  };
  getAllCancelProducts = () => {
    return async (dispatch) => {
      let result = await callApi(`http://localhost:9000/cancel-product`, `GET`);
      dispatch({
        type: types.GET_ALL_CANCEL_PRODUCT,
        payload: result.result,
      });
    };
  };
}
export default new Orders();
