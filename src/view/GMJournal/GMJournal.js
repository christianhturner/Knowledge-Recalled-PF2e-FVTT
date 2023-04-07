import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import GMJournal from "./GMJournal.svelte";
/*
import NPCActor from "../../models/ActorModel.js";
import { getActorFromID } from "../../control/Actor.js";
*/


export default class GMJournalApplication extends SvelteApplication
{
   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/Application.html#options
    */

   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         title: 'knowledge-recalled.title',  // Automatically localized from `lang/en.json`.
         width: 600,
         height: 400,

         svelte: {
            class: GMJournal,
            target: document.body
         }
      });
   }
}
/*

export function createCustomActorObject()
{
   getActorFromID("slR0yGTXWHU7jpec").then((actor) =>
   {
      const customActor = new NPCActor(actor);
      console.log(customActor);
   });
}

*/
