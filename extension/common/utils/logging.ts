export function printStack(message: string) {
	const stack = new Error().stack;
	if (stack) {
		const lines = stack.split('\n')[1].split('@');
		log(`[DEBUG]:: in function ${lines[0]} at ${lines[2]}`);
	}
	else
		log(`${message}`);
}
