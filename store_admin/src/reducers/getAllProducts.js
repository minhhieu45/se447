import types from "./../types/typeOfActions";
const initialState = [];
const productReducers = (state = initialState, action) => {
  let payload;
  switch (action.type) {
    case types.GET_ALL_PRODUCTS:
      payload = action.payload;
      state = [...payload];
      return [...state];
    case types.GET_DETAILS_PRODUCTS:
      payload = action.payload;
      state = [...payload];
      return [...state];
    default:
      return [...state];
  }
};
export default productReducers;
