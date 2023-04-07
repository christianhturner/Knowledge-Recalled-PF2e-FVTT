export default class KRActor extends foundry.abstract.TypeDataModel
{
   static defineSchema()
   {
      const fields = foundry.data.fields;
      return {
         pcIDAndAttempts: new fields.ArrayField(new fields.SchemaField({
            PCActorID: new fields.StringField({ required: true }),
            attempts: new fields.NumberField({ required: true }),
         })),
         baseNPCInfo: new fields.SchemaField({
            name: new fields.StringField({ required: true }),
            actorImg: new fields.FilePathField({ required: false, categories: ["IMAGE"] }),
            visibility: new fields.BooleanField({ required: true }),
            customDC: new fields.NumberField({ required: false }),
            defaultDC: new fields.NumberField({ required: false }),
         }),
         rarity: new fields.SchemaField({
            value: new fields.StringField({ required: true }),
            visibility: new fields.BooleanField({ required: true }),
            customDC: new fields.NumberField({ required: false }),
            defaultDC: new fields.NumberField({ required: false }),
         }),
         traits: new fields.ArrayField(new fields.SchemaField({
            trait: new fields.StringField({ required: true }),
            visibility: new fields.BooleanField({ required: true }),
            customDC: new fields.NumberField({ required: false }),
            defaultDC: new fields.NumberField({ required: false }),
         })),
         armorClass: new fields.SchemaField({
            value: new fields.NumberField({ required: true }),
            visibility: new fields.BooleanField({ required: true }),
            customDC: new fields.NumberField({ required: false }),
            defaultDC: new fields.NumberField({ required: false }),
         }),
         saves: new fields.SchemaField({
            fortitude: new fields.SchemaField({
               value: new fields.NumberField({ required: true }),
               visibility: new fields.BooleanField({ required: true }),
               customDC: new fields.NumberField({ required: false }),
               defaultDC: new fields.NumberField({ required: false }),
            }),
            reflex: new fields.SchemaField({
               value: new fields.NumberField({ required: true }),
               visibility: new fields.BooleanField({ required: true }),
               customDC: new fields.NumberField({ required: false }),
               defaultDC: new fields.NumberField({ required: false }),
            }),
            will: new fields.SchemaField({
               value: new fields.NumberField({ required: true }),
               visibility: new fields.BooleanField({ required: true }),
               customDC: new fields.NumberField({ required: false }),
               defaultDC: new fields.NumberField({ required: false }),
            }),
            lowestSave: new fields.SchemaField({
               saveName: new fields.NumberField({ required: true }),
               visibility: new fields.BooleanField({ required: true }),
               customDC: new fields.NumberField({ required: false }),
               defaultDC: new fields.NumberField({ required: false }),
            })
         }),
         immunities: new fields.ArrayField(new fields.SchemaField({
            immunity: new fields.StringField({ required: true }),
            visibility: new fields.BooleanField({ required: true }),
            customDC: new fields.NumberField({ required: false }),
            defaultDC: new fields.NumberField({ required: false }),
         })),
         resistances: new fields.ArrayField(new fields.SchemaField({
            resistance: new fields.StringField({ required: true }),
            visibility: new fields.BooleanField({ required: true }),
            customDC: new fields.NumberField({ required: false }),
            defaultDC: new fields.NumberField({ required: false }),
         })),
         weaknesses: new fields.ArrayField(new fields.SchemaField({
            weakness: new fields.StringField({ required: true }),
            visibility: new fields.BooleanField({ required: true }),
            customDC: new fields.NumberField({ required: false }),
            defaultDC: new fields.NumberField({ required: false }),
         })),
         abilities: new fields.ArrayField(new fields.SchemaField({
            name: new fields.StringField({ required: true }),
            description: new fields.StringField({ required: true }),
            visibility: new fields.BooleanField({ required: true }),
            customDC: new fields.NumberField({ required: false }),
            defaultDC: new fields.NumberField({ required: false }),
         })),
         attacks: new fields.ArrayField(new fields.SchemaField({
            name: new fields.StringField({ required: true }),
            description: new fields.StringField({ required: true }),
            visibility: new fields.BooleanField({ required: true }),
            customDC: new fields.NumberField({ required: false }),
            defaultDC: new fields.NumberField({ required: false }),
         })),
         passiveAbilities: new fields.ArrayField(new fields.SchemaField({
            name: new fields.StringField({ required: true }),
            description: new fields.StringField({ required: true }),
            visibility: new fields.BooleanField({ required: true }),
            customDC: new fields.NumberField({ required: false }),
            defaultDC: new fields.NumberField({ required: false }),
         })),
         spells: new fields.ArrayField(new fields.SchemaField({
            name: new fields.StringField({ required: true }),
            description: new fields.StringField({ required: true }),
            visibility: new fields.BooleanField({ required: true }),
            customDC: new fields.NumberField({ required: false }),
            defaultDC: new fields.NumberField({ required: false }),
         })),
         GMNotes: new fields.SchemaField({
            notes: new fields.StringField({ required: true }),
            visibility: new fields.BooleanField({ required: true }),
         }),
         playerNotes: new fields.ArrayField(new fields.SchemaField({
            playerID: new fields.StringField({ required: true }),
            notes: new fields.StringField({ required: true }),
            visibility: new fields.BooleanField({ required: true }),
         })),
      };
   }
}