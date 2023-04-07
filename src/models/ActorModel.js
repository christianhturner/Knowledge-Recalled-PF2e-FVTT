

export default class NPCActor
{
   // constructor should get the values and be able to rebuild the actor at any time from foundry, but the first function
   // should be to check that this actor hasn't already been created as knowledgeRecalledActor.
   constructor(foundryNPC)
   {
      // There are a few good places to query data. The first is on the main actor and then under system.
      // under items there are a lot of things as well. Spells, melee, weapons, etc.
      // verifyExistingActor();
      self.name = foundryNPC.name;
      self.level = foundryNPC.details.level.value;
      self.description.value = foundryNPC.details.biography.value;
      self.actorImg = foundryNPC.img;
      self.traits = foundryNPC.system.traits;
      // self.race = foundryNPC.system.traits.race.value;
      self.armorClass.value = foundryNPC.attributes.ac.value;
      self.armorClass.beforeDC = foundryNPC.attributes.dex.mod;
      self.fortitudeSave.value = foundryNPC.saves.fort.value;
      self.fortitudeSave.beforeDC = foundryNPC.attributes.con.mod;
      self.reflexSave.value = foundryNPC.saves.ref.value;
      self.reflexSave.beforeDC = foundryNPC.attributes.dex.mod;
      self.willSave.value = foundryNPC.saves.will.value;
      self.willSave.beforeDC = foundryNPC.attributes.wis.mod;
      self.immunities.value = foundryNPC.traits.di.value;
      self.resistances.value = foundryNPC.traits.dr.value;
      self.weaknesses.value = foundryNPC.traits.dv.value;
      self.rarity.value = foundryNPC.traits.rarity;
      self.actions = foundryNPC.system.actions;
      self.dr = foundryNPC.system.traits.dr;
      self.di = foundryNPC.system.traits.di;
      self.dv = foundryNPC.system.traits.dv;
   }

   actorID = "";
   isNPCHostile = Boolean;

   baseCharacterInfo = {
      name: String,
      actorImg: String,
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
   immunities = [
         {
            immunity: String,
            visibility: false
         }
   ];
   resistances = [
      {
         immunity: String,
         visibility: false
      }
   ];
   weaknesses = [
      {
         immunity: String,
         visibility: false
      }
   ];
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
      const dwLength = self.dr.length;
      for (let i = 0; i < dwLength; i++)
      {
         const resistance = self.dr[i];
         this.resistances.push({
            resistanceType: resistance,
            visibility: false
         });
      }
      return this.resistances;
   }

   getWeaknesses()
   {
      const dvLength = self.dv.length;

      for (let i = 0; i < dvLength; i++)
      {
         const weakness = self.dv[i];
         this.weaknesses.push({
            weaknessType: weakness,
            visibility: false
         });
      }
      return this.weaknesses;
   }
   getImmunities()
   {
      const diLength = self.di.length;
      for (let i = 0; i < diLength; i++)
      {
         const immunity = self.di[i];
         this.immunities.push({
            immunityType: immunity,
            visibility: false
         });
      }
      return this.immunities;
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
