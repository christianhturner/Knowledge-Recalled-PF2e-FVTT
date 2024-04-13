/* eslint-disable no-shadow */

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
                  const attacks = npcArray[index].items.filter((item) => item.type === 'melee');
                  const attackCount = attacks.length;
                  const actorFlags = npcArray[index].flags['fvtt-knowledge-recalled-pf2e'].npcFlags;
                  expect(actorFlags.attacks.length).to.equal(attackCount);
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