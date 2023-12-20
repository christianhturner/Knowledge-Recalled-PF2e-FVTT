export default class EncounterModel {
    // encounters should be created at startup, and not stored.
    /**
     * @class
     *
     * @param combat - it's expected that combat will be game.combats[0]. Likely  need to iterate through if multiple
     * combats are available.
     */
    constructor(combat) {
        this.combat = combat;
        this.NPCS = combat.combatants;

    }
}
