// export const SAVED_PROJECTS = "SAVED_PROJECTS";

export const toggleSavedProjects = (payload) => {
  // if (savedProjects.some((e) => e._id === project._id)) {
  //     setSavedProjects(savedProjects.filter((e) => e !== project));
  //   } else {
  //     setSavedProjects([...savedProjects, project]);
  //   }
  return {
    type: "TOGGLE_SAVED_PROJECTS",
    payload,
  };
};
