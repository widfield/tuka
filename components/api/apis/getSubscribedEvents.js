import { api } from "../api";

export const getSubscribedEvents = (token) =>
  api.get(`user/subscribed-events`, {
    headers: { Authorization: `Bearer ${token}` },
  });
