import { describe, it, expect } from 'vitest';
import { createGame } from './gameStore';
import type { Direction } from '$lib/types';

describe('createGame', () => {
	it('creates a game with the default grid and robot position', () => {
		const game = createGame();
		game.subscribe((state) => {
			expect(state.grid).toEqual({ rows: 5, cols: 5 });
			expect(state.robot).toEqual({ x: 2, y: 2, dir: 'DOWN' });
		});
	});

	it('rotates the robot in the specified direction', () => {
		const game = createGame();
		const newDirection: Direction = 'RIGHT';

		game.rotateRobot(newDirection);

		game.subscribe((state) => {
			expect(state.robot.dir).toBe(newDirection);
		});
	});

	it('moves the robot correctly based on its direction', () => {
		const game = createGame();

		game.moveRobot(); // Default direction is 'DOWN'
		game.rotateRobot('RIGHT');
		game.moveRobot();

		game.subscribe((state) => {
			expect(state.robot).toEqual({ x: 3, y: 3, dir: 'RIGHT' });
		});
	});

	it('prevents the robot from moving out of bounds', () => {
		const game = createGame({ rows: 3, cols: 3 });

		// Move up to the top boundary
		game.rotateRobot('UP');
		game.moveRobot();
		game.moveRobot(); // Should not go beyond y = 0
		game.rotateRobot('LEFT');
		game.moveRobot();
		game.moveRobot(); // Should not go beyond x = 0

		game.subscribe((state) => {
			expect(state.robot).toEqual({ x: 0, y: 0, dir: 'LEFT' });
		});
	});

	it('resets the game to the initial state', () => {
		const game = createGame();

		game.rotateRobot('DOWN');
		game.moveRobot();

		game.reset();

		game.subscribe((state) => {
			expect(state.grid).toEqual({ rows: 5, cols: 5 });
			expect(state.robot).toEqual({ x: 2, y: 2, dir: 'DOWN' });
		});
	});
});
