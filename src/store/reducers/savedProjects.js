const INITIAL_STATE = {
  savedProjects: [],
};

export default function savedProjectsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "TOGGLE_SAVED_PROJECTS":
      if (state.savedProjects === []) {
        return [...state.savedProjects, action.payload];
      } else if (
        state.savedProjects.some((e) => e._id === action.payload._id)
      ) {
        return state.savedProjects.filter((e) => e !== action.payload);
      } else {
        return [...state.savedProjects, action.payload];
      }
    // return { ...state, savedProjects: action.payload };
    default:
      return state;
  }
}
