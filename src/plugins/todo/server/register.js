'use strict';

module.exports = ({ strapi }) => {
  // Iterating on every content-types]
  Object.values(strapi.contentTypes).forEach(contentType => {
    // If this is an api content-type
    if (contentType.uid.includes('api::')) {
      // Add todos property to the content-type
      contentType.attributes.todos = {
        type: 'relation',
        relation: 'morphMany',
        target: 'plugin::todo.todo', // internal slug of the target
        morphBy: 'related', // field in the todo schema that is used for the relation
        private: false, // false: This will not be exposed in API call
        configurable: false,
      };
    }
  });
};