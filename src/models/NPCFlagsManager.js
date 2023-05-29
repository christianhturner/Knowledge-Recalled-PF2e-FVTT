export default class NPCFlagsManager
{
   FLAGS = {
      baseCharacterInfo: {
         name: '',
         alliance: '',
         actorImg: '',
         description: '',
         visibility: false
      },
      rarity: {
         value: '',
         visibility: false
      },
      privateInfo: {
         privateDescription: '',
         CR: '',
      },
      traits: {
         trait: new Map(),
         beforeDC: '',
         afterDC: ''
      },
      armorClass: {
         value: '',
         beforeDC: '',
         afterDC: '',
         visibility: false
      },
      fortSave: {
         value: '',
         visibility: false,
         beforeDC: '',
         afterDC: ''
      },
      refSave: {
         value: '',
         visibility: false,
         beforeDC: '',
         afterDC: ''
      },
      willSave: {
         value: '',
         visibility: false,
         beforeDC: '',
         afterDC: ''
      },
      lowestSave: {
         value: '',
         visibility: false,
      },
      attacks: {
         attack: new Map(),
         beforeDC: '',
         afterDC: ''
      },
      passiveAbilities: {
         passiveAbility: new Map(),
         beforeDC: '',
         afterDC: ''
      },
      abilities: {
         ability: new Map(),
         beforeDC: '',
         afterDC: ''
      },
      spells: {
         spell: new Map(),
         beforeDC: '',
         afterDC: ''
      },
      weaknesses: {
         weakness: new Map(),
         beforeDC: '',
         afterDC: ''
      },
      immunities: {
         immunity: new Map(),
         beforeDC: '',
         afterDC: ''
      },
      resistances: {
         resistance: new Map(),
         beforeDC: '',
         afterDC: ''
      },
      difficultyAdjustmentByPlayerID: {
         adjustment: new Map()
      },
   };

   initializeFlags(actor)
   {
      this.FLAGS = {
         baseCharacterInfo: {
            name: actor.name,
            alliance: actor.alliance,
            actorImg: actor.img,
            description: actor.description,
         },
         rarity: {
            value: actor.rarity,
         },
         privateInfo: {
            privateDescription: actor.system.details.privateNotes,
            CR: actor.level,
         },
         traits: {
            trait: actor.traits.reduce((map, trait) =>
            {
               map.set(trait, false);
               return map;
            }, new Map()),
            beforeDC: '',
            afterDC: ''
         },
         armorClass: {
            value: actor.attributes.ac.base,
            beforeDC: '',
            afterDC: '',
         },
         fortSave: {
            value: actor.saves.fortitude.dc.value,
            beforeDC: '',
            afterDC: ''
         },
         refSave: {
            value: actor.saves.reflex.dc.value,
            beforeDC: '',
            afterDC: ''
         },
         willSave: {
            value: actor.saves.will.dc.value,
            beforeDC: '',
            afterDC: ''
         },
         lowestSave: {
            lowestSaveValue: '',
            beforeDC: '',
            afterDC: ''
         },
         immunities: {
            value: new Map(),
            beforeDC: '',
            afterDC: ''
         },
         resistance: {
            value: new Map(),
            beforeDC: '',
            afterDC: ''
         },
         weaknesses: {
            value: new Map(),
            beforeDC: '',
            afterDC: ''
         },
         passiveAbilities: {
            value: new Map(),
            beforeDC: '',
            afterDC: ''
         },
         difficultyAdjustmentByPlayerID: {
            adjustment: new Map()
         },
      };
      if (actor.type === 'npc')
      {
         // this.FLAGS.lowestSave.value = getLowestSave();
         const existingFlags = actor.getFlag('fvtt-knowledge-recalled-pf2e', 'npcFlags');
         const mergedFlags = { ...existingFlags, ...this.FLAGS };
         actor.setFlag('fvtt-knowledge-recalled-pf2e', 'npcFlags', mergedFlags);
      }
   }

   updateFlags(actor)
   {
      const existingFlags = actor.getFlag('fvtt-knowledge-recalled-pf2e', 'npcFlags');
      const mergedFlags = { ...existingFlags, ...this.FLAGS };
      actor.setFlag('fvtt-knowledge-recalled-pf2e', 'npcFlags', mergedFlags);
   }
}
/*

   getLowestSave = () =>
   {
      const {fortSave, refSave, willSave} = this.;
      return Math.min(fortSave.value, refSave.value, willSave.value);
   }
}*/
