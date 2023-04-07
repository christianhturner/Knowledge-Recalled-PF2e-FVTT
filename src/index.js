import GMJournalApplication from "./view/GMJournal/GMJournal.js";
import { getNPCActorFromEncounters } from "./control/Actor.js";
import KRActor from "./models/knowledgeRecalledDataModel.js";


Hooks.on("init", () =>
{
   Object.assign(CONFIG.Actors.dataModels, {
      KRNPC: KRActor
   });
   console.log("appending to CONFIG.Actor.dataModels");
});

Hooks.once('ready', () => new GMJournalApplication().render(true, { focus: true }));


Hooks.once('ready', () => console.log(getNPCActorFromEncounters()));


Hooks.once('ready', () => console.log("test!!!!!"));
