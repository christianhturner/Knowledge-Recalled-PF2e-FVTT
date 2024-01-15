

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

