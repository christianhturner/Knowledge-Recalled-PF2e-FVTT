/**
 * @param object - Document object which the flag is stored.
 * @param flagPath - Path to the flag under the object.flags namespace.
 *
 * @example
 * removeFlag(actor, 'npcFlags.lowestSave.value');
 */
export function removeFlag(object, flagPath)
{
   const flag = object.getFlag('fvtt-knowledge-recalled-pf2e', `${flagPath}`);
   if (flag)
   {
      object.unsetFlag('fvtt-knowledge-recalled-pf2e', `${flagPath}`);
      console.log(`Knowledge Recalled: Flag npcFlags.${flagPath} removed from ${object.name}`);
   }
   else
   {
      console.log(`Knowledge Recalled Flag npcFlags.${flagPath} does not exist on ${object.name}`);
   }
}


