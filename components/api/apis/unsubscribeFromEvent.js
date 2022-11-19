import { api } from "../api";

export const unsubscribeFromEvent = (eventId, token) =>
  api.delete("user/unsubscribe-from-event", {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      eventId,
    },
  });
