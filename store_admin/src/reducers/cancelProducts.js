import types from "./../types/typeOfActions";
let initialState = [];
const cancelReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_CANCEL_PRODUCT:
      let { payload } = action;
      state = [...payload];
      return [...state];

    default:
      return [...state];
  }
};
export default cancelReducer;
