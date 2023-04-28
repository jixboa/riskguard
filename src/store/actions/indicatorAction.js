//import axios from "axios"
import API from "../../api/root";
import { toast } from "react-toastify";
import { setHeaders } from "../../api";

export const getIndicators = () => {
  return (dispatch) => {
    API()
      .get("/indicators", setHeaders())
      .then((indicators) => {
        dispatch({
          type: "GET_INDICATOR",
          indicators,
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

export const addIndicator = (formData) => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    API()
      .post("/indicators", formData, setHeaders())
      .then((indicator) => {
        dispatch({
          type: "ADD_INDICATOR",
          indicator,
        });
        resolve(indicator);
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
      .delete(`/indicators/${ids}`, setHeaders())
      .then(() => {
        dispatch({
          type: "DELETE_INDICATOR",
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

export const editIndicator = (formData, id) => {
  return (dispatch) => {
    API()
      .put(`/indicators/${id}`, formData, setHeaders())
      .then((indicator) => {
        dispatch({
          type: "UPDATE_INDICATOR",
          indicator,
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
