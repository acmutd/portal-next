import { LOGIN, LOGOUT, authInterface } from "../actions/authenticate";

const authenticateReducer = (
  state = { isLoggedIn: false },
  action: authInterface
) => {
  switch (action.type) {
    case LOGIN:
      return {
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authenticateReducer;
