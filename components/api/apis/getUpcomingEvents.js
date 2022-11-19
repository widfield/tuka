import { api } from "../api";

export const getUpcomingEvents = (range = "month") =>
  api.get(`public/upcoming-events/${range}`);
