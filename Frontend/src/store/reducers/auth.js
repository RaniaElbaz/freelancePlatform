const INITIAL_STATE = {
  id: localStorage.getItem("id"),
  role: localStorage.getItem("role"),
};

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
