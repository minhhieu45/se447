import types from "./../types/typesAction";

let initialState = {};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INFO_USER:
      let { user } = action;
      state = user;
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default userReducer;
