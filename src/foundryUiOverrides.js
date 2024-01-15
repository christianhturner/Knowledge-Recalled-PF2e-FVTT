import KnowledgeRecalled from "./KnowledgeRecalled";
import ViewManager from "./control/ViewManager";
import GMJournalApplication from "./view/GMJournal/GMJournalApplication";

export default function registerUIOverrides() {
    const viewManager = new ViewManager();
    Hooks.on('getSceneControlButtons', (controls) => {
        insertJournalbuttons(controls);
    })

}
// https://github.com/kandashi/Custom-Token-Animations/blob/910e1c887ab99f96639f1376dcc8ebd2effb1a92/src/CTA.js#L632

/**
 * Function to insert the modules journal buttons.
 * @function insertJournalbuttons
 * @param{SceneControl} - Foundry scene control buttons.
 */
export function insertKnowledgeRecalledbuttons(sceneControl) {
    sceneControl.find(x => x.name == 'notes').tools.push({
        icon: 'fas fa-book-open',
        name: 'KnowledgeRecalled',
        title: 'KnowledgeRecalled',
        visible: true,
        toggle: true,
        onClick: () => { ui.KnowledgeRecalled.ViewManager.openCloseNegotiate("gmJournal") },
        button: true,
    });

}
