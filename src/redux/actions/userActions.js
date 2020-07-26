import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
  SET_UNAUTHENTICATED,
  MARK_NOTIFICATIONS_READ,
} from "../types";
import axios from "axios";
import notifications from "../../components/navbar/notifications";

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
  dispatch({
    type: LOADING_USER,
  });
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

export const uploadImage = (formData) => (dispatch) => {
  dispatch({
    type: LOADING_USER,
  });
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(GetUserData());
      console.log("Uploading image");
    })
    .catch((err) => console.log(err));
};

export const EditUserDetails = (userData) => (dispatch) => {
  dispatch({
    type: LOADING_USER,
  });
  axios
    .post("/user", userData)
    .then(() => {
      dispatch(GetUserData());
    })
    .catch((err) => console.log(err));
};

export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post("/notifications", notificationIds)
    .then((res) => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ,
      });
    })
    .catch((err) => console.log(err));
};
