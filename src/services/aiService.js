import API from "./api";

export const getAIInsights = () => {
  return API.post("/ai/insights");
};