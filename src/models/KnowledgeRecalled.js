//import NPCActor from "./ActorModel.js";
//import NPCModel from "./NPCModel.js";

// eslint-disable-next-line no-unused-vars
export default class KnowledgeRecalled extends Application
{
   NPCActors = [];
   encounteredNPCActors = [];
   // constructor(FoundryActors)
   // {
   //    super();
   //    console.log("Storing NPC Actors");
   //
   //    for (const element of FoundryActors)
   //    {
   //       KnowledgeRecalled.NPCActors.push(new NPCModel(element));
   //    }
   // }

   static _onReady(listOfFoundryActors)
   {
      ui.KnowledgeRecalled = new KnowledgeRecalled(listOfFoundryActors);
   }

   getActors()
   {
      return this.NPCActors;
   }

   getEncounteredActors()
   {
      return this.encounteredNPCActors;
   }
   checkForDuplicateActor(actorId)
   {
      return this.NPCActors.some((npcActor) => npcActor.actorId === actorId);
   }
   addToEncounteredActorArray(NPCActor)
   {
      const isDuplicate = this.checkForDuplicateActor(NPCActor.actorId);
      if (!isDuplicate)
      {
         this.encounteredNPCActors.push(NPCActor);
      }
   }

   addToNPCActorArray(NPCActor)
   {
      const isDuplicate = this.checkForDuplicateActor(NPCActor.actorId);
      if (!isDuplicate)
      {
         this.encounteredNPCActors.push(NPCActor);
      }
   }
}