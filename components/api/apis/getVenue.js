import { api } from "../api";

export const getVenue = (id) => api.get(`public/venue/${id}`);
