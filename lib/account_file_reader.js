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
		let digitParts = accountScan
			.split('\n')
			.map((line) => line.match(/.{1,3}/g)) // Sub split lines every 3 characters

		let digitPartsTop = digitParts[0]
		let digitPartsMiddle = digitParts[1]
		let digitPartsBottom = digitParts[2]

		//Zip an join the digit parts
		return digitPartsTop.map((_, i) =>
								 [digitPartsTop[i],
								  digitPartsMiddle[i],
								  digitPartsBottom[i]
								 ].join(''))
	}

	resolveDigits(accountScan) {
		return this.splitAccountScanToDigitString(accountScan)
			.map(this.resolveDigit.bind(this))
	}


	resolveDigit(scannedDigit) {
		return DIGIT_STRING_MAPPING.indexOf(scannedDigit)
	}
}
