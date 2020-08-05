export class AccountValidator {
	constructor() {
	}

	validate(accountNumberArray) {
		const magicChecksumNumber = 11
		const d9 = accountNumberArray[0]
		const d8 = accountNumberArray[1]
		const d7 = accountNumberArray[2]
		const d6 = accountNumberArray[3]
		const d5 = accountNumberArray[4]
		const d4 = accountNumberArray[5]
		const d3 = accountNumberArray[6]
		const d2 = accountNumberArray[7]
		const d1 = accountNumberArray[8]

		return (d1 + 2*d2 + 3*d3 + 4*d4 + 5*d5 + 6*d6 + 7*d7 + 8*d8 + 9*d9) % magicChecksumNumber === 0
	}
}
