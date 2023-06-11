export function removeFlag(object, flagPath)
{
   const flag = object.getFlag('fvtt-knowledge-recalled-pf2e', `npcFlags.${flagPath}`);
   if (flag)
   {
      object.unsetFlag('fvtt-knowledge-recalled-pf2e', `npcFlags.${flagPath}`);
   }
   else
   {
      console.log(`Flag npcFlags.${flagPath} does not exist on ${object.name}`);
   }
}


