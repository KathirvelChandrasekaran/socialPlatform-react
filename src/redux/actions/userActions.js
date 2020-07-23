import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });
  axios
    .post("/login", userData)
    .then((res) => {
      setAuthHeader(res.data.token);
      dispatch(GetUserData());
      dispatch({
        type: CLEAR_ERRORS,
      });
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const signUpUser = (userData, history) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });
  axios
    .post("/signup", userData)
    .then((res) => {
      setAuthHeader(res.data.token);
      dispatch(GetUserData());
      dispatch({
        type: CLEAR_ERRORS,
      });
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FireToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
};

export const GetUserData = () => (dispatch) => {
  axios
    .get("/user")
    .then((res) =>
      dispatch({
        type: SET_USER,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

const setAuthHeader = (token) => {
  const fireToken = `Bearer ${token}`;
  axios.defaults.headers.common["Authorization"] = fireToken;
  localStorage.setItem("FireToken", fireToken);
};
