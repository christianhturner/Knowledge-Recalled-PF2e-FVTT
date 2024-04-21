import { insertKnowledgeRecalledbuttons } from "./foundryUiOverrides.js";
import { registerHooks } from "./control/foundryHooks.js";
import './styles/styles.scss'

registerHooks();

// Remove for production
const isDev = true;
Hooks.once("init", () => {
   CONFIG.debug.hooks = isDev;
});