import {
   coreKnowledgeSkills,
   nonKnowledgeSkills,
   proficiencyLabels,
   proficiencyRankLabelsMap
} from "../constants/constants.js";
import {  } from "../constants/constants.js";

export default class PlayerModel
{
   constructor(playerCharacter)
   {
      this.playerCharacter = playerCharacter;
      this.flags = {};
      const playerCharacterFlags = playerCharacter.data.getFlag('fvtt-knowledge-recalled-pf2e', 'playerCharacterFlags');
      if (playerCharacterFlags)
      {
         this.flags = playerCharacterFlags;
      }
      else
      {
         this.initializeFlags();
      }
   }
   initializeFlags()
   {
      const playerCharacter = this.playerCharacter;
      this.flags =
       {
          name: playerCharacter.name,
          id: playerCharacter.id,
          /**
           * @type {Array<{name: string, value: number, loreSkill: boolean, isSpecific: boolean, proficiency: proficiencyLabels, proficiencyRanks: number}>}
           */
          skills: [],
       };

   }
   /**
    * @param {Actor} actor
    * @memberof PlayerModel
    * @instance
    * @private
    */
   getSkills()
   {
      const { flags, playerCharacter } = this;
      const skills = flags.skills;
      const loreSkills = coreKnowledgeSkills;
      const nonLoreSkills = nonKnowledgeSkills;

      playerCharacter.skills.forEach((skill) =>
      {
         const { slug, label, lore, rank } = skill;
         const isSpecific = !lore || (!loreSkills.includes(slug) && !nonLoreSkills.includes(slug));
         const proficiencyRank = proficiencyRankLabelsMap.find((pr) => pr.key === rank)?.value || 0;

         const skillObject =
          {
             name: label,
             value: 0,
             loreSkill: loreSkills.includes(slug),
             isSpecific,
             proficiency: proficiencyLabels[proficiencyRank],
             proficiencyRanks: proficiencyRank,
          };
         skills.push(skillObject);
      });
      flags.skills = skills;
   }


}