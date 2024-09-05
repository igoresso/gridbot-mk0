<script lang="ts">
	import { Game } from '$lib/components';
	import { Controls } from '$lib/components';

	let innerWidth: number;
	let innerHeight: number;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#if innerWidth != null}
	<Game {innerWidth} {innerHeight} />

	<!-- Controls -->
	<aside class="absolute left-full top-0 hidden pl-6 pt-4 lg:block">
		<Controls />
	</aside>
{/if}
