export function firstLetterMaj(str: string): string {
	if (str.length === 0) return str;
	const words = str.split('-');
	const capitalizedWords = words.map(
		word => word.charAt(0).toUpperCase() + word.slice(1)
	);
	return capitalizedWords.join(' ');
}

export function withoutSpaceAndSpecialChar(str: string): string {
	return str.replace(/[ .,-]/g, ' ');
}
