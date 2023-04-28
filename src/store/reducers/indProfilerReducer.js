import { toast } from "react-toastify";

const indProfilerReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_IND_PROFILE":
      toast.success("Added Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      return [action.ind_profile.data, ...state];

    case "GET_IND_PROFILES":
      return action.ind_profiles.data;

    case "DELETE_IND_PROFILE":
      const { ids } = action.payload;
      const remainingProfiles = state.filter(
        (ind_profile) => !ids.includes(ind_profile._id)
      );
      toast.success("Deleted Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      return remainingProfiles;

    case "UPDATE_IND_PROFILE":
      toast.success("Updated Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      return state.map((ind_profile) =>
        ind_profile._id === action.ind_profile.data._id
          ? action.ind_profile.data
          : ind_profile
      );

    default:
      return state;
  }
};

export default indProfilerReducer;
