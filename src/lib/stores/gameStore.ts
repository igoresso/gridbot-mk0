import { writable } from 'svelte/store';
import type { Direction, Game, Grid, Robot } from '$lib/types';

export function createGame(grid: Grid = { rows: 5, cols: 5 }) {
	const initialRobot: Robot = {
		x: Math.floor(grid.cols / 2),
		y: Math.floor(grid.rows / 2),
		dir: 'DOWN'
	};

	const { subscribe, set, update } = writable<Game>({
		grid,
		robot: initialRobot
	});

	function rotateRobot(dir: Direction) {
		update((game) => ({
			...game,
			robot: {
				...game.robot,
				dir
			}
		}));
	}

	function moveRobot() {
		update((game) => {
			const { x, y } = game.robot;
			const { rows, cols } = game.grid;
			const deltas = {
				UP: { x: 0, y: -1 },
				DOWN: { x: 0, y: 1 },
				LEFT: { x: -1, y: 0 },
				RIGHT: { x: 1, y: 0 }
			};

			const delta = deltas[game.robot.dir];
			const newX = Math.max(0, Math.min(cols - 1, x + delta.x));
			const newY = Math.max(0, Math.min(rows - 1, y + delta.y));

			return {
				...game,
				robot: { ...game.robot, x: newX, y: newY }
			};
		});
	}

	function reset() {
		set({
			grid,
			robot: initialRobot
		});
	}

	return {
		subscribe,
		rotateRobot,
		moveRobot,
		reset
	};
}
