import types from "../types/typesAction";
const initialState = [];
const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_ORDERS:
      let { orderList } = action;
      state = [...orderList];
      return [...state];

    default:
      return state;
  }
};
export default OrderReducer;
