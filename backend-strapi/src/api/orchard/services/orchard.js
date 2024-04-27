'use strict';

/**
 * orchard service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::orchard.orchard');
