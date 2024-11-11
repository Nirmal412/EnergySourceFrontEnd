import axios from "axios";

const apiClient = axios.create({
  // eslint-disable-next-line no-undef
  // baseURL: process.env.REACT_APP_LIVE_URL,
  baseURL: "http://localhost:8000/api/",
});

export const getToken = () => {
  // const token = localStorage.getItem("user");
  const token = localStorage.getItem('token')
  console.log("get token " , token)
  return token ? JSON.parse(token) : null;
};

export const setToken = (token) => {
    console.log(token, "tokennnnnnn----->>>>>>>>.")
  localStorage.setItem("token", JSON.stringify(token));
};

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token?.accessToken) {
      config.headers.Authorization = `Bearer ${token.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;