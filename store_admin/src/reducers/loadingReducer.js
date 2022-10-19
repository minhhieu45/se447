import types from "./../types/typeOfActions";
const initialState = false;
const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_LOADING:
      state = true;
      return state;
    case types.REMOVE_LOADING:
      state = false;
      return state;
    default:
      return state;
  }
};
export default loadingReducer;
