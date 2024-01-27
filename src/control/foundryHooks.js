import { insertKnowledgeRecalledbuttons } from "../foundryUiOverrides";
import KnowledgeRecalled from "../KnowledgeRecalled";
import ViewManager from "./ViewManager";
import EncounterManager from "./EncounterManager";
import NPCManager from "./NPCManager";

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
    });

    Hooks.on('createCombat', (encounter, changes) => {
        ui.KnowledgeRecalled.EncounterManager.updateEncounters();
        console.debug('Knowledge Recalled create combat.', encounter, changes);
    });

    Hooks.on('deleteCombat', (encounter, changes) => {
        ui.KnowledgeRecalled.EncounterManager.updateEncounters();
        console.debug('Knowledge Recalled delete combat.', encounter, changes);
    });

    Hooks.on('updateCombat', (encounter, changes) => {
        ui.KnowledgeRecalled.EncounterManager.updateEncounters();
        console.debug('Knowledge Recalled update combat.', encounter, changes);
    });

    Hooks.on('combatStart', (round, turn) => {
        ui.KnowledgeRecalled.EncounterManager.updateEncounters();
        console.debug('Knowledge recalled combat start.', round, turn);
    });

    // See combatTurn to see more advanced eents if and when needed

};
