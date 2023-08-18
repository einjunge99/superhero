import { getEnviroments } from "../helpers";

const environment = getEnviroments();

export const API_DOMAIN = environment.VITE_API_DOMAIN;
