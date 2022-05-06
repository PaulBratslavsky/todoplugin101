"use strict";

function getPluginStore() {
  return strapi.store({
    environment: '',
    type: 'plugin',
    name: 'todo',
  });
}

async function createDefaultConfig() {
  const pluginStore = getPluginStore();
  const value = {
    disabled: false,
  };
  await pluginStore.set({ key: 'settings', value });
  return pluginStore.get({ key: 'settings' });
}

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
  },

  async getSettings() {
    const pluginStore = getPluginStore();
    let config = await pluginStore.get({ key: 'settings' });
    if (!config) {
      config = await createDefaultConfig();
    }
    return config;
  },
  
  async setSettings(settings) {
    const value = settings;
    const pluginStore = getPluginStore();
    await pluginStore.set({ key: 'settings', value });
    return pluginStore.get({ key: 'settings' });
  },
  
});
