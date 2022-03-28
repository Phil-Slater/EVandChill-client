import axios from "./apiAxios";
import { addError, setUser, setFavorites, deleteFavorite, setStations } from "../store/actions/actionCreators";
import store from "../store/store";
import getCurrentLocation from "./getCurrentLocation";
import { useSelector } from "react-redux";

export function setAuthData(token, user) {
    const userInfo = { token, user };
    localStorage.setItem("jwt", JSON.stringify(userInfo));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const removeAuthData = () => {
    localStorage.removeItem("jwt");
    delete axios.defaults.headers.common["Authorization"];
};

const handleTokenUser = (data) => {
    const { token, user } = data;
    setAuthData(token, user);
    store.dispatch(setUser(user));
    return user._id;
};
export const postLogin = async (username, password) => {
    try {
        const response = await axios.post("/user/login", {
            username,
            password,
        });
        return handleTokenUser(response.data);
    } catch {
        store.dispatch(
            addError(
                "There was an error logging in. Double check your username and password and try again."
            )
        );
        return null;
    }
};

export const postRegister = async (username, password, email) => {
    try {
        const response = await axios.post("/user/register", {
            username,
            password,
            email,
        });
        return handleTokenUser(response.data);
    } catch (err) {
        console.log(err.response);
        if (err.response.data.userTaken) {
            store.dispatch(addError("Username is already in use."));
        } else {
            store.dispatch(
                addError("There was an error registering your account.")
            );
        }
        return null;
    }
};

export const postGuestLogin = async () => {
    try {
        const response = await axios.post("/user/guest-login");
        return handleTokenUser(response.data);
    } catch {
        store.dispatch(
            addError("Error retrieving guest token. Please try again.")
        );
        return null;
    }
};

export const postStationsByLocation = async () => {
    const location = await getCurrentLocation();
    const { latitude, longitude } = location.coords;

    try {
        const response = await axios.post("/station/stations", {
            latitude,
            longitude,
        });
        console.log(response.data);
        store.dispatch(setStations(response.data));
    } catch (err) {

    }
};

export const postStationsByZip = async (zip) => {
    try {
        const response = await axios.post("/station/stations", {
            zip,
        });
        console.log(response.data);
    } catch (err) {}
};

export const postStationsByCity = async (cityState) => {
    try {
        const response = await axios.post("/station/stations", {
            cityState,
        });
        console.log(response.data);
    } catch (err) {}
};
    
   export const getFavorites = async () => {
 const username = useSelector((state) => state.auth.user.username);
      try {
        const response = await axios.get(`/profile/${username}/my-favorites`);
        if (response) {
          store.dispatch(setFavorites(response.data.favorites));
        }
      } catch (error) {
        console.log(error);
      }
    };


   export const handleDeleteFavorite = async (userId, favoriteId) => {
    try{  
    const response = await axios.delete(`/profile/favorites`, {
        data: { favoriteId: favoriteId, userId: userId }
      });
      console.log("DELETE",response)
      if (response) {
        store.dispatch(deleteFavorite(favoriteId));
      }
      } catch(error) {
          console.log(error)
      }
    //   successfull deleteing, need to refetch the user after deleteing
    };
