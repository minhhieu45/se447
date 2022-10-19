import types from "../types/typesAction";
let initialState = {};
const messOders = (state = initialState, action) => {
  switch (action.type) {
    case types.MESS_ORDER:
      let { payload } = action;
      state = {
        ...payload,
      };

      return state;

    default:
      return state;
  }
};
export default messOders;
