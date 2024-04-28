<script>
   import { localize } from "@typhonjs-fvtt/runtime/svelte/helper";

   export let key;
   export let data;
   export let disabled = false;
   export let options = [];
</script>

<div>
   <div>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label
         >{localize(data.name)}
         <!-- svelte-ignore a11y-missing-attribute -->
         <a>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <i
               class="fas fa-undo reset-setting"
               data-fast-tooltip="Reset data"
               on:click={() => {
                  data.value = data.default;
               }}
            ></i></a
         >
      </label>
   </div>
   <div>
      {#if data.type === Boolean}
         <input type="checkbox" bind:checked={data.value} {disabled} />
      {:else if data.choices}
         <div class="choice-container">
            <select name={key} bind:value={data.value} {disabled}>
               {#each Object.entries(data.choices) as [key, choice], index (index)}
                  {#if data.type === Number}
                     <option value={index}>{localize(choice)}</option>
                  {:else}
                     <option value={key}>{localize(choice)}</option>
                  {/if}
               {/each}
            </select>
         </div>
      {/if}
   </div>
</div>