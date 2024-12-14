export function formateDateTimestamp(timestamp) {
	const date = new Date(parseInt(timestamp)); // Parse the timestamp to ensure it's an integer representing milliseconds
	const options = { day: "2-digit", month: "short", year: "numeric" };
	return date.toLocaleDateString("en-US", options);
}

// Example usage:
/**const timestamp = 1733011200000;
const formattedDate = formateDateTimestamp(timestamp);
console.log(formattedDate); // Output: Dec 01, 2024 */