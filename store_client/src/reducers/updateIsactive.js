import types from "./../types/typesAction";
const initialState = {};
const updateIsActiveReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_ISACTIVE:
      let { payload } = action;
      state = { ...payload };
      return state;

    default:
      return state;
  }
};

export default updateIsActiveReducer;
