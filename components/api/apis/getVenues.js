import { api } from "../api";

export const getVenues = () =>
  api.get("public/venues");
