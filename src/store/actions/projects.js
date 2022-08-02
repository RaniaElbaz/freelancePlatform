import axios from "axios";

export const getProjectList = () => (dispatch) => {
  return axios({
    url: `http://localhost:8080/project`,
    method: "GET",
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTY1OTI3NDQ3NSwiZXhwIjoxNjU5Mjc4MDc1fQ.ckqAH2MJM5K-E1v8tQqKnnktLHoCxgbD1BYSth3_e3M",
    },
  })
    .then((res) => {
      dispatch({
        type: "GET_PROJECTS_LIST",
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getProjectDetails = (id) => (dispatch) => {
  return axios({
    url: `http://localhost:8080/project/${id}`,
    method: "GET",
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTY1OTI3NDQ3NSwiZXhwIjoxNjU5Mjc4MDc1fQ.ckqAH2MJM5K-E1v8tQqKnnktLHoCxgbD1BYSth3_e3M",
    },
  })
    .then((res) => {
      dispatch({
        type: "GET_PROJECT_DETAILS",
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
