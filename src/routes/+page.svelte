<script lang="ts">
	const rows = 5;
	const cols = 5;

	let grid = Array(rows * cols).fill(0);
	grid[12] = 1;
</script>

<div class="grid grid-cols-5">
	{#each grid as cell}
		<div class="flex justify-center items-center w-20 h-20 bg-base-200 border border-base-300">
			{#if cell === 1}
				<span class="text-5xl">🤖</span>
			{/if}
		</div>
	{/each}
</div>
