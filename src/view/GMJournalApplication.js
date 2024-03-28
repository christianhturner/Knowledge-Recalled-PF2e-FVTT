import { SvelteApplication } from '#runtime/svelte/application';

import GMJournalAppShell from './GMJournalAppShell.svelte';

export default class BasicApplication extends SvelteApplication {
   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/Application.html#options
    */
   static get defaultOptions() {
      return foundry.utils.mergeObject(super.defaultOptions, {
         title: 'TemplateESM.title',  // Automatically localized from `lang/en.json`.
         width: 300,

         svelte: {
            class: GMJournalAppShell,
            target: document.body
         }
      });
   }
}

// TODO: A good inspiration I think is this package [here](https://github.com/MrVauxs/foundry-summons/blob/9a6544c133e175402c9e99630987c7b91135cd4c/src/summon/menu/SummoningMenu.svelte#L6)
// We will likely create a class that will handle data between the the data layer and the view layer. The view layer will sit in the ViewManager itself on our created applications.
// When objects are moved from the data layer to the view layer they should be passed through the TJSDocument, so that the view layer can interact with with them.