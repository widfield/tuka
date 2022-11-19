import { api } from "../api";

export const login = (data) =>
  api
    .post("auth/login", {
      user_type: "user",
      ...data,
    })
    .then((res) => res.data)
    .catch((e) => e.response.data);
