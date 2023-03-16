import GMJournalApplication from "./view/GMJournal/GMJournal.js";
import { createUploadFolder } from "./API/dataManager.js";
import { getConstants } from "./constants/constants.js";

Hooks.once('ready', getConstants());
Hooks.once('ready', () => new GMJournalApplication().render(true, { focus: true }));
// Hooks.once('ready', () => knowledgeRecalledIconLauncher());
// Hooks.once('ready', () => createUploadFolder());
