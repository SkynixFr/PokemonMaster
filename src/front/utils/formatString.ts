export function firstLetterMaj(str: string): string {
	const strLower = str.toLowerCase();
	return strLower.charAt(0).toUpperCase() + strLower.slice(1);
}

export function toLowerCaseWithoutSpaceAndSpecialChar(str: string): string {
	return str.toLowerCase().replace(/[ .]/g, '');
}
