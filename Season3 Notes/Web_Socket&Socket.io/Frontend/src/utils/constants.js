// export const BASE_URL = "/api";
export const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:7777" : "/api";
  //Update BASE_URL to use dynamic hostname for local development

