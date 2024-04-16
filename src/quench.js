import { registerNPCModelTests } from "../test/models/NPCModel.test";
/**
 *
 * @param quench - quench is a testing framework for Foundryvtt
 */

/**
 *
 */
export async function setupTests() {
   Hooks.on(
      "quenchReady",
      (quench) => {
         registerTests(quench);
      },
   );
}
/**
 *
 * @param quench
 */
function registerTests(quench) {
   for (const batchTests of [registerNPCModelTests(quench)]) {
      batchTests(quench);
   }
}