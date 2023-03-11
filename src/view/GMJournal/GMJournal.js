import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import GMJournal from "./GMJournal.svelte";
import { createBackupFile } from "../../control/dataManager.js";
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
export let backupData;
// eslint-disable-next-line prefer-const
backupData =
 {
   name: "Christian",
   type: "person"
};
createBackupFile(backupData).then((r) => console.log(r));