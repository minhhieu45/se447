import types from "./../types/typeOfActions";
const initialState = {};
const messReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MESSAGE_USER:
      let { payload } = action;
      state = {
        ...payload,
      };
      return { ...state };

    default:
      return { ...state };
  }
};
export default messReducer;
