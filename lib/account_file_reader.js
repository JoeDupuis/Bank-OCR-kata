import {FileReader} from './file_reader'
import {AccountNumber} from './account_number'
import {Digit} from './digit'

export class AccountFileReader {
	parseScannedFile(filename, accountNumberCallback = console.log) {
		const file = new FileReader(filename)
		while(!file.reachedEOF()) {
			const accountNumberScan = [
				file.readLine(),
				file.readLine(),
				file.readLine()
			].join('\n')

			const accountNumberArray = this.resolveDigits(accountNumberScan)
			const accountNumberString = AccountNumber.fromArray(accountNumberArray).toString()
			accountNumberCallback(accountNumberString)

			//Handle empty lines between account numbers
			file.readLine()
		}

	}

	resolveDigits(accountScan) {
		return this.splitAccountScanToDigitStrings(accountScan)
			.map(digitScan => Digit.fromDigitScan(digitScan))
	}

	splitAccountScanToDigitStrings(accountScan) {
		const digitParts = accountScan
			.split('\n')
			.map((line) => line.match(/.{1,3}/g)) // Sub split lines every 3 characters
		const digitPartsTop = digitParts[0]
		const digitPartsMiddle = digitParts[1]
		const digitPartsBottom = digitParts[2]

		//Zip an join the digit parts
		return digitPartsTop.map((_, i) =>
								 [digitPartsTop[i],
								  digitPartsMiddle[i],
								  digitPartsBottom[i]
								 ].join(''))
	}

}
