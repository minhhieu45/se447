import types from "./../types/typeOfActions";
const initialState = [];
const fbReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_FEEDBACK:
      let { payload } = action;
      state = [...payload];
      return [...state];

    default:
      return [...state];
  }
};
export default fbReducer;
