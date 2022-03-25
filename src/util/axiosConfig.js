import axios from "axios";

axios.defaults.baseURL =
    process.env.REACT_APP_BASE_URL || "http://localhost:8080";

export const setAuthData = (token, username, userId) => {
    localStorage.setItem("jsonwebtoken", token);
    localStorage.setItem("username", username);
    localStorage.setItem("userId", userId);

    axios.defaults.headers;
};

export const postLogin = async (username, password) => {
    const response = await axios.post("/user/login", { username, password });
    const { token, user } = response.data;
    setAuthData(token, username, user.id);
    return;
};
