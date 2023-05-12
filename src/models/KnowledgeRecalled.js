import NPCActor from "./ActorModel.js";

// eslint-disable-next-line no-unused-vars
export default class KnowledgeRecalled extends Application
{
   constructor(FoundryActors) 
{
      super();
      console.log("Creating NPC Actors");
      const npcActorObjects = [];
      for (let i = 0 ; i < FoundryActors.len(); i++)
      {
         npcActorObjects.append(new NPCActor(FoundryActors[i]));
      }
   }


   static _onReady(listOfFoundryActors)
   {
      ui.KnowledgeRecalled = new KnowledgeRecalled(listOfFoundryActors);
   }


}