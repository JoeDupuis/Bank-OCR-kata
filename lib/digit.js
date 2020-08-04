export class Digit {
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
