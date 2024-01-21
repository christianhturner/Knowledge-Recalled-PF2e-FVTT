
/**
 * @function
 * A utility function that returns all active encounters registered in the combat tracker.
 */
export function getActiveEncounters() {
    const encounters = game.combats.combats;
    const activeEncounters = [];
    for (let index = 0; index < encounters.length; index++) {
        const testEncounter = encounters[index];
        if (testEncounter.isActive) {
            activeEncounters.push(testEncounter)
        }
    }
    if (activeEncounters.length != 0) {
        return activeEncounters;
    }
    console.error("No active encounters.");
};

/**
 * @function
 * A utility function that can take an array of actorIds and returns an array of 
 * actors from FoundryVTT.
 * @param {Array<string>} actorIds 
 */
export function getActors(actorIds) {
    const arrayOfActors = [];
    for (let index = 0; index < actorIds.length; index++) {
        const actorId = actorIds[index];
        arrayOfActors.push(game.actors.get(actorId));
    }
    console.log(arrayOfActors);
}

/**
 * @function
 * A utility function that extends the foundry built in function to return an
 * an actor from their actorId.
 * @param {string} actorId 
 */
export function getActor(actorId) {
    const actor = game.actors.get(actorId);
    console.log(actor);
    return actor;
}

/**
 * Gets the nested property value of an object
 * @function
 *
 * @param {object} obj - The object to get the property from
 * @param {string} path - The path to the property separated by dots
 * @returns {*} The property value
 */
export function getProperty(obj, path) {
    let keys = path.split('.');
    let result = obj;
    for (let key of keys) {
        result = result[key];
    }
    return result
}
