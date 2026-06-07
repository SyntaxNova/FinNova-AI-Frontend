import API from "./api";

export const getSummary = () =>
  API.get("/analytics/summary");

export const getCategories = () =>
  API.get("/analytics/categories");

export const getMonthlyTrend = () =>
  API.get("/analytics/monthly");