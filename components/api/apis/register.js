import { api } from "../api";

export const register = (data) =>
  api
    .post("auth/create-user", {
      user_type: "user",
      ...data,
    })
    .then((res) => res.data)
    .catch((e) => e.response.data);
