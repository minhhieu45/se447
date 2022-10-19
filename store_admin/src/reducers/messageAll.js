import types from "./../types/typeOfActions";
const initialState = {};
const messReducer = (state = initialState, action) => {
  let payload;
  switch (action.type) {
    case types.MESSAGE_ALL:
      payload = action.payload;
      state = { ...payload };
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};
export default messReducer;
