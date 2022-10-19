import types from "./../types/typeOfActions";
const initialState = {};
const getAllOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_ORDERS:
      let { payload } = action;
      state = { ...payload };
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default getAllOrdersReducer;
