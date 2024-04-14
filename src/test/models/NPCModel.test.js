/* eslint-disable no-shadow */

import { log } from '../../lib/debugger';
import { NPCManager } from '../../control/NPCManager';

/**
 * Registers all of the test for Knowledge Recalled
 *
 * @param {import('../../node_modules/@ethaks/fvtt-quench/lib/quench.d.ts').Quench} quench
mocha and chai objects.
 */
export function registerNPCModelTests(quench) {
   for (const batchTests of [registerNPCCreateTest(quench)]) {
      batchTests(quench);
   }
}
/**
 * @param {import('../../node_modules/@ethaks/fvtt-quench/lib/quench.d.ts').Quench} quench
 */
function registerNPCCreateTest(quench) {
   quench.registerBatch("NPCCreateTest",
      (context) => {
         const { describe, it, expect, before } = context;
         describe("NPCFetch and Create", () => {
            const npcArray = [];
            before(() => {
               const arrayLength = game.actors.tree.entries.length;
               let npcFound = false;
               for (let index = 0; index < arrayLength; index++) {
                  const actor = game.actors.tree.entries[index];
                  if (actor.type === 'npc') {
                     npcArray.push(actor);
                     if (npcFound !== true) {
                        npcFound = true;
                     }
                  }
               }
               if (npcFound === false) {
                  throw new Error("No NPCs found within the world, please import or create an NPC before rerunning this test.");
               }
            });
            it("Generate a knowledge recalled object", () => {

               // /** @type {Array<object>} */
               // const actions = actorOne.actor.items.filter((item) => item.type === 'action');
               // const actionCount = actions.length;
               //
               const KRNpcArray = [];
               for (let index = 0; index < npcArray.length; index++) {
                  const npcManager = new NPCManager();
                  KRNpcArray.push(npcManager.createNPCObject(npcArray[index].id));
                  KRNpcArray[index].setFlags();
                  console.log(KRNpcArray[index]);
               }
               let didItWork = false;
               if (KRNpcArray.length === npcArray.length) {
                  didItWork = true;
               }
               quench.utils.pause(500);
               expect(didItWork).to.equal(true);
            });
            it("Test attack Count", () => {
               for (let index = 0; index < npcArray.length; index++) {
                  /** @type {Array<object>} */
                  const attacks = npcArray[index].items.filter((item) => item.type === 'melee' || item.type === 'ranged');
                  const attackCount = attacks.length;
                  const actorFlags = npcArray[index].flags['fvtt-knowledge-recalled-pf2e'].npcFlags;
                  expect(actorFlags.attacks.length).to.equal(attackCount);
               }

            });
            it("Test attack flag against attack item", () => {
               for (let index = 0; index < npcArray.length; index++) {
                  /** @type {Array<object>} */
                  const attackItems = npcArray[index].items.filter((item) => item.type === 'melee' || item.type === 'ranged');
                  const attackFlags = npcArray[index].flags['fvtt-knowledge-recalled-pf2e'].npcFlags.attacks;
                  for (let altIndex = 0; altIndex < attackItems.length; altIndex++) {
                     const attackObject = attackItems[altIndex];
                     const resolveAttackFlag = attackFlags.filter((attack) => attack[0] === attackObject.id);
                     const attackFlagItem = resolveAttackFlag[0][1];
                     let type;
                     if (attackObject.isRanged) {
                        type = 'ranged';
                     } else {
                        type = 'melee';
                     }
                     const attackRecordObject =
                     {
                        name: attackObject.name,
                        type,
                        gmDescription: attackFlagItem.gmDescription,
                        visibility: attackFlagItem.visibility,
                        discoveredBy: attackFlagItem.discoveredBy,
                     };
                     expect(attackFlagItem).to.have.property("name", attackRecordObject.name);
                     expect(attackFlagItem).to.have.property("type", attackRecordObject.type);
                     expect(attackFlagItem).to.have.property("gmDescription", attackRecordObject.gmDescription);
                     expect(attackFlagItem).to.have.property("visibility", attackRecordObject.visibility);
                     expect(attackFlagItem).to.have.property("discoveredBy", attackRecordObject.discoveredBy);
                     log.debug(
                        `Attack ${altIndex + 1} of ${attackItems.length} for ${npcArray[index].name}; ${index + 1} of ${npcArray.length} NPCs have been tested`,
                        "testing actor attack entry:",
                        attackRecordObject,
                        "against actual record entry:",
                        attackFlagItem
                     );
                  }
               }
            });
            it("Test action Count", () => {
               for (let index = 0; index < npcArray.length; index++) {
                  /** @type {Array<object>} */
                  const action = npcArray[index].items.filter((item) => item.type === 'action');
                  const actionCount = action.length;
                  const actorFlags = npcArray[index].flags['fvtt-knowledge-recalled-pf2e'].npcFlags;
                  expect(actorFlags.actionAbilities.length).to.equal(actionCount);
               }
               // const action = actorOne.items.filter((item) => item.type === 'action');
               // const actionCount = action.length;
               //
               // const actorFlags = actorOne.flags['fvtt-knowledge-recalled-pf2e'].npcFlags;
               // expect(actorFlags.actionAbilities.length).to.equal(actionCount);
            });
            it("Test Spell Count", () => {
               for (let index = 0; index < npcArray.length; index++) {
                  /** @type {Array<object>} */
                  const spells = npcArray[index].items.filter((item) => item.type === 'spell');
                  const spellCount = spells.length;
                  const actorFlags = npcArray[index].flags['fvtt-knowledge-recalled-pf2e'].npcFlags;
                  expect(actorFlags.spellAbilities.length).to.equal(spellCount);
               }
               // const spells = actorOne.items.filter((item) => item.type === 'spell');
               // const spellCount = spells.length;
               //
               // const actorFlags = actorOne.flags['fvtt-knowledge-recalled-pf2e'].npcFlags;
               // expect(actorFlags.spellAbilities.length).to.equal(spellCount);
            });
         });
      });

}