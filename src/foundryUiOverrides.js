import { ViewManager } from "./control/ViewManager";
import { API } from "./API/api";
import { CONSTANTS } from "./constants/constants";


// https://github.com/kandashi/Custom-Token-Animations/blob/910e1c887ab99f96639f1376dcc8ebd2effb1a92/src/CTA.js#L632

/**
 *
 * @param {object} sceneControl - https://foundryvtt.com/api/interfaces/client.SceneControl.html
 */
export function insertKnowledgeRecalledbuttons(sceneControl) {
   const moduleData = game.modules.get(CONSTANTS.moduleId);
   /** @type {import('../src/API/api').API} */
   const Api = moduleData.public;
   sceneControl.find((x) => x.name === 'notes').tools.push({
      icon: 'fas fa-book-open',
      name: 'KnowledgeRecalled',
      title: 'KnowledgeRecalled',
      visible: true,
      toggle: true,
      onClick: () => { Api.viewManager.openCloseNegotiate("gmJournal"); },
      button: true,
   });
}
