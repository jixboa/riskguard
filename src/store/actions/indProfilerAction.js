//import axios from "axios"
import API from "../../api/root";
import { toast } from "react-toastify";
import { setHeaders } from "../../api";

export const getIndProfiles = () => {
  return (dispatch) => {
    API()
      .get("/indprofiles", setHeaders())
      .then((ind_profiles) => {
        dispatch({
          type: "GET_IND_PROFILES",
          ind_profiles,
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

export const addIndProfile = (formData) => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    API()
      .post("/indprofiles", formData, setHeaders())
      .then((ind_profile) => {
        dispatch({
          type: "ADD_IND_PROFILE",
          ind_profile,
        });
        console.log(formData);
        resolve(ind_profile);
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

export const deleteIndProfile = (ids) => {
  return (dispatch) => {
    API()
      .delete(`/indprofiles/${ids}`, setHeaders())
      .then(() => {
        dispatch({
          type: "DELETE_IND_PROFILE",
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

export const editIndProfile = (formData, id) => {
  return (dispatch) => {
    API()
      .put(`/indprofiles/${id}`, formData, setHeaders())
      .then((ind_profile) => {
        dispatch({
          type: "UPDATE_IND_PROFILE",
          ind_profile,
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
