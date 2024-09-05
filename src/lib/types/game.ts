export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type Robot = {
	x: number;
	y: number;
	dir: Direction;
};

export type Grid = {
	rows: number;
	cols: number;
};

export type Game = {
	grid: Grid;
	robot: Robot;
};
