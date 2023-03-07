const CONSTANTS = {
   moduleName: 'knowledge-recalled',
   moduleLabel: `Knowledge Recalled`,
   flabDB: 'json'
};
export const worldName = game.world.id;

// Defines the left-hand UI buttons. First button is the main button, which renders the sub buttons.
const knowledgeRecalledIconLauncher = [
   {
      name: CONSTANTS.moduleName,
      title: CONSTANTS.moduleLabel,
      icon: 'fas fa-book',
      visible: true,

   },
];

export const adjustmentScale = [
 "incredibly easy",
 "very easy",
 "easy",
 "normal",
 "hard",
 "very hard",
 "incredibly hard"
];

export const profeciencyRanks = [
 "untrained",
 "trained",
 "expert",
 "master",
 "legendary"
];

export const adjustmentScaleMap = new Map();
adjustmentScaleMap.set("incredibly easy", -10);
adjustmentScaleMap.set("very easy", -5);
adjustmentScaleMap.set("easy", -2);
adjustmentScaleMap.set("normal", 0);
adjustmentScaleMap.set("hard", 2);
adjustmentScaleMap.set("very hard", 5);
adjustmentScaleMap.set("incredibly hard", 10);


export const dcByLevel = new Map();
dcByLevel.set(-1, 13);
dcByLevel.set(0, 14);
dcByLevel.set(1, 15);
dcByLevel.set(2, 16);
dcByLevel.set(3, 18);
dcByLevel.set(4, 19);
dcByLevel.set(5, 20);
dcByLevel.set(6, 22);
dcByLevel.set(7, 23);
dcByLevel.set(8, 24);
dcByLevel.set(9, 26);
dcByLevel.set(10, 27);
dcByLevel.set(11, 28);
dcByLevel.set(12, 30);
dcByLevel.set(13, 31);
dcByLevel.set(14, 32);
dcByLevel.set(15, 34);
dcByLevel.set(16, 35);
dcByLevel.set(17, 36);
dcByLevel.set(18, 38);
dcByLevel.set(19, 39);
dcByLevel.set(20, 40);
dcByLevel.set(21, 42);
dcByLevel.set(22, 44);
dcByLevel.set(23, 46);
dcByLevel.set(24, 48);
dcByLevel.set(25, 50);

export const simpleDCs = new Map();
 simpleDCs.set("untrained", 10);
 simpleDCs.set("trained", 15);
 simpleDCs.set("expert", 20);
 simpleDCs.set("master", 25);
 simpleDCs.set("legendary", 30);


// Stores property visibility for completed and uncompleted checks.