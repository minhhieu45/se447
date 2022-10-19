import types from "./../types/typeOfActions";
import callApi from "./../callApi/callApi";
class Feedback {
  getAllFeedback = () => {
    return async (dispatch) => {
      let result = await callApi(`http://localhost:9000/feedback`);
      dispatch({
        type: types.GET_ALL_FEEDBACK,
        payload: result.feedback,
      });
    };
  };
  sendMessage = (obj) => {
    return async (dispatch) => {
      let result = await callApi(`http://localhost:9000/message`, `POST`, obj);
      dispatch({
        type: types.MESSAGE_ALL,
        payload: result,
      });
    };
  };
  deleteFeedback = (id) => {
    return async (dispatch) => {
      let result = await callApi(
        `http://localhost:9000/feedback/${id}`,
        `DELETE`
      );
      dispatch({
        type: types.MESSAGE_ALL,
        payload: result,
      });
    };
  };
}
export default new Feedback();
