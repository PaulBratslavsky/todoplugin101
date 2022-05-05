"use strict";

module.exports = {
  async count(ctx) {
    try {
      ctx.body = await strapi.plugin("todo").service("todo").count();
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async find(ctx) {
    try {
      ctx.body = await strapi.plugin("todo").service("todo").find(ctx.query);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async delete(ctx) {
    if (!ctx.params.id) return null;

    try {
      ctx.body = await strapi
        .plugin("todo")
        .service("todo")
        .delete(ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async create(ctx) {
    try {
      ctx.body = await strapi
        .plugin("todo")
        .service("todo")
        .create(ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async update(ctx) {
    try {
      ctx.body = await strapi
        .plugin("todo")
        .service("todo")
        .update(ctx.params.id, ctx.request.body.data);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async toggle(ctx) {
    if (!ctx.params.id) return null;

    try {
      ctx.body = await strapi
        .plugin("todo")
        .service("todo")
        .toggle(ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async getSettings(ctx) {
    console.log("######### getSettings ##########");
    try {
      ctx.body = await strapi.plugin("todo").service("todo").getSettings();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async setSettings(ctx) {
    const { body } = ctx.request;
    try {
      await strapi.plugin("todo").service("todo").setSettings(body);
      ctx.body = await strapi.plugin("todo").service("todo").getSettings();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
