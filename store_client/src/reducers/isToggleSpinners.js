import types from "./../types/typesAction";
let initialState = false;
let spinnersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_SPINNERS:
      state = true;
      return state;
    case types.UNMOUT_SPINNERS:
      state = false;
      return state;
    default:
      return state;
  }
};
export default spinnersReducer;
