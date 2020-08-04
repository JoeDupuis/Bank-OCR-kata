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

	toString() {
		const separator = '	'
		const accountNumberString = this.accountDigitsArray
			.join('')
		return (accountNumberString + separator + this.statusString).trim()
	}

}
