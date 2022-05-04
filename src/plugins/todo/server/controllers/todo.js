'use strict';

module.exports = {

  async count(ctx) {
    ctx.body = await strapi
      .plugin('todo')
      .service('todo')
      .count();
  },

  async find(ctx) {
    ctx.body = await strapi
      .plugin('todo')
      .service('todo')
      .find(ctx.query);
  },

  async delete(ctx) {

    if (!ctx.params.id) return null;

    ctx.body = await strapi
      .plugin('todo')
      .service('todo')
      .delete(ctx.params.id);
  },

  async create(ctx) {
    ctx.body = await strapi 
      .plugin('todo')
      .service('todo')
      .create(ctx.request.body);
  },

  async update(ctx) {
    ctx.body = await strapi
      .plugin('todo')
      .service('todo')
      .update(ctx.params.id, ctx.request.body.data);
  },

  async toggle(ctx) {

    if (!ctx.params.id) return null;

    ctx.body = await strapi
      .plugin('todo')
      .service('todo')
      .toggle(ctx.params.id);
  },
};
