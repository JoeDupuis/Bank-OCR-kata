import {Digit} from './digit'
import {AccountValidator} from './account_validator'

export class AccountNumber {
	static fromString(accountNumberString) {
		const accountNumberArray = accountNumberString.toString().split('')
		return new AccountNumber(accountNumberArray.map(digit => new Digit(digit)))
	}

	constructor(accountDigitsArray) {
		this.accountDigitsArray = accountDigitsArray
		this.accountValidator = new AccountValidator()
	}

	digit(index) {
		return this.accountDigitsArray[index].digit
	}

	digits() {
		return this.accountDigitsArray.map(digit => digit.digit)
	}

	findAmbiguousAccountNumbers() {
		const possibleAccountNumbers = []
		this.accountDigitsArray.forEach((digit, index) => {
			digit.otherPossibleDigits.forEach((possibleDigit)=>{
				const accountNumberArray = this.accountDigitsArray.slice()
				accountNumberArray[index] = new Digit(possibleDigit)
				const accountNumber = new AccountNumber(accountNumberArray)
				if(accountNumber.valid) possibleAccountNumbers.push(accountNumber)
			})
		})
		return possibleAccountNumbers
	}

	get valid() {
		return this.accountValidator.validate(this.digits())
	}

	get readable() {
		return !this.accountDigitsArray.some(digit => !digit.readable)
	}

	get statusString() {
		if(!this.readable) return 'ILL'
		if(!this.valid) return 'ERR'
		return ''
	}

	get accountNumberString() {
		return this.accountDigitsArray.join('')
	}

	toString() {
		const separator = '	'
		return (this.accountNumberString + separator + this.statusString).trim()
	}

}
