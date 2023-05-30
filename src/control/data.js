
export function initializeFlags(actor)
{
   const FLAGS =
    {
       baseCharacterInfo:
        {
           name: actor.name,
           alliance: actor.alliance,
           actorImg: actor.img,
           description: actor.description,
           visibility: false
        },
       rarity: {
          value: actor.rarity,
          visibility: false
       },
       privateInfo: {
          privateDescription: actor.system.details.privateNotes,
          CR: actor.level,
          visibility: false
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
          visibility: false
       },
       fortSave: {
          value: actor.saves.fortitude.dc.value,
          beforeDC: '',
          afterDC: '',
          visibility: false
       },
       refSave: {
          value: actor.saves.reflex.dc.value,
          beforeDC: '',
          afterDC: '',
          visibility: false
       },
       willSave: {
          value: actor.saves.will.dc.value,
          beforeDC: '',
          afterDC: '',
          visibility: false
       },
       lowestSave: {
          lowestSaveValue: '',
          beforeDC: '',
          afterDC: '',
          visibility: false,
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
      const mergedFlags = { ...existingFlags, ...FLAGS };
      actor.setFlag('fvtt-knowledge-recalled-pf2e', 'npcFlags', mergedFlags);
   }
}

export function updateFlags(actor)
{
   const FLAGS = {
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
      },
      armorClass: {
         value: actor.attributes.ac.base,
      },
      fortSave: {
         value: actor.saves.fortitude.dc.value,
      },
      refSave: {
         value: actor.saves.reflex.dc.value,
      },
      willSave: {
         value: actor.saves.will.dc.value,
      },
      lowestSave: {
         lowestSaveValue: '',
      },
      immunities: {
         value: new Map(),
      },
      resistance: {
         value: new Map(),
      },
      weaknesses: {
         value: new Map(),
      },
      passiveAbilities: {
         value: new Map(),
      },
   };
   const existingFlags = actor.getFlag('fvtt-knowledge-recalled-pf2e', 'npcFlags');
   const mergedFlags = { ...existingFlags, ...FLAGS };
   actor.setFlag('fvtt-knowledge-recalled-pf2e', 'npcFlags', mergedFlags);
}

