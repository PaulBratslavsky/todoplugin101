import { request } from '@strapi/helper-plugin';

const todoRequests = {
  getTodoCount: async () => {
    const data = await request(`/todo/count`, {
      method: 'GET',
    });
    return data;
  },

  getAllTodos: async () => {
    const data = await request(`/todo/find`, {
      method: 'GET',
    });
    return data;
  },

  toggleTodo: async (id) => {
    const data = await request(`/todo/toggle/${id}`, {
      method: 'PUT',
    });
    return data;
  },

  deleteTodo: async (id) => {
    const data = await request(`/todo/delete/${id}`, {
      method: 'DELETE',
    });
    return data;
  }
};


export default todoRequests;