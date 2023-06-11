

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

   /**
    * Get data required for template
    */
   getData()
   {
      const { name, saves, alliance, rarity, description,
               traits, level, system, img } = this._data;
      const { abilities, attributes } = system;
      const { privateNotes } = system.details;
      const savesDS = {
         value: saves,
         beforeDC: Number,
         afterDC: Number,
         isVisible: false,
      };
      const fortitudeSaveDS = {
         value: saves.fortitude.dc.value,
         beforeDC: Number,
         afterDC: Number,
         isVisible: false,
      };
      const reflexSaveDS = {
         value: saves.reflex.dc.value,
         beforeDC: Number,
         afterDC: Number,
         isVisible: false,
      };
      const willSaveDS = {
         value: saves.will.dc.value,
         beforeDC: Number,
         afterDC: Number,
         isVisible: false,
      };
      const attributesDS = {
         value: system.attributes,
         beforeDC: Number,
         afterDC: Number,
         isVisible: false,
      };
      const armorClassDS = {
         base: attributes.ac.base,
         value: attributes.ac.value,
         modifier: attributes.ac.totalModifier,
         beforeDC: Number,
         afterDC: Number,
         isVisible: false,
      };
      const hpDS = {
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
      const immunitiesDS = {
         type: attributes.immunities,
         value: attributes.immunities.value,
         modifier: attributes.immunities.totalModifier,
         beforeDC: Number,
         afterDC: Number,
         isVisible: false,
      };
      const resistancesDS = {
         type: attributes.resistances,
         value: attributes.resistances.value,
         modifier: attributes.resistances.totalModifier,
         beforeDC: Number,
         afterDC: Number,
         isVisible: false,
      };
      const weaknessesDS = {
         type: attributes.weaknesses,
         value: attributes.weaknesses.value,
         modifier: attributes.weaknesses.totalModifier,
         beforeDC: Number,
         afterDC: Number,
         isVisible: false
      };

      return {
         name,
         savesDS,
         fortitudeSaveDS,
         reflexSaveDS,
         willSaveDS,
         img,
         attributes,
         hpDS,
         immunitiesDS,
         description,
         abilities,
         level,
         privateNotes,
         armorClassDS,
         attributesDS,
         resistancesDS,
         weaknessesDS,
         alliance,
         rarity,
         traits,

      };
   }

   changeVisibility(property)
   {
      property.isVisible = !property.isVisible;
   }
}
