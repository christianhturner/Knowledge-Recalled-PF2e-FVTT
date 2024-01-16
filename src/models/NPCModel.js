import { dcByLevel, rarityMap } from "../constants/constants"
import { removeFlag } from "../control/data.js"
// If this is the manager, it should be independent of any actor, but we can register actors? and maybew
// look them up based on their actorID?

export default class NPCManager {
    constructor() {
        if (!instance) {
            instance = this;
            this.NpcActors = {};
        }
        return instance;
    }


}
