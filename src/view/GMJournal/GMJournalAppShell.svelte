<svelte:options accessors={true} />

<script>
    import { getContext } from "svelte";
    import { ApplicationShell } from "#runtime/svelte/component/core";

    const { application } = getContext("#external");
    export let elementRoot;
</script>

<ApplicationShell bind:elementRoot>
    <h1>This is a header</h1>
</ApplicationShell>

