import types from "./../types/typesAction";
const initialState = {};
const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MESS:
      let { cartMess } = action;
      state = { ...cartMess };
      return state;

    default:
      return state;
  }
};
export default messageReducer;
