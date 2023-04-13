

export default class NPCActor
{
   // constructor should get the values and be able to rebuild the actor at any time from foundry, but the first function
   // should be to check that this actor hasn't already been created as knowledgeRecalledActor.
   constructor(foundryNPC)
   {
      // There are a few good places to query data. The first is on the main actor and then under system.
      // under items there are a lot of things as well. Spells, melee, weapons, etc.
      // verifyExistingActor();
      this.actorID = foundryNPC._id;
      this.baseCharacterInfo.name = foundryNPC.name;
      this.privateInfo.CR = foundryNPC.system.details.level.value;
      this.privateInfo.privateDescription = foundryNPC.system.details.privateNotes;
      this.baseCharacterInfo.description = foundryNPC.system.details.publicNotes;
      this.baseCharacterInfo.actorImg = foundryNPC.img;
      this.armorClass.value = foundryNPC.system.attributes.ac.value;
      this.rarity.value = foundryNPC.system.traits.rarity;
      this.fortitudeSave.value = foundryNPC.system.saves.fortitude.value;
      this.reflexSave.value = foundryNPC.system.saves.reflex.value;
      this.willSave.value = foundryNPC.system.saves.will.value;

   }

   actorID = "";
   isNPCHostile = Boolean;
   privateInfo = {
      privateDescription: String,
      CR: Number,
      visibility: false
    };
   baseCharacterInfo = {
      name: String,
      actorImg: String,
      description: String,
      visibility: false
   };
   rarity = {
      value: String,
      visibility: false
   };
   traits = [
         {
            trait: String,
            visibility: false
         }
   ];

   armorClass = {
      value: Number,
      visibility: false,
      beforeDC: Number,
      afterDC: Number
   };
   fortitudeSave = {
      value: Number,
      visibility: false,
      beforeDC: Number,
      afterDC: Number
   };
   reflexSave = {
      value: Number,
      visibility: false,
      beforeDC: Number,
      afterDC: Number
   };
   willSave = {
      value: Number,
      visibility: false,
      beforeDC: Number,
      afterDC: Number
   };
   immunities = [];
   resistances = [];
   weaknesses = [];
   abilities = [
         {
            name: String,
            description: String,
            visibility: false
         }
      ];
   attacks = [
         {
            name: String,
            description: String,
            type: String,
            visibility: false
         }
   ];
   passiveAbilities = [
         {
            name: String,
            description: String,
            visibility: false
         }
      ];
   spells =  [
         {
            name: String,
            description: String,
            visibility: false
         }
      ];

   getBaseCharacterInfo()
   {
      // designed to read the characters queried from game.actors.get(actorID)
      return {
         name: self.name,
         actorImg: self.actorImg,
         rarity: self.rarity,
         armorValue: self.armorClass.value
      }
   }
   getSaves()
   {
      return {
         fortitudeValue: self.fortitudeSave.value,
         reflexValue: self.reflexSave.value,
         willValue: self.willSave.value
      }
   }

   getActions()
   {
       const actionLength = self.actions.length;
       for (let i = 0; i < actionLength; i++)
       {
          const action = self.actions[i];
          if (action.actionType === "action")
          {
             this.abilities.push({
                name: action.name,
                description: action.system.description,
                visibility: false
             });
          }
          else if (action.actionType === "passive")
          {
               this.passiveAbilities.push({
                  name: action.name,
                  description: action.system.description,
                  visibility: false
               });
          }
          else
          {
               console.log("DEBUG FLAG, DETERMINE action type and create a rule");
          }
       }
   }

   getDiDvDw()
   {
      this.getImmunities();
      this.getWeaknesses();
      this.getResistances();

      return {
         immunities: this.immunities,
         weaknesses: this.weaknesses,
         resistances: this.resistances
      };
   }

   getResistances()
   {
      const dwLength = this.system.attributes.resistances?.length;
      if (dwLength !== undefined)
      {
         for (let i = 0; i < dwLength; i++)
         {
            const resistance = this.system.attributes.weaknesses[i];
            this.resistances.push({
               resistanceType: resistance,
            });
         }
         return this.resistances;
      }
      else
      {
         return [];
      }
   }

   getWeaknesses()
   {
      const dvLength = this.system.attributes.weaknesses?.length;
      if (dvLength !== undefined)
      {
         for (let i = 0; i < dvLength; i++)
         {
            const weakness = this.system.attributes.weaknesses[i];
            this.weaknesses.push({
               weaknessType: weakness,
            });
         }
         return this.weaknesses;
      }
      else
      {
         return [];
      }
   }
   getImmunities()
   {
      const diLength = this.attributes.immunities?.length;
      if (diLength !== undefined)
      {
         for (let i = 0; i < diLength; i++)
         {
            const immunity = this.system.attributes.immunities[i];
            this.immunities.push({
               immunityType: immunity,
            });
         }
         return this.immunities;
      }
      else
      {
         return [];
      }
   }


   getAttacks()  //still working on
   {
      const actionsLength = this.actions.length;
      for (let i = 0; i < actionsLength; i++)
      {
         const action = this.actions[i];
         switch (action.attackRollType)
         {
            case "PF2E.NPCAttackMelee":
               this.attacks.push({
                  name: action.label,
                  description: action.description,
                  type: "melee",
                  visibility: false
               });
               break;
            case "PF2E.NPCAttackRanged":
               this.attacks.push({
                  name: action.label,
                  description: action.description,
                  type: "range",
                  visibility: false
               });
               break;
            default:
               this.attacks.push({
                  name: action.label,
                  description: action.description,
                  type: "no-match; debug",
                  visibility: true
               });
               console.log("DEBUG FLAG, DETERMINE attack type and create a rule")
         }
      }
      return this.attacks;
   }

   getTraits()
   {
      // this.isNPCHostile = data.system.traits.attitude.value;

      const traitLength = self.traits.value.length;
      for (let i = 0; i < traitLength; i++)
      {
         const trait = self.traits.value[i];
         this.traits.push({
            trait,
            visibility: false
         });
      }
      return this.traits;
   }


  // getSpells()
   // getSkills()
   //getCreatureTraits()
}
