

export default class NPCActor extends Actor
{
   // constructor should get the values and be able to rebuild the actor at any time from foundry, but the first function
   // should be to check that this actor hasn't already been created as knowledgeRecalledActor.
   constructor(data
   )
   {
      // There are a few good places to query data. The first is on the main actor and then under system.
      // under items there are a lot of things as well. Spells, melee, weapons, etc.
      super();
      verifyExistingActor();
      this.data = data;
      this.getBaseCharacterInfo();
      this.getSaves();
      this.getActions();
      this.getAttacks();
      this.getDiDvDw();
      this.getTraits();
   }

   actorID = "";

   baseCharacterInfo = {
      name: "",
      actorImg: "",
      visibility: false
   }
   rarity = {
      value: "",
      visibility: false
   }
   traits = [
         {
            trait: "",
            visibility: false
         }
   ]

   armorClass = {
      value: 0,
      visibility: false
   }
   fortitudeSave = {
      value: 0,
      visibility: false
   }
   reflexSave = {
      value: 0,
      visibility: false
   }
   willSave = {
      value: 0,
      visibility: false
   }
   immunities = [
         {
            immunity: "",
            visibility: false
         }
   ]
   resistances = [
      {
         immunity: "",
         visibility: false
      }
   ]
   weaknesses = [
      {
         immunity: "",
         visibility: false
      }
   ]
   abilities = [
         {
            name: "",
            description: "",
            visibility: false
         }
      ]
   attacks = [
         {
            name: "",
            description: "",
            type: "",
            visibility: false
         }
   ]
   passiveAbilities = [
         {
            name: "",
            description: "",
            visibility: false
         }
      ]
   spells =  [
         {
            name: "",
            description: "",
            visibility: false
         }
      ]

   getBaseCharacterInfo()
   {
      // designed to read the characters queried from game.actors.get(actorID)
      this.name = this.data.name;
      this.baseCharacterInfo.actorImg = this.data.img;
      this.rarity.value = this.data.system.traits.rarity;
      this.armorClass.value = this.data.system.attributes.ac;
   }
   getSaves()
   {
      this.fortitudeSave.value = this.data.saves.fortitude;
      this.reflexSave.value = this.data.saves.reflex;
      this.willSave.value = this.data.saves.will;
   }
   getActions()
   {
       let actionLength = this.data.action.length;
       for (let i = 0; i < actionLength; i++)
       {
          let action = this.data.action[i];
          if (action.system.actionType === "action")
          {
             this.abilities.push({
                name: action.name,
                description: action.system.description,
                visibility: false
             })
          }
          else if (action.system.actionType === "passive")
          {
               this.passiveAbilities.push({
                  name: action.name,
                  description: action.system.description,
                  visibility: false
               })
          }
          else {
               console.log("DEBUG FLAG, DETERMINE action type and create a rule")
          }
       }
   }
   getAttacks()
   {
      let attackLength = this.data._itemTypes.melee.length  //.system.actions.length;
      for (let i = 0; i < attackLength; i++)
      {
         let attack = this.data._itemTypes.melee[i];
         if (attack.system.weaponType.value === "melee")
         {
            this.attacks.push({
               name: attack.label,
               description: attack.description,
               type: "melee",
               visibility: false
            })
         }
         else if (attack.system.weaponType.value === "ranged")
         {
            this.attacks.push({
               name: attack.name,
               description: attack.description,
               type: "range",
               visibility: false
            })
         }
         else
         {
            this.attacks.push({
               name: attack.label,
               description: attack.description,
               type: "no-match; debug",
               visibility: true
            })
            console.log("DEBUG FLAG, DETERMINE attack type and create a rule")
         }

      }
   }
}

export default class KnowledgeRecalledActor extends NPCActor {
   // to eliminate unnecessary data, we can provide an override function that will override DC when the GM chooses to do so,
   // and if defaults are requested, we can simply recalculate or recall from foundry.
   description = "";
   difficultyAdjustment = [
      {
         adjustment: "normal",
         playerID: ""
      }
   ];
   notes = {
      GMNotes: {
         notes: "",
         visibility: false
      },
      playerNotes: [
         {
            playerID: "",
            description: ""
         },
      ]
   };
}


