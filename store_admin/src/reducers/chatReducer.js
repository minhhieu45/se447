import types from "./../types/typeOfActions";
const initialState = [];
const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CHAT:
      let { payload } = action;
      state = [...payload.result];
      return [...state];
    case types.UPDATE_CHAT:
    default:
      return [...state];
  }
};
export default chatReducer;
