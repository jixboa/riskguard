import { toast } from "react-toastify";

const scoreReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_SCORE":
      toast.success("Added Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      return [action.score.data, ...state];

    case "GET_SCORES":
      return action.scores.data;

    case "DELETE_SCORE":
      const { ids } = action.payload;
      const remainingImages = state.filter((image) => !ids.includes(image._id));
      toast.success("Deleted Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      return remainingImages;

    case "UPDATE_SCORE":
      toast.success("Updated Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      return state.map((score) =>
        score._id === action.score.data._id ? action.score.data : score
      );

    default:
      return state;
  }
};

export default scoreReducer;
