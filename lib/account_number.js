import {Digit} from './digit'
export class AccountNumber {
	static fromArray(accountNumberArray) {
		return new AccountNumber(accountNumberArray.map(digit => new Digit(digit)))
	}

	static fromString(accountNumberString) {
		let accountNumberArray = accountNumberString.toString().split('')
		return AccountNumber.fromArray(accountNumberArray)
	}

	constructor(accountDigitsArray) {
		this.accountDigitsArray = accountDigitsArray
	}

	digit(index){
		return this.accountDigitsArray[index].digit
	}

	get valid() {
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

	get readable() {
		return !this.accountDigitsArray.some(digit => !digit.readable)
	}

	get statusString() {
		let status = ''
		if(!this.valid) status = 'ERR'
		if(!this.readable) status = 'ILL'
		return status
	}

	toString() {
		let separator = '	'
		let accountNumberString = this.accountDigitsArray
			.join('')
		return (accountNumberString + separator + this.statusString).trim()
	}

}
