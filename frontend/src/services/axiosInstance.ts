import axios, { CreateAxiosDefaults } from "axios";

const config: CreateAxiosDefaults = {
  baseURL: "http://localhost:3100",
};

const instance = axios.create(config);

export default instance;
