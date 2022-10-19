import types from "./../types/typesAction";
import callApi from "../callApi/callApi";
class User {
  handleOnRegister = (objInfoUser) => {
    return async (dispatchEvent) => {
      let result;
      result = await callApi(
        `http://localhost:9000/register`,
        "POST",
        objInfoUser
      );
      console.log(result);
      dispatchEvent({
        type: types.MESS_ORDER,
        payload: result,
      });
      return result;
    };
  };
  handleOnLogin = (infoUser) => {
    return async (dispatchEvent) => {
      let result = await callApi(
        `http://localhost:9000/login`,
        `POST`,
        infoUser,
        null
      );
      document.cookie = JSON.stringify(result);
      localStorage.setItem("info", JSON.stringify(result));
      localStorage.setItem("token", JSON.stringify(result.token));
      dispatchEvent({
        type: types.TOKEN_USER,
        result,
      });
    };
  };
  handleOnDelete = (id) => {
    return async (dispatch) => {
      try {
        let result = await callApi(
          `http://localhost:9000/user/${id}`,
          `DELETE`
        );

        dispatch({
          type: types.INFO_USER,
          user: result,
        });
      } catch (error) {}
    };
  };
  toggleSpinners = () => {
    return {
      type: types.TOGGLE_SPINNERS,
    };
  };
  unMoutSpinners = () => {
    return {
      type: types.UNMOUT_SPINNERS,
    };
  };
  handleUpdateUser = (id, obj) => {
    return async (dispatch) => {
      let result = await callApi(
        `http://localhost:9000/user/${id}`,
        `PUT`,
        obj
      );
      dispatch({
        type: types.MESS_ORDER,
        payload: result,
      });
    };
  };
}
export default new User();
