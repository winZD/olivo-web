'use strict';

/**
 * orchard router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::orchard.orchard');
