import { initializeFlags } from "../control/data.js";

// this should process all of the values based on the settings provided by the user.
// default is core pf2e rules, but there will be various rules than can be changed.
export default class NPCValueProcessor
{
   constructor(actor)
   {
      this.actor = actor;
      if (actor.getFlag('fvtt-knowledge-recalled-pf2e', 'npcFlags'))
      {
         this.flags = actor.getFlag('fvtt-knowledge-recalled-pf2e', 'npcFlags');
      }
      else
      {
         initializeFlags(actor);
      }
   }
   processValues()
   {

   }
}