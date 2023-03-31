

export default class NPCActor
{
   // constructor should get the values and be able to rebuild the actor at any time from foundry, but the first function
   // should be to check that this actor hasn't already been created as knowledgeRecalledActor.
   constructor(data)
   {
      // There are a few good places to query data. The first is on the main actor and then under system.
      // under items there are a lot of things as well. Spells, melee, weapons, etc.
      // verifyExistingActor();
      this.getBaseCharacterInfo(data);
      this.getSaves(data);
      this.getActions(data);
      this.getAttacks(data);
      this.getDiDvDw(data);
      this.getTraits(data);
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
      visibility: false
   };
   fortitudeSave = {
      value: Number,
      visibility: false
   };
   reflexSave = {
      value: Number,
      visibility: false
   };
   willSave = {
      value: Number,
      visibility: false
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

   getBaseCharacterInfo(data)
   {
      // designed to read the characters queried from game.actors.get(actorID)
      this.baseCharacterInfo.name = data.name;
      this.baseCharacterInfo.actorImg = data.img;
      this.rarity.value = data.system.traits.rarity;
      this.armorClass.value = data.system.attributes.ac;
   }
   getSaves(data)
   {
      this.fortitudeSave.value = data.saves.fortitude;
      this.reflexSave.value = data.saves.reflex;
      this.willSave.value = data.saves.will;
   }
   getActions(data)
   {
       const actionLength = data.system.actions.length;
       for (let i = 0; i < actionLength; i++)
       {
          const action = data.system.actions[i];
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
   getDiDvDw(data)
   {
      this.getImmunities(data);
      this.getWeaknesses(data);
      this.getResistances(data);


   }
   getResistances(data)
   {
      const dwLength = data.system.traits.dr.length;
      for (let i = 0; i < dwLength; i++)
      {
         const dr = data.system.traits.dr[i];
         this.resistances.push({
            immunity: dr,
            visibility: false
         });
      }
      return this.resistances;
   }
   getWeaknesses(data)
   {
      const dvLength = data.system.traits.dv.length;

      for (let i = 0; i < dvLength; i++)
      {
         const dv = data.system.traits.dv[i];
         this.weaknesses.push({
            immunity: dv,
            visibility: false
         });
      }
      return this.weaknesses;
   }
   getImmunities(data)
   {
      const diLength = data.system.traits.di.length;
      for (let i = 0; i < diLength; i++)
      {
         const di = data.system.traits.di[i];
         this.immunities.push({
            immunity: di,
            visibility: false
         });
      }
      return this.immunities;
   }
   getAttacks(data)
   {
      const attackLength = data._itemTypes.melee.length;
      for (let i = 0; i < attackLength; i++)
      {
         const attack = data._itemTypes.melee[i];
         if (attack.system.weaponType.value === "melee")
         {
            this.attacks.push({
               name: attack.label,
               description: attack.description,
               type: "melee",
               visibility: false
            });
         }
         else if (attack.system.weaponType.value === "ranged")
         {
            this.attacks.push({
               name: attack.name,
               description: attack.description,
               type: "range",
               visibility: false
            });
         }
         else
         {
            this.attacks.push({
               name: attack.label,
               description: attack.description,
               type: "no-match; debug",
               visibility: true
            });
            console.log("DEBUG FLAG, DETERMINE attack type and create a rule");
         }

      }
   }
   getTraits(data)
   {
      this.isNPCHostile = data.system.traits.attitude.value;
      const traitLength = data.system.traits.value.length;
      for (let i = 0; i < traitLength; i++)
      {
         const trait = data.system.traits.value[i];
         this.traits.push({
            trait,
            visibility: false
         });
      }
   }

}
