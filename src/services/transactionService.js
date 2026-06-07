import API from "./api";

export const getTransactions = () => {
  return API.get("/transactions");
};

export const deleteTransaction = (id) => {
  return API.delete(`/transactions/${id}`);
};

export const createTransaction = (data) => {
  return API.post("/transactions", data);
};

export const updateTransaction =
  (id, data) => {

  return API.put(
    `/transactions/${id}`,
    data
  );
};