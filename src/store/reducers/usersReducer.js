import { toast } from "react-toastify";

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ITEM":
      toast.success("Added Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      return [action.item.data, ...state];

    case "GET_USERS":
      return action.users.data;

    case "DELETE_ITEM":
      const { ids } = action.payload;
      const remainingItems = state.filter((item) => !ids.includes(item._id));
      toast.success("Deleted Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      return remainingItems;

    case "UPDATE_ITEM":
      toast.success("Updated Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      return state.map((item) =>
        item._id === action.item.data._id ? action.item.data : item
      );

    default:
      return state;
  }
};

export default usersReducer;
