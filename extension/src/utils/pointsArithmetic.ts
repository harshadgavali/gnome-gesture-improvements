export interface Point {
	x: number,
	y: number,
}

export interface WeightedPoint extends Point {
	weight: number,
}

interface TransformationMatrix {
	0: [number, number],
	1: [number, number],
	delta: number,
}

function sqaure_distance(p1: Point, p2: Point): number {
	return (p1.x - p2.x) * (p1.x - p2.x) +
		(p1.y - p2.y) * (p1.y - p2.y);
}

function transform_point(matrix: TransformationMatrix, p: Point): Point {
	return {
		x: (matrix[0][0] * p.x + matrix[0][1] * p.y) / matrix.delta,
		y: (matrix[1][0] * p.x + matrix[1][1] * p.y) / matrix.delta,
	};
}

/**
 * @param windows 
 * @returns centroid of points or undefined if array is empty
 */
export function findCentroid(points: WeightedPoint[]): Point | undefined {
	const weightSum = points.reduce<number>((res, p) => res + p.weight, 0);
	if (weightSum === 0)
		return undefined;

	return {
		x: points.reduce<number>((res, p) => res + p.x * p.weight, 0) / weightSum,
		y: points.reduce<number>((res, p) => res + p.y * p.weight, 0) / weightSum,
	};
}

/**
 * first convert points so that win and centroid point are on horizontal line
 * and win is at origin and centroid point is on negative x axis
 * then filter out points which on negative x area
 * then distance between win and corner is equal to distance between win and point on x axis
 * 		on parabola passing through corner, with vertex at win and focus at centroid
 * @param win Center of window
 * @param centroid centroid point of center of all windows
 * @returns corner which is closest(according to algorithm) to window
 * 			or undefined if win and centroid point are same or all corners are in opposite direction
 */
export function findCornerForWindow<T extends Point>(win: Point, centroid: Point, corners: T[]): undefined | T {
	const dist_w_m = Math.sqrt(sqaure_distance(win, centroid));
	if (dist_w_m === 0 || corners.length === 0)
		return undefined;

	const transform_matrix: TransformationMatrix = {
		0: [win.x - centroid.x, win.y - centroid.y],
		1: [-win.y + centroid.y, win.x - centroid.x],
		delta: dist_w_m,
	};

	win = transform_point(transform_matrix, win);
	let mapped_corners = corners.map(c => {
		const point = transform_point(transform_matrix, c);
		point.x -= win.x;
		point.y -= win.y;
		return { ...point, corner: c };
	});

	// ignore points which are on negative x axis (opposite direction to centroid->win array);
	mapped_corners = mapped_corners.filter(c => c.x >= 0);
	const corner_dists = mapped_corners.map(c => c.x + (c.y * c.y) / (2 * dist_w_m));
	const minIndex = corner_dists.indexOf(Math.min(...corner_dists));
	return mapped_corners[minIndex]?.corner;
}
