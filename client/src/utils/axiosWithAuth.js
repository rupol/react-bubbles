import axios from "axios";

export default function() {
  return axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });
}
