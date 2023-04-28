import { toast } from "react-toastify";

const indicatorReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_INDICATOR":
      toast.success("Added Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      return [action.indicator.data, ...state];

    case "GET_INDICATOR":
      return action.indicators.data;

    case "DELETE_INDICATOR":
      const { ids } = action.payload;
      const remaininIndicators = state.filter(
        (indicator) => !ids.includes(indicator._id)
      );
      toast.success("Deleted Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      return remaininIndicators;

    case "UPDATE_INDICATOR":
      toast.success("Updated Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      return state.map((indicator) =>
        indicator._id === action.indicator.data._id
          ? action.indicator.data
          : indicator
      );

    default:
      return state;
  }
};

export default indicatorReducer;
