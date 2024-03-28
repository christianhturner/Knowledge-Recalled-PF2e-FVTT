
/**
 * Registers all of the test for Knowledge Recalled
 *
 * @param {import('../node_modules/@ethaks/fvtt-quench/lib/quench.d.ts').Quench} quench
 */
export function registerTests(quench) {
   for (const batchTests of [
      registerNPCCreateTest(quench)
   ]) {
      batchTests(quench);
   }
};

/**
 * @param {import('../node_modules/@ethaks/fvtt-quench/lib/quench.d.ts').Quench} quench
*/
function registerNPCCreateTest(quench) {
   quench.registerBatch("NPCCreateTest",
      (context) => {
         const { describe, it, expect, assert } = context;

      })
}