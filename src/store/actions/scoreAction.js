//import axios from "axios"
import API from "../../api/root";
import { toast } from "react-toastify";
import { setHeaders } from "../../api";

export const getScores = () => {
  return (dispatch) => {
    API()
      .get("/scores", setHeaders())
      .then((scores) => {
        dispatch({
          type: "GET_SCORES",
          scores,
        });
      })
      .catch((error) => {
        console.log(error.response);

        toast.error(error.response?.data, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
};

export const addScore = (formData) => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    API()
      .post("/scores", formData, setHeaders())
      .then((score) => {
        dispatch({
          type: "ADD_SCORE",
          score,
        });
        resolve(score);
      })
      .catch((error) => {
        const errors = error.response?.data;
        console.log(errors);
        reject(errors);
        toast.error(errors, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  });

export const deleteIndicator = (ids) => {
  return (dispatch) => {
    API()
      .delete(`/scores/${ids}`, setHeaders())
      .then(() => {
        dispatch({
          type: "DELETE_SCORE",
          payload: { ids },
        });
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response?.data, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
};

export const editScore = (formData, id) => {
  return (dispatch) => {
    API()
      .put(`/scores/${id}`, formData, setHeaders())
      .then((score) => {
        dispatch({
          type: "UPDATE_SCORE",
          score,
        });
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response?.data, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
};
