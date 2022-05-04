"use strict";

module.exports = ({ strapi }) => ({
  async count() {
    return await strapi.query("plugin::todo.todo").count();
  },

  async find(query) {
    return await strapi.query("plugin::todo.todo").findMany(query);
  },

  async delete(id) {
    return await strapi.query("plugin::todo.todo").delete({
      where: { id: id },
    });
  },

  async create(data) {
    return await strapi.query("plugin::todo.todo").create(data);
  },

  async update(id, data) {
    return await strapi.query("plugin::todo.todo").update({
      where: { id },
      data,
    });
  },

  async toggle(id) {
    const result = await strapi.query("plugin::todo.todo").findOne({ where: { id } });
    return await strapi.query("plugin::todo.todo").update({
      where: { id },
      data: { isDone: !result.isDone },
    });
  }
});
