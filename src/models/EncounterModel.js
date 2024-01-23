
export default class EncounterManager {
    // encounters should be created at startup, and not stored.
    /**
     * @class
     *
     * @param combat - it's expected that combat will be game.combats[0]. Likely  need to iterate through if multiple
     * combats are available.
     */


    constructor() {
        if (!ui.KnowledgeRecalled.EncounterManager) {
            ui.KnowledgeRecalled.EncounterManager = this;
            this.encounters = new Map();
            this.activeEncounters = new Map();
            this.currentEncounter = new Map();
        }
        this.updateEncounters();
        return ui.KnowledgeRecalled.EncounterManager;
    }

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

    updateEncounters() {
        this.encounters = this.listAllEncounters();
        this.activeEncounters = this.listActiveEncounters();
        this.currentEncounter = this.listCurrentEncounter();

    }


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
            if (encounter.isActive) {
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

