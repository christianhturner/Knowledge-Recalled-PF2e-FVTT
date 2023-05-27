

export default class NPCActor extends Actor
{
   // constructor should get the values and be able to rebuild the actor at any time from foundry, but the first function
   // should be to check that this actor hasn't already been created as knowledgeRecalledActor.
   constructor(data = {})
   {
      super(data);


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

  //
  //  getActions()
  //  {
  //      const actionLength = self.actions.length;
  //      for (let i = 0; i < actionLength; i++)
  //      {
  //         const action = self.actions[i];
  //         if (action.actionType === "action")
  //         {
  //            this.abilities.push({
  //               name: action.name,
  //               description: action.system.description,
  //               visibility: false
  //            });
  //         }
  //         else if (action.actionType === "passive")
  //         {
  //              this.passiveAbilities.push({
  //                 name: action.name,
  //                 description: action.system.description,
  //                 visibility: false
  //              });
  //         }
  //         else
  //         {
  //              console.log("DEBUG FLAG, DETERMINE action type and create a rule");
  //         }
  //      }
  //  }
  //

  //

  //


  //  }
  //
  //
  //  getAttacks()  //still working on
  //  {
  //     const actionsLength = this.actions.length;
  //     for (let i = 0; i < actionsLength; i++)
  //     {
  //        const action = this.actions[i];
  //        switch (action.attackRollType)
  //        {
  //           case "PF2E.NPCAttackMelee":
  //              this.attacks.push({
  //                 name: action.label,
  //                 description: action.description,
  //                 type: "melee",
  //                 visibility: false
  //              });
  //              break;
  //           case "PF2E.NPCAttackRanged":
  //              this.attacks.push({
  //                 name: action.label,
  //                 description: action.description,
  //                 type: "range",
  //                 visibility: false
  //              });
  //              break;
  //           default:
  //              this.attacks.push({
  //                 name: action.label,
  //                 description: action.description,
  //                 type: "no-match; debug",
  //                 visibility: true
  //              });
  //              console.log("DEBUG FLAG, DETERMINE attack type and create a rule")
  //        }
  //     }
  //     return this.attacks;
  //  }
  //
  //  getTraits()
  //  {
  //     // this.isNPCHostile = data.system.traits.attitude.value;
  //
  //     const traitLength = self.traits.value.length;
  //     for (let i = 0; i < traitLength; i++)
  //     {
  //        const trait = self.traits.value[i];
  //        this.traits.push({
  //           trait,
  //           visibility: false
  //        });
  //     }
  //     return this.traits;
  //  }
  //
  //
  //  //getCreatureTraits()

   // static _onReady()
   // {
   //
   //   KnowledgeRecalled.NPCActor = new NPCActor();
   // }

   /**
    * Get data required for template
    */
   getData()
   {
      const name = this.name;
      const saves = this.saves;
      const fortitude = {
         value: saves.fortitude,
         beforeDC: Number,
         afterDC: Number,
      };
      const reflex = saves.reflex;
      const will = saves.will;
      const img = this.img;
      const view = canvas.scene;
      const system = this.system;
      const abilities = {
         value: system.abilities,
         visibility: false,
      };
      const attributes = {
         value: system.attributes,
         visibility: false,
      };
      const strength = {
         value: abilities.str,
         visibility: false,
      };
      const intelligence = abilities.int;
      const cha = abilities.cha;
      const con = abilities.con;
      const dexterity = abilities.dex;
      const wisdom = abilities.wis;
      const ac = attributes.ac;
      const hp = attributes.hp;
      const immunities = attributes.immunities;
      const initiative = attributes.initiative;
      const perception = attributes.perception;
      const resistances = attributes.resistances;
      const weaknesses = attributes.weaknesses;
      const skills = system.skills;

      return {
         name,
         saves,
         fortitude,
         reflex,
         will,
         img,
         abilities,
         attributes,
         strength,
         intelligence,
         hp,
         immunities,
         initiative,
         perception,
         resistances,
         weaknesses,
         skills,
         cha,
         con,
         dexterity,
         wisdom,
         ac,
         view,
         system
      };
   }

   changeVisibility(property)
   {
      property.visibility = !property.visibility;
   }
}
