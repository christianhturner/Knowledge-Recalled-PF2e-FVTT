import KnowledgeRecalled from "./KnowledgeRecalled.js";
import NPCModel from "./models/NPCModel.js";
import { isEqual } from 'lodash';
import { insertKnowledgeRecalledbuttons } from "./foundryUiOverrides.js";
import ViewManager from "./control/ViewManager.js";
import registerHooks from "./control/EventManager.js";

registerHooks();

// Remove for production
const isDev = true;
Hooks.once("init", () => {
    CONFIG.debug.hooks = isDev;
});


