import types from "./../types/typeOfActions";
const listUsers = [];
const usersReducers = (state = listUsers, action) => {
  switch (action.type) {
    case types.GET_ALL_USER:
      let { payload } = action;
      state = [...payload];
      return [...state];
    default:
      return [...state];
  }
};
export default usersReducers;
