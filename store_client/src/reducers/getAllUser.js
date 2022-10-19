import types from "./../types/typesAction";
const initialState = {};
const getUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_USER:
      let { payload } = action;
      state = { ...payload };
      return { ...state };

    default:
      return state;
  }
};
export default getUserReducer;
