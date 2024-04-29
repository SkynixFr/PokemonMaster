export function firstLetterMaj(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toLowerCaseWithoutSpaceAndSpecialChar(str: string): string {
	return str.toLowerCase().replace(/[ .]/g, '');
}
