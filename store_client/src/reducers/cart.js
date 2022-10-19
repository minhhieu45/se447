import types from "./../types/typesAction";
const initialState = [];
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_PRODUCTS_ON_CART:
      let { result } = action.cartResult;
      state = [...result];
      return state;
    case types.TANG_SO_LUONG:
      let { id, quantity } = action;
      let products = state.find((product) => product.id === id);
      products.quantity = quantity;
      return [...state];
    default:
      return state;
  }
};
export default cartReducer;
