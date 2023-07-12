import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';
import GMJournalAppShell from "./GMJournalAppShell.svelte";
/*
import NPCActor from "../../models/ActorModel.js";
import { getActorFromID } from "../../control/Actor.js";
*/

export default class GMJournalApplication extends SvelteApplication
{
   /**
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/interfaces/client.ApplicationOptions.html
    */
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'gm-journal',
         classes: [],
         resizable: true,
         minimizable: true,
         height: 400,
         width: 600,
         title: 'Knowledge Recalled GM Journal',

         svelte: {
            class: GMJournalAppShell,
            target: document.body,
         }
      });
   }
}
