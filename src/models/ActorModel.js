

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


   getData() 
{
      const { name, saves, alliance, rarity, description, traits, level, img, system } = this._data;
      const { attributes } = system;
      const { fortitude, reflex, will } = saves?.dc || {};

      const savesDS = {
         value: saves,
         beforeDC: Number,
         afterDC: Number,
         isVisible: false,
      };

      const armorClass = {
         base: attributes?.ac?.base,
         value: attributes?.ac?.value,
         modifier: attributes?.ac?.totalModifier,
         beforeDC: Number,
         afterDC: Number,
         isVisible: false,
      };

      const hp = {
         base: attributes?.hp?.base,
         max: attributes?.hp?.max,
         negativeHealing: attributes?.hp?.negativeHealing,
         temp: attributes?.hp?.temp,
         value: attributes?.hp?.value,
         modifier: attributes?.hp?.totalModifier,
         beforeDC: Number,
         afterDC: Number,
         isVisible: false,
      };

      const immunities = {
         type: attributes?.immunities,
         value: attributes?.immunities?.value,
         modifier: attributes?.immunities?.totalModifier,
         beforeDC: Number,
         afterDC: Number,
         isVisible: false,
      };

      const resistances = attributes?.resistances || [];
      const weaknesses = attributes?.weaknesses || [];

      return {
         name,
         savesDS,
         fortitude: {
            value: fortitude?.value,
            beforeDC: Number,
            afterDC: Number,
            isVisible: false,
         },
         reflex: {
            value: reflex?.value,
            beforeDC: Number,
            afterDC: Number,
            isVisible: false,
         },
         will: {
            value: will?.value,
            beforeDC: Number,
            afterDC: Number,
            isVisible: false,
         },
         img,
         attributes,
         hp,
         immunities,
         description,
         abilities: system.abilities,
         level,
         traits,
         privateDescription: system.details?.privateNotes,
         armorClass,
         attributesDS: {
            value: system.attributes,
            beforeDC: Number,
            afterDC: Number,
            isVisible: false,
         },
         resistances,
         weaknesses,
         alliance,
         rarity,
      };
   }

   changeVisibility(property)
   {
      property.isVisible = !property.isVisible;
   }
}
