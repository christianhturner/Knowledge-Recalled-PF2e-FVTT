export function removeFlag(object, flagPath)
{
   const flag = object.getFlag('fvtt-knowledge-recalled-pf2e', `npcFlags.${flagPath}`);
   if (flag)
   {
      object.unsetFlag('fvtt-knowledge-recalled-pf2e', `npcFlags.${flagPath}`);
      console.log(`Knowledge Recalled: Flag npcFlags.${flagPath} removed from ${object.name}`);
   }
   else
   {
      console.log(`Knowledge Recalled Flag npcFlags.${flagPath} does not exist on ${object.name}`);
   }
}


