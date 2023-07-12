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
         classes: ['gm-journal'],
         resizable: true,
         minimizable: true,
         width: 600,
         height: 400,
         title: 'Knowledge Recalled GM Journal',

         svelte: {
            class: GMJournalAppShell,
            target: document.body,
            intro: true,
         }
      });
   }
}
