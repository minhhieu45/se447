import types from "./../types/typeOfActions";
import callApi from "./../callApi/callApi";
import axios from "axios";
class User {
  getAllUser = () => {
    return async (dispatch) => {
      let userList = await callApi(`http://localhost:9000/get-user`, `GET`);
      return dispatch({
        type: types.GET_ALL_USER,
        payload: userList.userList,
      });
    };
  };
  deleteUser = (id) => {
    return async (dispatch) => {
      let result = await callApi(`http://localhost:9000/user/${id}`, `DELETE`);
      dispatch({
        type: types.MESSAGE_USER,
        payload: result,
      });
    };
  };
  createNewUser = (obj) => {
    return async (dispatch) => {
      let result = await callApi(`http://localhost:9000/register`, `POST`, obj);
      dispatch({
        type: types.MESSAGE_USER,
        payload: result,
      });
    };
  };
  handleUpdateUser = (obj) => {
    return async (dispatch) => {
      let result = await callApi(
        `http://localhost:9000/user/${obj.id}`,
        `PUT`,
        obj
      );
      dispatch({
        type: types.MESSAGE_USER,
        payload: result,
      });
    };
  };
  getHotCustomer = () => {
    return async (dispatch) => {
      let result = await callApi(`http://localhost:9000/query`, `GET`);
      dispatch({
        type: types.HOT_CUSTOMER,
        payload: result,
      });
    };
  };
  getAllMess = () => {
    return async (dispatch) => {
      let result = await callApi(`http://localhost:9000/chat`, `GET`);
      dispatch({
        type: types.GET_CHAT,
        payload: result,
      });
    };
  };
  handleRepMess = (id) => {
    return async (dispatch) => {
      let result = await callApi(`http://localhost:9000/chat/${id}`, `PUT`);
    };
  };
  handleLogin = (infoUser) => {
    return async (dispatchEvent) => {
      let result = await callApi(
        `http://localhost:9000/`,
        `POST`,
        infoUser,
        null
      );
      // document.cookie = JSON.stringify(result);
      // localStorage.setItem("info", JSON.stringify(result));
      // localStorage.setItem("token", JSON.stringify(result.token));
      dispatchEvent({
        type: types.MESSAGE_USER,
        payload: {
          statusCode: result.statusCode,
          message: result.message,
        },
      });
    };
  };
  addLoading = () => {
    return async (dispatch) => {
      dispatch({
        type: types.ADD_LOADING,
      });
    };
  };
  removeLoading = () => {
    return async (dispatch) => {
      dispatch({
        type: types.REMOVE_LOADING,
      });
    };
  };
}
export default new User();
