// ACTIONS

const GET_USER = "GET_USER";
const SET_FETCHING_STATUS = "SET_FETCHING_STATUS";
const IS_TYPING = "IS_TYPING";

// ACTION CREATORS

export const gotUser = (user) => {
  return {
    type: GET_USER,
    user
  };
};

export const setFetchingStatus = (isFetching) => ({
  type: SET_FETCHING_STATUS,
  isFetching
});

export const isTyping = (isTyping) => {
  return {
    type: IS_TYPING,
    isTyping
  };
};

// REDUCER

const reducer = (state = { isFetching: true }, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case SET_FETCHING_STATUS:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case IS_TYPING:
      if (!state.isTyping) {
        state.isTyping = {};
      }
      state.isTyping[action.isTyping.senderId] = action.isTyping;
      return {
        ...state
      }
    default:
      return state;
  }
};

export default reducer;
