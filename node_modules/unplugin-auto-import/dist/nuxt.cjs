"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkHUQAJOTEcjs = require('./chunk-HUQAJOTE.cjs');
require('./chunk-PRMLCGIO.cjs');

// src/nuxt.ts
function nuxt_default(options) {
  options.exclude = options.exclude || [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/];
  this.extendBuild((config) => {
    config.plugins = config.plugins || [];
    config.plugins.unshift(_chunkHUQAJOTEcjs.unplugin_default.webpack(options));
  });
  this.nuxt.hook("vite:extend", async (vite) => {
    vite.config.plugins = vite.config.plugins || [];
    vite.config.plugins.push(_chunkHUQAJOTEcjs.unplugin_default.vite(options));
  });
}


module.exports = nuxt_default;
exports.default = module.exports;