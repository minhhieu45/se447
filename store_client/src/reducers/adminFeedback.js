import types from "../types/typesAction";
const initialState = {};
const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_FEEDBACK:
      let { feedback, count } = action;
      state = {
        feedback: [...feedback],
        count,
      };
      return {
        ...state,
      };

    default:
      return state;
  }
};
export default adminReducer;
