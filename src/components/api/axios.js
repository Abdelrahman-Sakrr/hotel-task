import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.makcorps.com",
  headers: {
    "Content-Type": "application/json",
    // Authorization: "Bearer 253|Fg9k1TndrNlOtJ9VhPLa4WbU0O3LErpVUf78qc06c0f84188",
    // api_key: "67d872516262ad058cc7c22a",
  },
//   withCredentials: true,
});

export default axiosInstance;
