

export default class NPCActor extends Actor
{
   // constructor should get the values and be able to rebuild the actor at any time from foundry, but the first function
   // should be to check that this actor hasn't already been created as knowledgeRecalledActor.

   constructor(data)
   {
      super(data);
      console.log("Creating NPC Actors");
      this._data = data;
   }

   static get defaultOptions()
   {
      return mergeObject(super.defaultOptions, {
         visibility: false
      });
   }

  //  actorID = "";
  //  isNPCHostile = Boolean;
  //  privateInfo = {
  //     privateDescription: String,
  //     CR: Number,
  //     visibility: false
  //   };
  //  baseCharacterInfo = {
  //     name: String,
  //     actorImg: String,
  //     description: String,
  //     visibility: false
  //  };
  //  rarity = {
  //     value: String,
  //     visibility: false
  //  };
  //  traits = [
  //        {
  //           trait: String,
  //           visibility: false
  //        }
  //  ];
  //
  //  armorClass = {
  //     value: Number,
  //     visibility: false,
  //     beforeDC: Number,
  //     afterDC: Number
  //  };

  //  attacks = [
  //        {
  //           name: String,
  //           description: String,
  //           type: String,
  //           visibility: false
  //        }
  //  ];
  //  passiveAbilities = [
  //        {
  //           name: String,
  //           description: String,
  //           visibility: false
  //        }
  //     ];

  //
  //  getBaseCharacterInfo()
  //  {
  //     // designed to read the characters queried from game.actors.get(actorID)
  //     return {
  //        name: self.name,
  //        actorImg: self.actorImg,
  //        rarity: self.rarity,
  //        armorValue: self.armorClass.value
  //     }
  //  }

  //ctionLength = self.actions.length;
   //   //      for (let i = 0; i < actionLength; i++)
   //   //      {
   //   //         const action = self.actions[i];
   //   //         if (action.actionType === "action")
   //   //         {
   //   //            this.abilities.push({
   //   //               name: action.name,
   //   //               description: action.system.description,
   //   //               visibility: false
   //   //            });
   //   //         }
   //   //         else if (action.actionType === "passive")
   //   //         {
   //   //              this.passiveAbilities.push({
   //   //                 name: action.name,
   //   //                 description: action.system.description,
   //   //                 visibility: false
   //   //              });
   //   //         }
   //   //         else
   //   //         {
   //   //              console.log("DEBUG FLAG, DETERMINE action type and create a rule");
   //   //         }
   //   //      }
   //   //  }
   //   //
   //
   //   //
   //
   //   //
   //
   //
   //   //  }
   //   //
   //   //
   //   //  getAttacks()  //still working on
   //   //  {
   //   //     const actionsLength = this.actions.length;
   //   //     for (let i = 0; i < actionsLength; i++)
   //   //     {
   //   //        const action = this.actions[i];
   //   //        switch (action.attackRollType)
   //   //        {
   //   //           case "PF2E.NPCAttackMelee":
   //   //              this.attacks.push({
   //   //                 name: action.label,
   //   //                 description: action.description,
   //   //                 type: "melee",
   //   //                 visibility: false
   //   //              });
   //   //              break;
   //   //           case "PF2E.NPCAttackRanged":
   //   //              this.attacks.push({
   //   //                 name: action.label,
   //   //                 description: action.description,
   //   //                 type: "range",
   //   //                 visibility: false
   //   //              });
   //   //              break;
   //   //           default:
   //   //              this.attacks.push({
   //   //                 name: action.label,
   //   //                 description: action.description,
   //   //                 type: "no-match; debug",
   //   //                 visibility: true
   //   //              });
   //   //              console.log("DEBUG FLAG, DETERMINE attack type and create a rule")
   //   //        }
   //   //     }
   //   //     return this.attacks;
   //   //  }
   //   //
   //   //  getTraits()
   //   //  {
   //   //     // this.isNPCHostile = data.system.traits.attitude.value;
   //   //
   //   //     const traitLength = self.traits.value.length;
   //   //     for (let i = 0; i < traitLength; i++)
   //   //     {
   //   //        const trait = self.traits.value[i];
   //   //        this.traits.push({
   //   //           trait,
   //   //           visibility: false
   //   //        });
   //   //     }
   //   //     return this.traits;
   //   //  }
   //   //
   //   //
   //   //  //getCreatureTraits()
   //
   //    // static _onReady()
   //    // {
   //    //
   //    //   KnowledgeRecalled.NPCActor = new NPCActor();
   //    // }
  //  getActions()
  //  {
  //      const a

   /**
    * Get data required for template
    */
   getData()
   {
      const name = this._data.name;
      const saves = this._data.saves;
      const alliance = this._data.alliance;
      const rarity = this._data.rarity;
      const description = this._data.description;
      const traits = this._data.traits;
      const privateDescription = this._data.system.details.privateNotes;
      const level = this._data.level;
      const attributes = this._data.system.attributes;
      const savesDS = {
         value: saves,
         beforeDC: Number,
         afterDC: Number,
         isVisible: false,
      };
      const fortitude = {
         value: saves.fortitude.dc.value,
         beforeDC: Number,
         afterDC: Number,
         isVisible: false,
      };
      const reflex = {
         value: saves.reflex.dc.value,
         beforeDC: Number,
         afterDC: Number,
         isVisible: false,
      };
      const will = {
         value: saves.will.dc.value,
         beforeDC: Number,
         afterDC: Number,
         isVisible: false,
      };
      const img = this._data.img;
      const system = this._data.system;
      const abilities = this._data.system.abilities;

      const attributesDS = {
         value: system.attributes,
         beforeDC: Number,
         afterDC: Number,
         isVisible: false,
      };

      const armorClass = {
         base: attributes.ac.base,
         value: attributes.ac.value,
         modifier: attributes.ac.totalModifier,
         beforeDC: Number,
         afterDC: Number,
         isVisible: false,
      };
      const hp = {
         base: attributes.hp.base,
         max: attributes.hp.max,
         negativeHealing: attributes.hp.negativeHealing,
         temp: attributes.hp.temp,
         value: attributes.hp.value,
         modifier: attributes.hp.totalModifier,
         beforeDC: Number,
         afterDC: Number,
         isVisible: false,

      };
      const immunities = {
         type: attributes.immunities,
         value: attributes.immunities.value,
         modifier: attributes.immunities.totalModifier,
         beforeDC: Number,
         afterDC: Number,
         isVisible: false,
      };
      // const resistances = attributes.resistances;
      // const weaknesses = attributes.weaknesses;

      return {
         name,
         savesDS,
         fortitude,
         reflex,
         will,
         img,
         attributes,
         hp,
         immunities,
         description,
         abilities,
         level,
         traits,
         privateDescription,
         armorClass,
         attributesDS,
         // resistances,
         // weaknesses,
         alliance,
         rarity,

      };
   }

   changeVisibility(property)
   {
      property.isVisible = !property.isVisible;
   }
}
