import NPCActor from "./ActorModel.js";

// eslint-disable-next-line no-unused-vars
export default class KnowledgeRecalled extends Application
{
   constructor(FoundryActors) 
{
      super();
      console.log("Storing NPC Actors");
      const NPCActors = [];

      for (const element of FoundryActors)
      {
         NPCActors.push(new NPCActor(element));
      }
      console.log("Displaying NPCActors: ", NPCActors);
      console.log("Displaying first actor: ", NPCActors[0].getData());
   }


   static _onReady(listOfFoundryActors)
   {
      ui.KnowledgeRecalled = new KnowledgeRecalled(listOfFoundryActors);
   }


}