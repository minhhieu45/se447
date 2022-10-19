import types from "./../types/typesAction";
import callApi from "./../callApi/callApi";
import axios from "axios";
class Admin {
  getAllFeedback = () => {
    return async (dispatch) => {
      let result = await callApi(`http://localhost:9000/feedback`);
      let { feedback, count } = result;
      dispatch({
        type: types.GET_ALL_FEEDBACK,
        feedback,
        count,
      });
    };
  };
  getAllOrrders = () => {
    return async (dispatch) => {
      let result = await callApi(`http://localhost:9000/orders`);
      let { orderList } = result;
      dispatch({
        type: types.GET_ALL_ORDERS,
        orderList,
      });
    };
  };
  handleUpdateActive = (id, isActive) => {
    return async (dispatch) => {
      axios
        .put(`http://localhost:9000/orders/${id}`)
        .then((res) => {
          dispatch({
            type: types.UPDATE_ISACTIVE,
            payload: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };
  getAllUser = () => {
    return async (dispatch) => {
      let result = await callApi(`http://localhost:9000/get-user`);
      dispatch({
        type: types.GET_ALL_USER,
        payload: result,
      });
    };
  };
  handleEditing = (id, obj) => {
    return async (dispatch) => {
      axios
        .put(`http://localhost:9000/user/${id}`, obj)
        .then((res) => {
          dispatch({
            type: types.INFO_USER,
            user: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };
}
export default new Admin();
