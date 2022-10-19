import types from "./../types/typesAction";
let initialState = [
  {
    title: "123",
  },
  {
    title: "345",
  },
  {
    title: "345",
  },
];
const storeReducer = (state = [...initialState], action) => {
  switch (action.type) {
    case types.GET_ALL_PRODUCTS:
      let { products } = action;
      return [...products];
    case types.GET_DETAILS:
      let product = action.products;
      state = [...product];
      return [...state];
    default:
      return state;
  }
};
export default storeReducer;
