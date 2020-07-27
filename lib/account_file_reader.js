import FileReader from 'n-readlines'

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
const NB_OF_LINES_PER_SCAN = 4


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

	validateAccountNumber(accountNumber) {
		let accountNumberArray = accountNumber.toString().split('').map(Number)
		return this.validateAccountNumberArray(accountNumberArray)
	}

	validateAccountNumberArray(accountNumber) {
		const magicChecksumNumber = 11
		const d9 = accountNumber[0]
		const d8 = accountNumber[1]
		const d7 = accountNumber[2]
		const d6 = accountNumber[3]
		const d5 = accountNumber[4]
		const d4 = accountNumber[5]
		const d3 = accountNumber[6]
		const d2 = accountNumber[7]
		const d1 = accountNumber[8]

		return (d1 + 2*d2 + 3*d3 + 4*d4 + 5*d5 + 6*d6 + 7*d7 + 8*d8 + 9*d9) % magicChecksumNumber == 0
	}

	resolveDigits(accountScan) {
		return this.splitAccountScanToDigitString(accountScan)
			.map(this.resolveDigit.bind(this))
	}


	resolveDigit(scannedDigit) {
		let digit = DIGIT_STRING_MAPPING.indexOf(scannedDigit)
		digit = digit >=0 ? digit : '?'
		return digit
	}


	parseScannedFile(filename) {
		const file = new FileReader(filename)
		let digitParts = []
		let i = 1
		let line = file.next()
		while (line) {
			if(i % NB_OF_LINES_PER_SCAN){
				digitParts.push(line.toString('UTF-8'))
				i++
			}
			else {

				let accountNumber = this.resolveDigits(digitParts.join('\n'))
				if(accountNumber.some(digit => (digit == '?'))){
					console.log(`${accountNumber.join('')}	ILL` )
				}
				else if(!this.validateAccountNumberArray(accountNumber)){
					console.log(`${accountNumber.join('')}	ERR` )
				}
				else {
					console.log(`${accountNumber.join('')}` )
				}
				digitParts = []
				i = 1
			}
			line = file.next()
		}

		// Make sure we flush the remaining digits in case the file does not
		// contain the last empty line
		if(digitParts.length === 3){
			console.log(this.resolveDigits(digitParts.join('\n')).join(''))
		}

	}
}
