
/**
 * @class EncounterManager
 * @property {Map<key, encounter>} activeEncounters
 * @property {Map<key, encounter>} encounters
 * @property {Map<key, encounter>} currentEncounter
 */
export default class EncounterManager {
    // encounters should be created at startup, and not stored.


    constructor() {
        if (!ui.KnowledgeRecalled.EncounterManager) {
            ui.KnowledgeRecalled.EncounterManager = this;
            this.activeEncounters = this.listActiveEncounters();
            this.encounters = this.listAllEncounters();
            this.currentEncounter = this.listCurrentEncounter();
        }
        return ui.KnowledgeRecalled.EncounterManager;
    };


    getEncounter(encounterId) {

    };

    updateEncounters() {
        this.activeEncounters = this.listActiveEncounters();
        this.encounters = this.listAllEncounters();
        this.currentEncounter = this.listCurrentEncounter();
    };


    /**
     * Intnded to be called when Foundry is Ready i.e. Hooks.on Ready
     * @method
     * @static
     * @description
     * Embeds the View Manager into the applications primary class which is embeded in Foundry's UI global variable.
     * Accessible at ui.KnowledgeRecalled.ViewManager
     */
    static _onReady() {
        ui.KnowledgeRecalled.EncounterManager = new EncounterManager;
    };

    /**
     * List Foundry Encounters
     * @method
     * @returns {Array<game.combats>} - Returns an Array of encounters
     */
    listAllEncounters() {
        console.debug(game.combats);
        return game.combats;
    };
    /** 
     * List Active Foundry Encounters
     * @method
     * @returns {Array<game.combats.active} - Retuns an array of active encounters
     */
    // Fore each isn't working
    listActiveEncounters() {
        const encounters = game.combats;
        let activeEncounters = new Map();
        for (const [key, encounter] of encounters.entries()) {
            if (encounter.round > 0) {
                activeEncounters.set(key, encounter);
            }
        };
        console.debug(activeEncounters);
        return activeEncounters;
    }

    /**
     * List currently viewed encounter.
     * @method
     * @returns {game.combat} - Returns the currently viewed encounter
     */
    listCurrentEncounter() {
        console.debug(game.combat);
        return game.combat;
    };

}

