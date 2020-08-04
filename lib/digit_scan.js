import {Digit} from './digit'
export class DigitScan {
	constructor(scannedDigit) {
		this.scannedDigit = scannedDigit
		this.segments = this.parseToSegments()
	}

	buildDigit() {
		return new Digit(this.resolveDigit(), this.resolvePossibleDigits())
	}

	resolveDigit() {
		const digitIndex = DIGIT_SEGMENTS_MAPPING.indexOf(this.segments)
		return  digitIndex >= 0 ? digitIndex : NaN
	}

	resolvePossibleDigits(){
		const diffCounts = DIGIT_SEGMENTS_MAPPING.map(digitSegments => this.segmentDiffCount(digitSegments, this.segments))
		const possibleDigits = []
		diffCounts.forEach((diffCount, index) => {
			if(diffCount === 1) possibleDigits.push(index)
		})
		return possibleDigits
	}

	validateDigitString(){
		const valid = this.scannedDigit.split('').every((segment, i) => segment === FILLED_SEGMENTS[i] || segment === ' ')
		if(!valid) throw new Error('Digit string contains invalid segment')
		return valid
	}

	segmentDiffCount(otherSegments) {
		const bitStr = ((this.segments ^ otherSegments)).toString(2)
		return bitStr.split('1').length - 1
	}

	parseToSegments() {
		this.validateDigitString()
		const segmentBinary = '0b' +
			  this.scannedDigit
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
].map(digitScan => (new DigitScan(digitScan).parseToSegments()))
