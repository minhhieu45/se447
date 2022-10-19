import callApi from "../callApi/callApi";
import types from "./../types/typesAction";
import axios from "axios";
class Store {
  getProducts = (token) => {
    return async (dispatch) => {
      let products = await callApi(
        `http://localhost:9000/products`,
        `GET`,
        null,
        token
      );
      dispatch({
        type: types.GET_ALL_PRODUCTS,
        products,
      });
    };
  };

  handlePageChange = (numberPage) => {
    return async (dispatch) => {
      let products = await callApi(
        `http://localhost:9000/products?page=${numberPage}`,
        `GET`,
        null
      );
      dispatch({
        type: types.GET_ALL_PRODUCTS,
        products,
      });
    };
  };
  getDetails = (id) => {
    return async (dispatch) => {
      let products = await callApi(
        `http://localhost:9000/products/${id}`,
        `GET`,
        null
      );
      dispatch({
        type: types.GET_DETAILS,
        products,
      });
    };
  };
  buyProduct = (product, token) => {
    return async (dispatch) => {
      let cart = await callApi(
        `http://localhost:9000/products/buy`,
        `POST`,
        product,
        token
      );
      dispatch({
        type: types.MESS,
        cartMess: cart,
      });
    };
  };
  getAllProduct = (token) => {
    return async (disPatch) => {
      try {
        let cartResult = await callApi(
          `http://localhost:9000/cart`,
          `GET`,
          null,
          token
        );
        if (cartResult.statusCode !== 200) {
          let cartMess = cartResult;
          disPatch({
            type: types.MESS,
            cartMess,
          });
          return;
        }
        disPatch({
          type: types.GET_ALL_PRODUCTS_ON_CART,
          cartResult,
        });
      } catch (error) {
        console.log(error);
      }
    };
  };
  onHandleDelete = (id) => {
    return async (dispatch) => {
      let result = await callApi(`http://localhost:9000/cart/${id}`, `DELETE`);
    };
  };
  handleTang = (id, quantity) => {
    return async (disPatch) => {
      axios
        .put(`http://localhost:9000/cart/${id}`, { quantity })
        .then((res) => {
          let { quantity } = res.data;
          disPatch({
            type: types.TANG_SO_LUONG,
            id,
            quantity,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };
  handleOrder = (cart, token) => {
    return async (disPatch) => {
      try {
        let result = await callApi(
          `http://localhost:9000/orders`,
          `POST`,
          cart,
          token
        );
        console.log(result);
        disPatch({
          type: types.MESS_ORDER,
          payload: result,
        });
      } catch (error) {
        console.log(error);
      }
    };
  };
  handleSearchInput = (value) => {
    return (disPatch) => {
      return disPatch({
        type: types.SEARCH_VALUE,
        value,
      });
    };
  };
  handleSendFeedback = (obj) => {
    return async (dispatch) => {
      let result = await callApi(
        `http://localhost:9000/feedback`,
        `POST`,
        obj,
        null
      );
      dispatch({
        type: types.MESS_ORDER,
        payload: result,
      });
    };
  };
  getAllOrdersById = (token, id) => {
    return async (disPatch) => {
      try {
        let payHistoryResult = await callApi(
          `http://localhost:9000/orders/${id}`,
          `GET`,
          null,
          token
        );
        disPatch({
          type: types.GET_HISTORY_ORDER,
          payload: payHistoryResult.orderList,
        });
      } catch (error) {
        console.log(error);
      }
    };
  };
  addProducts = (obj) => {
    return async (dispatch) => {
      let result = await callApi(
        `http://localhost:9000/products/add`,
        `POST`,
        obj
      );
      dispatch({
        type: types.INFO_USER,
        user: result,
      });
    };
  };
  destroyOrder = (id) => {
    return async (dispatch) => {
      let result = await callApi(
        `http://localhost:9000/orders/${id}`,
        `DELETE`
      );
      dispatch({
        type: types.MESS_ORDER,
        payload: result,
      });
    };
  };
  addCancelProduct = (obj) => {
    return async (dispatch) => {
      let result = await callApi(
        `http://localhost:9000/cancel-product`,
        `POST`,
        obj
      );
    };
  };
}
export default new Store();
