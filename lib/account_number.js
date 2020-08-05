import {Digit} from './digit'
import {AccountValidator} from './account_validator'

const SEPARATOR = '	'

export class AccountNumber {
	static fromString(accountNumberString, alternativeAccountNumbers) {
		const accountNumberArray = accountNumberString.toString().split('')
		return new AccountNumber(accountNumberArray.map(digit => new Digit(digit)), alternativeAccountNumbers)
	}

	constructor(accountDigitsArray, alternativeAccountNumbers) {
		this.accountDigitsArray = accountDigitsArray
		this.accountValidator = new AccountValidator()
		this.ambiguousAccountNumbers = alternativeAccountNumbers || this.findAmbiguousAccountNumbers()
		if(!this.valid && this.ambiguousAccountNumbers.length == 1)  {
			this.accountDigitsArray = this.ambiguousAccountNumbers.pop().accountDigitsArray
		}
	}

	digit(index) {
		return this.accountDigitsArray[index].digit
	}

	digits() {
		return this.accountDigitsArray.map(digit => digit.digit)
	}

	findAmbiguousAccountNumbers() {
		const possibleAccountNumbers = []
		const accountNumberArray = this.accountDigitsArray.map(digit => new Digit(digit.digit))
		this.accountDigitsArray.forEach((digit, index) => {
			digit.otherPossibleDigits.forEach((possibleDigit)=>{
				const newAccountNumberArray = accountNumberArray.slice()
				newAccountNumberArray[index] = new Digit(possibleDigit)
				const accountNumber = new AccountNumber(newAccountNumberArray)
				if(accountNumber.valid) possibleAccountNumbers.push(accountNumber)
			})
		})

		return possibleAccountNumbers.sort()
	}

	get valid() {
		return this.accountValidator.validate(this.digits())
	}

	get readable() {
		return !this.accountDigitsArray.some(digit => !digit.readable)
	}

	get ambiguous() {
		return this.ambiguousAccountNumbers.length > 1
	}

	get ambiguousString() {
		 const ambiguousAccounts = `'${this.ambiguousAccountNumbers.join("', '")}'`
		 return `[${ambiguousAccounts}]`
	}

	get statusString() {
		if(this.ambiguous) return 'AMB' + SEPARATOR + this.ambiguousString
		if(!this.readable) return 'ILL'
		if(!this.valid) return 'ERR'
		return ''
	}

	get accountNumberString() {
		return this.accountDigitsArray.join('')
	}

	toString() {
		return (this.accountNumberString + SEPARATOR + this.statusString).trim()
	}

}
