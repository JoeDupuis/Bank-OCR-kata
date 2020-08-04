export class Digit {
	static fromDigitScan(digitScan) {
		const scannedSegments = Digit.parseToSegments(digitScan)
		return new Digit(Digit.resolveDigit(scannedSegments))
	}
	constructor(digit) {
		this.digit = Number(digit)
	}


	toString() {
		return Number.isNaN(this.digit) ? '?' : this.digit.toString()
	}

	resolveDigit(){
		return this.digit
	}

	get readable() {
		return !Number.isNaN(this.digit)
	}



	static resolveDigit(scannedSegments) {
		const digitIndex = DIGIT_SEGMENTS_MAPPING.indexOf(scannedSegments)
		return  digitIndex >= 0 ? digitIndex : NaN
	}

	static validateDigitString(digitString){
		const valid = digitString.split('').every((segment, i) => segment === FILLED_SEGMENTS[i] || segment === ' ')
		if(!valid) throw new Error('Digit string contains invalid segment')
		return valid
	}

	static parseToSegments(digitString) {
		Digit.validateDigitString(digitString)
		const segmentBinary = '0b' +
			  digitString
			  .split('')
			  .map(segment => segment !== ' ')
			  .map(Number)
			  .join('')
		return Number(segmentBinary)
	}
}

import {
	DIGIT_STRING_0,
	DIGIT_STRING_1,
	DIGIT_STRING_2,
	DIGIT_STRING_3,
	DIGIT_STRING_4,
	DIGIT_STRING_5,
	DIGIT_STRING_6,
	DIGIT_STRING_7,
	DIGIT_STRING_8,
	DIGIT_STRING_9
} from './digit_strings'

//8 has all the possible digit segments turned on
const FILLED_SEGMENTS = DIGIT_STRING_8.split('')

const DIGIT_SEGMENTS_MAPPING = [
	DIGIT_STRING_0,
	DIGIT_STRING_1,
	DIGIT_STRING_2,
	DIGIT_STRING_3,
	DIGIT_STRING_4,
	DIGIT_STRING_5,
	DIGIT_STRING_6,
	DIGIT_STRING_7,
	DIGIT_STRING_8,
	DIGIT_STRING_9
].map(Digit.parseToSegments)