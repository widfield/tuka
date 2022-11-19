import { atom } from "recoil";

export const likedEventsState = atom({
  key: "likedEvents",
  default: [],
});

export const userState = atom({
  key: "userState",
  default: null,
});
