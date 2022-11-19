import axios from "axios";

export const api = axios.create({
  baseURL: "https://monkfish-app-n3daw.ondigitalocean.app/",
  timeout: 10000,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});
