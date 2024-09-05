<script lang="ts">
	import { swipe, type SwipeCustomEvent } from 'svelte-gestures';
	import { createGame } from '$lib/stores';

	// Initialize game and window dimensions
	const game = createGame();

	let innerWidth: number;
	let innerHeight: number;

	// Reactive values for the grid and robot
	$: cols = $game.grid.cols;
	$: rows = $game.grid.rows;
	$: cellSize = calculateCellSize(innerWidth, innerHeight, cols, rows);
	$: gridWidth = cols * cellSize;
	$: gridHeight = rows * cellSize;
	$: robotX = $game.robot.x * cellSize;
	$: robotY = $game.robot.y * cellSize;
	$: robotDir = $game.robot.dir;

	// Direction angles for robot rotation
	const angles = {
		UP: '0deg',
		DOWN: '180deg',
		LEFT: '270deg',
		RIGHT: '90deg'
	};

	function calculateCellSize(width: number, height: number, cols: number, rows: number) {
		return Math.min((Math.max(width, 320) * 0.9) / cols, (height * 0.8) / rows, 100);
	}

	function handleKeyDown(event: KeyboardEvent) {
		event.stopPropagation();
		const key = event.key.toLowerCase();

		switch (key) {
			case 'arrowup':
			case 'w':
				game.rotateRobot('UP');
				break;
			case 'arrowdown':
			case 's':
				game.rotateRobot('DOWN');
				break;
			case 'arrowleft':
			case 'a':
				game.rotateRobot('LEFT');
				break;
			case 'arrowright':
			case 'd':
				game.rotateRobot('RIGHT');
				break;
			case ' ':
				game.moveRobot();
				break;
			case 'escape':
				game.reset();
				break;
		}
	}

	function handleSwipe(event: SwipeCustomEvent) {
		const direction = event.detail.direction;

		switch (direction) {
			case 'top':
				game.rotateRobot('UP');
				game.moveRobot();
				break;
			case 'bottom':
				game.rotateRobot('DOWN');
				game.moveRobot();
				break;
			case 'left':
				game.rotateRobot('LEFT');
				game.moveRobot();
				break;
			case 'right':
				game.rotateRobot('RIGHT');
				game.moveRobot();
				break;
		}
	}
</script>

<svelte:window on:keydown={handleKeyDown} bind:innerWidth bind:innerHeight />

{#if innerWidth != null}
	<div
		class="relative"
		role="application"
		use:swipe={{ timeframe: 300, minSwipeDistance: 60 }}
		on:swipe={handleSwipe}
	>
		<svg width={gridWidth} height={gridHeight} class="grid">
			{#each Array(rows * cols).keys() as index}
				<rect
					x={(index % cols) * cellSize}
					y={Math.floor(index / cols) * cellSize}
					width={cellSize}
					height={cellSize}
					fill="inherit"
					stroke="inherit"
					class="cell"
				/>
			{/each}
		</svg>

		<svg
			width={cellSize}
			height={cellSize}
			class="robot"
			viewBox="0 0 32 32"
			style={`transform: translate(${robotX}px, ${robotY}px) rotate(${angles[robotDir]});`}
			role="button"
			tabindex="0"
			on:click={game.moveRobot}
			on:keydown={handleKeyDown}
		>
			<path
				d="M21,2H11c-5,0-9,4-9,9v10c0,5,4,9,9,9h10c5,0,9-4,9-9V11C30,6,26,2,21,2z M21.7,18.7C21.5,18.9,21.3,19,21,19
			s-0.5-0.1-0.7-0.3L16,14.4l-4.3,4.3c-0.4,0.4-1,0.4-1.4,0s-0.4-1,0-1.4l5-5c0.4-0.4,1-0.4,1.4,0l5,5C22.1,17.7,22.1,18.3,21.7,18.7z"
			/>
		</svg>
	</div>
{/if}

<style>
	.grid {
		@apply box-content border-4 border-base-300;
	}
	.cell {
		@apply fill-base-200 stroke-base-300 stroke-2;
	}
	.robot {
		@apply absolute left-1 top-1 rounded-xl fill-neutral-800;
		transition: transform 0.15s ease-in-out;
		cursor: pointer;

		&:hover {
			@apply opacity-75;
		}
	}
</style>
