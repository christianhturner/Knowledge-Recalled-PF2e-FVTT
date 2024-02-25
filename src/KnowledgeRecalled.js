import { getActiveEncounters, getActor } from "./control/utilities";
import { NPCModel } from "./models/NPCModel";

/**
 * Parent class which I embed other singleton manager classes to.
 * @class
 */
// eslint-disable-next-line no-unused-vars
export class KnowledgeRecalled extends Application {
   constructor() {
      super();
   }

   static _onReady() {
      ui.KnowledgeRecalled = new KnowledgeRecalled();
   }

   populateGMJournal() {
      const activeEncounters = getActiveEncounters();
      console.log(activeEncounters);
   }

   testNpcModel(actorId) {
      let npc = getActor(actorId);
      const npcModel = new NPCModel(npc);
      console.log(npcModel);
   }

   // Depricate
   getActors() {
      return this.loadedNPCs;
   }

   // Depricate
   getEncounteredActors() {
      return this.NpcsInEncounters;
   }

   // Depricate
   addToEncounteredActorArray(NPCActor) {
      const isDuplicate = this.checkForDuplicateActor(NPCActor.actorId);
      if (!isDuplicate) {
         this.encounteredNPCActors.push(NPCActor);
      }
   }

   // Depricate
   addToNpcActorsArray(NPCActor) {
      // const isDuplicate = this.checkForDuplicateActor(NPCActor.actorId);
      // if (!isDuplicate)
      // {
      //    this.npcActors.push(NPCActor);
      // }
      this.npcActors.push(NPCActor);
   }

   // Depricate
   checkForDuplicateActor(actorId) {
      return this.documentedActors.some((npcActor) => npcActor.actorId === actorId);
   }


}