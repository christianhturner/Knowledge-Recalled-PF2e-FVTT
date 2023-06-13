import NPCActor from "./ActorModel.js";
import NPCModel from "./NPCModel.js";

// eslint-disable-next-line no-unused-vars
export default class KnowledgeRecalled extends Application
{
   static NPCActors = [];
   constructor(FoundryActors)
   {
      super();
      console.log("Storing NPC Actors");

      for (const element of FoundryActors)
      {
         KnowledgeRecalled.NPCActors.push(new NPCModel(element));
      }
   }

   static _onReady(listOfFoundryActors)
   {
      ui.KnowledgeRecalled = new KnowledgeRecalled(listOfFoundryActors);
   }

   static getActors()
   {
      return this.NPCActors;
   }
}