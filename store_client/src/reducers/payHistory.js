import types from "./../types/typesAction";
let payHistory = [];
let payHistoryReducer = (state = payHistory, action) => {
  switch (action.type) {
    case types.GET_HISTORY_ORDER:
      let { payload } = action;
      state = [...payload];
      return state;

    default:
      return state;
  }
};
export default payHistoryReducer;
