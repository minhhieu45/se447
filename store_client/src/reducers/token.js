import types from "./../types/typesAction";
let initialState = {};
const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOKEN_USER:
      let { result } = action;
      state = { ...result };
      return state;

    default:
      return state;
  }
};
export default tokenReducer;
