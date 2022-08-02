const INITIAL_STATE = {
  projectList: [],
  projectDetails: {},
};

export default function projectsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_ALL_PROJECTS":
      return { ...state, projectList: action.payload };
    case "GET_PROJECT_BY_ID":
      return { ...state, projectDetails: action.payload };
    default:
      return state;
  }
}
