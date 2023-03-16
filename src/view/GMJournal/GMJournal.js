import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import GMJournal from "./GMJournal.svelte";
import { moduleDataDirectory } from "../../API/dataManager.js";
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
export const grabFile = async (path) =>
{
   const response = await fetch(path);
   const data = await response.json();
   console.log(data);
};

// export let backupData;
// // eslint-disable-next-line prefer-const
// backupData =
//  {
//    name: "Christian",
//    type: "person"
// };
//
// export function TestParser()
// {
//    fetchFile(ORIGIN_FOLDER, `${moduleDataDirectory}/`, `${moduleDataDirectory}/backup-manager.json`).then((r) => console.log(r));
//    }
//
// export function backupCreator()
// {
//    createBackupFile(backupData).then((r) => console.log(r));
// }
