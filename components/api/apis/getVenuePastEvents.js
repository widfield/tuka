import { api } from "../api";

export const getVenuePastEvents = (id) => api.get(`public/past-events/${id}`);
