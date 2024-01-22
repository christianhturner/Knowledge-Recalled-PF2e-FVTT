import KnowledgeRecalled from "../KnowledgeRecalled";
import { insertKnowledgeRecalledbuttons } from "../foundryUiOverrides";
import EncounterManager from "../models/EncounterModel";
import NPCManager from "../models/NPCModel";
import ViewManager from "./ViewManager";
export default async function registerHooks() {
    Hooks.on("ready", () => {
        KnowledgeRecalled._onReady();
        ViewManager._onReady();
        ui.KnowledgeRecalled.ViewManager.init();
        NPCManager._onReady();
        EncounterManager._onReady();
    });
    Hooks.on('getSceneControlButtons', (controls) => {
        insertKnowledgeRecalledbuttons(controls);
    });
    Hooks.on('closeApplication', (app, html) => {
        console.log(`Here is the application`, app);
        console.log(`Here is the html`, html);
    });
    // Hook will be used for updating the data between actor document and the NPCModel flag store
    Hooks.on('updateActor', (actor, changes) => {
        if (!changes) {
            console.debug("No changes occured.")
        };


        console.log("Knowledge Recalled Update Actor", actor, changes);
    })

};


