import types from "./../types/typeOfActions";
const initialState = {};
const hotCusReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HOT_CUSTOMER:
      let { payload } = action;
      state = {
        ...payload,
      };
      return {
        ...state,
      };

    default:
      return state;
  }
};
export default hotCusReducer;
