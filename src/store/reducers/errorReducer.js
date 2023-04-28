//import { toast } from "react-toastify";

const errorReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_IMAGE_ERROR":
      return [(state = action.data)];

    default:
      return [state];
  }
};

export default errorReducer;
