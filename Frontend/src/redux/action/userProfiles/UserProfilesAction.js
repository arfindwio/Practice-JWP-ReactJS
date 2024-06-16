import { reduxUpdateUserProfile } from "../../../services/userProfiles/UserProfiles";
import {
  startLoading,
  endLoading,
} from "../../reducer/userProfiles/UserProfilesSlice";
import { handleRequestError } from "../../../utils/errorHandler";

export const putUpdateUserProfile = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());

    await reduxUpdateUserProfile(input);
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};
