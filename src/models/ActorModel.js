export default class NPCGlobalActor
{
   difficultyAdjustment = [
      {
         adjustment: "normal",
         playerID: ""
      }
   ];
   name = {
      value: "",
      isVisibleForPlayers: false
   };
   actorID = "";
   description = {
      value: "",
      isVisibleForPlayers: false
   };
   actorImg = "";
   rarity = {
      value: "common",
      isVisibleForPlayers: false
   };
   traits = {
      value: [],
      isVisibleForPlayers: false
   };
   armorClass = {
      value: 0,
      beforeDC: 0,
      afterDC: 0,
      isVisibleForPlayers: false
   };
   fortitudeSave = {
      value: 0,
      beforeDC: 0,
      afterDC: 0,
      isVisibleForPlayers: false
   };
   reflexSave = {
      value: 0,
      beforeDC: 0,
      afterDC: 0,
      isVisibleForPlayers: false
   };
   willSave = {
      value: 0,
      beforeDC: 0,
      afterDC: 0,
      isVisibleForPlayers: false
   };
   immunities = {
      value: [],
      beforeDC: 0,
      afterDC: 0,
      isVisibleForPlayers: false
   };
   resistances = {
      value: [],
      beforeDC: 0,
      afterDC: 0,
      isVisibleForPlayers: false
   };
   weaknesses = {
      value: [],
      beforeDC: 0,
      afterDC: 0,
      isVisibleForPlayers: false
   };
   abilities = {
      ability: [
         {
            name: "",
            description: "",
            isVisibleForPlayers: false
         }
      ],
       beforeDC: 0,
       afterDC: 0,
      isVisibleForPlayers: false
   };
   attacks = {
      attack: [
         {
            name: "",
            description: "",
            isVisibleForPlayers: false
         }
      ],
       beforeDC: 0,
       afterDC: 0,
      isVisibleForPlayers: false
   };
   passiveAbilities = {
      passiveAbility: [
         {
            name: "",
            description: "",
            isVisibleForPlayers: false
         }
      ],
       beforeDC: 0,
       afterDC: 0,
      isVisibleForPlayers: false
   };
   spells = {
      spell: [
         {
            name: "",
            description: "",
            isVisibleForPlayers: false
         }
      ],
       beforeDC: 0,
       afterDC: 0,
      isVisibleForPlayers: false
   };
   notes = {
    GMNotes: "",
    playerNotes: [
   {
      playerID: "",
      description: ""
   },
    ]
   };
}

