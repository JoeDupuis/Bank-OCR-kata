import {FileReader} from './file_reader'
import {AccountNumber} from './account_number'
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

	validateAccountNumber(accountNumber) {
		return AccountNumber.fromString(accountNumber).valid()
	}

	validateAccountNumberArray(accountNumberArray) {
		return AccountNumber.fromArray(accountNumberArray).valid()
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

	accountNumberArrayToString(accountNumberArray){
		let status = ''
		let separator = '	'
		if(accountNumberArray.some(digit => (digit === '?'))){
			status = 'ILL'
		}
		else if(!this.validateAccountNumberArray(accountNumberArray)){
			status = 'ERR'
		}

		return (accountNumberArray.join('') + separator + status).trim()
	}


	parseScannedFile(filename, accountNumberCallback = console.log) {
		let file = new FileReader(filename)
		while(!file.reachedEOF()) {
			let accountNumberScan = [
				file.readLine(),
				file.readLine(),
				file.readLine()
			].join('\n')

			let accountNumberArray = this.resolveDigits(accountNumberScan)
			let accountNumberString = this.accountNumberArrayToString(accountNumberArray)
			accountNumberCallback(accountNumberString)

			//Handle empty lines between account numbers
			file.readLine()
		}

	}
}
