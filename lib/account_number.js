export class AccountNumber {
	static fromArray(accountNumberArray) {
		return new AccountNumber(accountNumberArray)
	}

	constructor(accountNumberArray) {
		this.accountNumberArray = accountNumberArray
	}

	digit(index){
		return this.accountNumberArray[index]
	}

	valid() {
		const magicChecksumNumber = 11
		const d9 = this.digit(0)
		const d8 = this.digit(1)
		const d7 = this.digit(2)
		const d6 = this.digit(3)
		const d5 = this.digit(4)
		const d4 = this.digit(5)
		const d3 = this.digit(6)
		const d2 = this.digit(7)
		const d1 = this.digit(8)

		return (d1 + 2*d2 + 3*d3 + 4*d4 + 5*d5 + 6*d6 + 7*d7 + 8*d8 + 9*d9) % magicChecksumNumber === 0
	}

}
