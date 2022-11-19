import { api } from "../api";

export const subscribeToEvent = (eventId, token) =>
  api.post(
    "user/subscribe-to-event",
    { eventId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
