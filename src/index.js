import GMJournalApplication from "./view/GMJournal/GMJournal.js";
import { createUploadFolder } from "./API/dataManager.js";
import { getConstants } from "./constants/constants.js";
import {getNPCActorFromEncounters} from "./control/Actor.js";
import KRActor from "./models/knowledgeRecalledDataModel.js";

Hooks.on("init", () => {
   Object.assign(CONFIG.Actor.dataModels, {
      KRNPC: KRActor
   });
});

Hooks.once('ready', getConstants());
Hooks.once('ready', () => new GMJournalApplication().render(true, { focus: true }));


Hooks.once('ready', () => createUploadFolder());

Hooks.once('ready', () => getNPCActorFromEncounters());

Hooks.once('ready', () => createUploadFolder());

//indexedDB.open("knowledge-recalled", 1).onsuccess = function (event) {