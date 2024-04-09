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
            let actorOne;
            before(() => {
               const arrayLength = game.actors.tree.entries.length;
               let npcFound = false;
               for (let index = 0; index < arrayLength && npcFound === false; index++) {
                  actorOne = game.actors.tree.entries[index];
                  if (actorOne.type === 'npc') {
                     return npcFound = true;
                  }
               }
               if (npcFound === false) {
                  throw new Error("No NPCs found within the world, please import or create an NPC before rerunning this test.");
               }
            });
            it("It should get the first actor in the world array.", () => {
               let didItWork;
               if (actorOne) {
                  didItWork = true;
               } else {
                  didItWork = false;
               }
               console.log(actorOne);
               expect(didItWork).to.equal(true);
            });
            it("Generate a knowledge recalled object", () => {

               // /** @type {Array<object>} */
               // const actions = actorOne.actor.items.filter((item) => item.type === 'action');
               // const actionCount = actions.length;
               //
               // /** @type {Array<object>} */
               // const spells = actorOne.actor.items.filter((item) => item.type === 'spell');
               // const spellCount = spells.length;

               const npcManager = new NPCManager();
               const testActor = npcManager.createNPCObject(actorOne.id);
               let didItWork = false;
               actorOne.setFlag('fvtt-knowledge-recalled-pf2e', 'npcFlags', testActor.flags);
               if (actorOne) {
                  didItWork = true;
               }
               expect(didItWork).to.equal(true);

               console.log(testActor);
               // expect(actorFlags.actionAbilities.length).to.equal(actionCount);
               // expect(actorFlags.spellAbilities.length).to.equal(spellCount);
               // testActor.setFlags();
            });
            it("Test attack Count", () => {
               /** @type {Array<object>} */
               const attacks = actorOne.items.filter((item) => item.type === 'melee');
               const attackCount = attacks.length;

               const actorFlags = actorOne.flags['fvtt-knowledge-recalled-pf2e'].npcFlags;
               expect(actorFlags.attacks.length).to.equal(attackCount);
            });
            // TODO: - [ ] Implement ability Count
            //       - [ ] Implement Spell Count
            //       - [ ] Should we check against our ID against the creatures?
         });
      });

}