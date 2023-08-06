"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkHUQAJOTEcjs = require('./chunk-HUQAJOTE.cjs');
require('./chunk-PRMLCGIO.cjs');

// src/astro.ts
function astro_default(options) {
  return {
    name: "unplugin-auto-import",
    hooks: {
      "astro:config:setup": async (astro) => {
        var _a;
        (_a = astro.config.vite).plugins || (_a.plugins = []);
        astro.config.vite.plugins.push(_chunkHUQAJOTEcjs.unplugin_default.vite(options));
      }
    }
  };
}


module.exports = astro_default;
exports.default = module.exports;