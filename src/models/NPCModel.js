import { dcByLevel, rarityMap } from "../constants/constants"
import { removeFlag } from "../control/data.js"

export default class NPCManager {
    constructor() {
        if (!instance) {
            instance = this;
            this.NpcActors = {};
        }
        return instance;
    }


}
