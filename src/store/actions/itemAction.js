//import axios from "axios"
import API from "../../api/root";
import { toast } from "react-toastify";
import { setHeaders } from "../../api";

export const getItems = () => {
  return (dispatch) => {
    API()
      .get("/items", setHeaders())
      .then((items) => {
        dispatch({
          type: "GET_ITEMS",
          items,
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

export const addItem = (formData) => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    API()
      .post("/items", formData, setHeaders())
      .then((item) => {
        dispatch({
          type: "ADD_ITEM",
          item,
        });
        resolve(item);
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

export const deleteItem = (ids) => {
  return (dispatch) => {
    API()
      .delete(`/items/${ids}`, setHeaders())
      .then(() => {
        dispatch({
          type: "DELETE_ITEM",
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

export const editItem = (formData, id) => {
  return (dispatch) => {
    API()
      .put(`/items/${id}`, formData, setHeaders())
      .then((item) => {
        dispatch({
          type: "UPDATE_ITEM",
          item,
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
