// import NPCActor from "./ActorModel.js";
// // eslint-disable-next-line no-unused-vars
// export default class KnowledgeRecalled extends Application
// {
//    static NPCActors = [];
//
//    constructor(FoundryActors)
//    {
//       super();
//
//       console.log("Storing NPC Actors");
//
//       for (const element of FoundryActors)
//       {
//          KnowledgeRecalled.NPCActors.push(new NPCActor(element).getData());
//       }
//       //console.log("Displaying NPCActors: ", KnowledgeRecalled.NPCActors);
//      // console.log("Displaying first actor: ", NPCActors[0].getData());
//    }
//
// // I want to create a function called getEncounters and this should return a class object called encounters that is
//    // is accessible at KnowledgeRecalled.encounters and this should be an array of encounter objects
//
//    static _onReady(listOfFoundryActors)
//    {
//       ui.KnowledgeRecalled = new KnowledgeRecalled(listOfFoundryActors);
//    }
//
//    static getActors()
//    {
//       return this.NPCActors;
//    }
// }