import API from "./api";

export const getGoals = () => {
  return API.get("/goals");
};

export const createGoal = (data) => {
  return API.post("/goals", data);
};

export const updateGoal = (id, data) => {
  return API.put(`/goals/${id}`, data);
};

export const deleteGoal = (id) => {
  return API.delete(`/goals/${id}`);
};