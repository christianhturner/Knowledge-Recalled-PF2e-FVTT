export const CONSTANTS = {
   moduleName: '',
   moduleLabel: '',
   flabDB: '',
};


export const getConstants = () =>
{
    CONSTANTS.moduleName = 'Knowledge Recalled';
    CONSTANTS.moduleLabel = 'knowledge-recalled';
    CONSTANTS.flabDB = 'knowledge-recalled';
    return CONSTANTS;
};


// Defines the left-hand UI buttons. First button is the main button, which renders the sub buttons.
export const knowledgeRecalledIconLauncher = [
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

export const proficiencyLabels = [
 "untrained",
 "trained",
 "expert",
 "master",
 "legendary"
];

export const proficiencyRankLabelsMap = new Map();
proficiencyRankLabelsMap.set("untrained", 0);
proficiencyRankLabelsMap.set("trained", 1);
proficiencyRankLabelsMap.set("expert", 2);
proficiencyRankLabelsMap.set("master", 3);
proficiencyRankLabelsMap.set("legendary", 4);

export const adjustmentScaleMap = new Map();
adjustmentScaleMap.set("incredibly easy", -10);
adjustmentScaleMap.set("very easy", -5);
adjustmentScaleMap.set("easy", -2);
adjustmentScaleMap.set("normal", 0);
adjustmentScaleMap.set("hard", 2);
adjustmentScaleMap.set("very hard", 5);
adjustmentScaleMap.set("incredibly hard", 10);

export const rarityMap = new Map();
rarityMap.set("common", 0);
rarityMap.set("uncommon", 2);
rarityMap.set("rare", 5);
rarityMap.set("unique", 10);


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

 export const coreKnowledgeSkills =
  [
   "Arcana",
   "Crafting",
   "Nature",
   "Occultism",
   "Religion",
   "Society"
  ];

 export const nonKnowledgeSkills =
  [
   "Acrobatics",
   "Athletics",
   "Deception",
   "Diplomacy",
   "Intimidation",
   "Medicine",
   "Performance",
   "Stealth",
   "Survival",
   "Thievery"
  ];

 export const recallKnowledgeAssociatedSkills = new Map();
   recallKnowledgeAssociatedSkills.set("aberration", ["Occultism"]);
   recallKnowledgeAssociatedSkills.set("animal", ["Nature"]);
   recallKnowledgeAssociatedSkills.set("astral", ["Occultism"]);
   recallKnowledgeAssociatedSkills.set("beast", ["Arcana", "Nature"]);
   recallKnowledgeAssociatedSkills.set("celestial", ["Religion"]);
   recallKnowledgeAssociatedSkills.set("construct", ["Arcana", "Crafting"]);
   recallKnowledgeAssociatedSkills.set("dragon", ["Arcana"]);
   recallKnowledgeAssociatedSkills.set("elemental", ["Arcana", "Nature"]);
   recallKnowledgeAssociatedSkills.set("ethereal", ["Occultism"]);
   recallKnowledgeAssociatedSkills.set("fey", ["Nature"]);
   recallKnowledgeAssociatedSkills.set("fiend", ["Religion"]);
   recallKnowledgeAssociatedSkills.set("fungus", ["Nature"]);
   recallKnowledgeAssociatedSkills.set("humanoid", ["Society"]);
   recallKnowledgeAssociatedSkills.set("monitor", ["Religion"]);
   recallKnowledgeAssociatedSkills.set("ooze", ["Occultism"]);
   recallKnowledgeAssociatedSkills.set("plant", ["Nature"]);
   recallKnowledgeAssociatedSkills.set("spirit", ["Occultism"]);
   recallKnowledgeAssociatedSkills.set("undead", ["Religion"]);


export const FILES = {
    ORIGIN_FOLDER: 'data',
    moduleDataDirectory: "knowledge-recalled-data",
    backupManagerJSON: "backup-manager.json"
};


