import { SettingsShim } from "./view/settings/settingsApplication";

import { CONSTANTS } from "./constants/constants";


export function registerSettings() {

   game.settings.registerMenu(CONSTANTS.moduleId, "configure-settings", {
      name: "KNOWLEDGE-RECALLED.title",
      label: "KNOWLEDGE-RECALLED.SETTINGS.label",
      hint: "KNOWLEDGE-RECALLED.SETTINGS.hint",
      icon: "fas fa-cog",
      type: SettingsShim,
      restricted: false
   });

   // FIXME: Error occuring here
   for (let [name, data] of Object.entries(SETTINGS.GET_DEFAULT())) {
      game.settings.register(CONSTANTS.moduleId, name, data)
   }
}

/* FIXME:
 * getting error: `Error: Cannot read properties of null (reading 'startsWith')`, which is 
 * located at foundry.js 7596, and the code is:
 *
 * ```javascript
 * Get a template from the server by fetch request and caching the retrieved result
 * @param {string} path           The web-accessible HTML template URL
 * @param {string} [id]           An ID to register the partial with.
 * @returns {Promise<Function>}   A Promise which resolves to the compiled Handlebars template
* async function getTemplate(path, id) {
  if ( !_templateCache.hasOwnProperty(path) ) {
    await new Promise((resolve, reject) => {
      game.socket.emit("template", path, resp => {
        if ( resp.error ) return reject(new Error(resp.error));
        const compiled = Handlebars.compile(resp.html);
        Handlebars.registerPartial(id ?? path, compiled);
        _templateCache[path] = compiled;
        console.log(`Foundry VTT | Retrieved and compiled template ${path}`);
        resolve(compiled);
      });
    });
  }
  return _templateCache[path];
}
 * ```
 * Appears to have something to do with handlebars and path is null and id is undefined
 *
 */
