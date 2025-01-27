export function randomFloat(min: number, max: number): number {
	const [actualMin, actualMax] = min < max ? [max, min] : [min, max];
	return Math.random() * (actualMax - actualMin) + actualMin;
}

export function randomInt(min: number, max: number): number {
	return Math.trunc(randomFloat(min, max));
}
