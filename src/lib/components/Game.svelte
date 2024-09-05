<script lang="ts">
	import { swipe, type SwipeCustomEvent } from 'svelte-gestures';
	import { createGame } from '$lib/stores';

	import robotImg from '$lib/assets/robot.png';

	export let innerWidth: number;
	export let innerHeight: number;

	// Initialize game and window dimensions
	const game = createGame();

	// Direction angles for robot rotation
	const angles = {
		UP: '180deg',
		DOWN: '0deg',
		LEFT: '90deg',
		RIGHT: '270deg'
	};

	// Reactive values for the grid and robot
	$: cols = $game.grid.cols;
	$: rows = $game.grid.rows;
	$: cellSize = Math.min(
		(Math.max(innerWidth, 320) * 0.9) / cols,
		(Math.min(innerHeight, 640) * 0.8) / rows,
		100
	);
	$: gridWidth = cols * cellSize;
	$: gridHeight = rows * cellSize;
	$: robotX = $game.robot.x * cellSize;
	$: robotY = $game.robot.y * cellSize;
	$: robotDir = $game.robot.dir;

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

<svelte:window on:keydown={handleKeyDown} />

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
		<image
			href={robotImg}
			width={cellSize}
			height={cellSize}
			x={robotX}
			y={robotY}
			class="robot"
			style={`transform: rotate(${angles[robotDir]});`}
			role="button"
			tabindex="0"
			on:click={game.moveRobot}
			on:keydown={handleKeyDown}
		/>
	</svg>
</div>

<style>
	.grid {
		@apply box-content border-4 border-base-300;
	}
	.cell {
		@apply fill-gray-100 stroke-gray-300 stroke-2;
	}
	.robot {
		@apply origin-center rounded-xl fill-neutral-800;
		transform-box: fill-box;
		transition:
			transform 0.2s ease-in-out,
			x 0.3s ease-in-out,
			y 0.3s ease-in-out;
		cursor: pointer;

		&:hover {
			@apply opacity-75;
		}
	}
</style>
