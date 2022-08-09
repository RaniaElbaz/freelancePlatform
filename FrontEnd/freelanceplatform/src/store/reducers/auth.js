const INITIAL_STATE = {
  isAuth: false,
};

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_IS_AUTHENTICATED":
      return {
        isAuth: action.payload,
      };
    default:
      return state;
  }
}
