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

const DIGIT_STRING_MAPPING = [
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
]


export class AccountFileReader {


	splitAccountScanToDigitString(accountScan) {
		let lines = accountScan.split('\n')
			.map((line) => line.match(/.{1,3}/g)) // Sub split lines every 3 characters
		let digitParts1 = lines[0]
		let digitParts2 = lines[1]
		let digitParts3 = lines[2]
		let digits = digitParts1.map((_, i) => [digitParts1[i], digitParts2[i], digitParts3[i]].join(''))
		return digits
	}

	resolveDigit(scannedDigit) {
		return DIGIT_STRING_MAPPING.indexOf(scannedDigit)
	}
}
