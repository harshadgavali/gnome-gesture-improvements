export function printStack(message?: unknown) {
	const stack = new Error().stack;
	let prefix = '';
	if (stack) {
		const lines = stack.split('\n')[1].split('@');
		log(`[DEBUG]:: in function ${lines[0]} at ${lines[2]}`);
		prefix = '\t';
	}
	if (message !== undefined)
		log(`${prefix}${JSON.stringify(message)}`);
}
