import GMJournalApplication from "./view/GMJournal/GMJournal.js";
import { createUploadFolder } from "./control/dataManager.js";
import { createBackupFile } from "./control/dataManager.js";

Hooks.once('ready', () => new GMJournalApplication().render(true, { focus: true }));
Hooks.once('ready', () => createUploadFolder());

let data = {
   name: "test",
};

Hooks.once('ready', () => createBackupFile(data));