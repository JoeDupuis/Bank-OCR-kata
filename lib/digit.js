import {DigitScan} from './digit_scan'
export class Digit {
	static fromDigitScan(digitScan) {
		return (new DigitScan(digitScan)).buildDigit()
	}

	constructor(digit, otherPossibleDigits = []) {
		this.digit = Number(digit)
		this.otherPossibleDigits = otherPossibleDigits.map(Number)
		if(Number.isNaN(this.digit) && this.otherPossibleDigits.length === 1) {
			this.digit = this.otherPossibleDigits.pop()
		}
	}

	toString() {
		return Number.isNaN(this.digit) ? '?' : this.digit.toString()
	}

	get readable() {
		return !Number.isNaN(this.digit)
	}
}
