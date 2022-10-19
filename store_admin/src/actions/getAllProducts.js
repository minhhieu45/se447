import types from "./../types/typeOfActions";
import callApi from "./../callApi/callApi";
class Products {
  getAllProducts = () => {
    return async (dispatch) => {
      let result = await callApi(`http://localhost:9000/products`);
      dispatch({
        type: types.GET_ALL_PRODUCTS,
        payload: result,
      });
    };
  };
  handlePageChange = (numberPage) => {
    return async (dispatch) => {
      let result = await callApi(
        `http://localhost:9000/products?page=${numberPage}`,
        `GET`,
        null
      );
      dispatch({
        type: types.GET_DETAILS_PRODUCTS,
        payload: result,
      });
    };
  };
  handleUpdateProducts = (obj) => {
    return async (dispatch) => {
      let result = await callApi(
        `http://localhost:9000/products/add`,
        `POST`,
        obj
      );
      dispatch({
        type: types.MESSAGE_ALL,
        payload: result,
      });
    };
  };
  deleteProduct = (id) => {
    return async (dispatch) => {
      let result = await callApi(
        `http://localhost:9000/products/${id}`,
        `DELETE`
      );
      dispatch({
        type: types.MESSAGE_ALL,
        payload: result,
      });
    };
  };
  updateProduct = (obj) => {
    return async (dispatch) => {
      let result = await callApi(
        `http://localhost:9000/products/${obj.id}`,
        `PUT`,
        obj
      );
      dispatch({
        type: types.MESSAGE_ALL,
        payload: result,
      });
    };
  };
}
export default new Products();
