declare function log(message: any): void;

export function printStack() {
	const stack = new Error().stack;
	if (stack) {
		const lines = stack.split('\n')[1].split('@');
		log(`[DEBUG]:: in function ${lines[0]} at ${lines[2]}`);
	}
}
