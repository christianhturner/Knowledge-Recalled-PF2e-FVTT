import GMJournalApplication from "./view/GMJournal/GMJournal.js";
import { createUploadFolder } from "./API/dataManager.js";
import { getConstants } from "./constants/constants.js";
import {getNPCActorFromEncounters} from "./control/Actor.js";

Hooks.once('ready', );
Hooks.once('ready', getConstants());
Hooks.once('ready', () => new GMJournalApplication().render(true, { focus: true }));


Hooks.once('ready', () => createUploadFolder());

Hooks.once('ready', () => console.log(getNPCActorFromEncounters()));

Hooks.once('ready', () => createUploadFolder());

Hooks.once('ready', () => console.log("test!!!!!"));