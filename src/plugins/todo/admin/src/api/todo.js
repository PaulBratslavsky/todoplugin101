import { request } from "@strapi/helper-plugin";

const todoRequests = {
  getTodoCount: async () => {
    const data = await request(`/todo/count`, {
      method: "GET",
    });
    return data;
  },

  addTodo: async (data) => {
    const response = await request(`/todo/create`, {
      method: "POST",
      body: { data: data },
    });
    return response;
  },

  getAllTodos: async () => {
    const data = await request(`/todo/find`, {
      method: "GET",
    });
    return data;
  },

  toggleTodo: async (id) => {
    const data = await request(`/todo/toggle/${id}`, {
      method: "PUT",
    });
    return data;
  },

  editTodo: async (id, data) => {
    const response = await request(`/todo/update/${id}`, {
      method: "PUT",
      body: { data: data },
    });
    return response;
  },

  deleteTodo: async (id) => {
    const data = await request(`/todo/delete/${id}`, {
      method: "DELETE",
    });
    return data;
  },
};

export default todoRequests;
