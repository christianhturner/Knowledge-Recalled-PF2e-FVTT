import NPCActor from "./ActorModel.js";

export default class KnowledgeRecalledActor extends NPCActor {
   // to eliminate unnecessary data, we can provide an override function that will override DC when the GM chooses to do so,
   // and if defaults are requested, we can simply recalculate or recall from foundry.
   description = "";
   difficultyAdjustment = [
      {
         adjustment: "normal",
         playerID: ""
      }
   ];
   notes = {
      GMNotes: {
         notes: "",
         visibility: false
      },
      playerNotes: [
         {
            playerID: "",
            description: ""
         },
      ]
   };
}
